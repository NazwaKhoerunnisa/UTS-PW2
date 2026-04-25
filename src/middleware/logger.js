// Middleware logging: cetak method, url, dan waktu setiap ada request masuk
const logger = (req, res, next) => {
  const waktu = new Date().toLocaleString('id-ID');
  console.log(`[${waktu}] ${req.method} ${req.url}`);
  next(); // jangan lupa next(), biar request lanjut ke handler berikutnya
};

module.exports = logger;
