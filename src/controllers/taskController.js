const pool = require('../config/db');

// GET /
const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.status(200).json({
      message: 'Berhasil mengambil semua task',
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

// GET /tasks/:id 
const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: `Task dengan ID ${id} tidak ditemukan` });
    }

    res.status(200).json({
      message: 'Berhasil mengambil task',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

// POST /tasks 
const createTask = async (req, res) => {
  const { title, description } = req.body;

  // Validasi:
  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Field title tidak boleh kosong atau hanya spasi' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title.trim(), description || null]
    );

    res.status(201).json({
      message: 'Task berhasil ditambahkan',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

// PUT /tasks/:id 
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, is_completed } = req.body;

  try {
    
    const check = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ message: `Task dengan ID ${id} tidak ditemukan` });
    }

    const existing = check.rows[0];

   
    const newTitle = title !== undefined ? title.trim() : existing.title;
    const newDesc = description !== undefined ? description : existing.description;
    const newStatus = is_completed !== undefined ? is_completed : existing.is_completed;

    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, is_completed = $3 WHERE id = $4 RETURNING *',
      [newTitle, newDesc, newStatus, id]
    );

    res.status(200).json({
      message: 'Task berhasil diupdate',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};


const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: `Task dengan ID ${id} tidak ditemukan` });
    }

    res.status(200).json({
      message: `Task dengan ID ${id} berhasil dihapus`,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
