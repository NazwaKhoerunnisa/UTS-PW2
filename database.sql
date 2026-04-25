
CREATE TABLE IF NOT EXISTS tasks (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO tasks (title, description) VALUES
  ('Belajar Express.js', 'Pelajari routing dan middleware'),
  ('Buat project UTS', 'Task Manager dengan PostgreSQL');
