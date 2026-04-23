const express = require('express');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/mahasiswa', (req, res) => {
  const data = db.prepare('SELECT * FROM mahasiswa').all();

  res.json({
    success: true,
    total: data.length,
    data: data
  });
});

app.post('/mahasiswa', (req, res) => {
  const { nama, nim, jurusan } = req.body;

  if (!nama || !nim || !jurusan) {
    return res.status(400).json({
      success: false,
      message: 'nama, nim, dan jurusan wajib diisi'
    });
  }

  const stmt = db.prepare(
    'INSERT INTO mahasiswa (nama, nim, jurusan) VALUES (?, ?, ?)'
  );
  const result = stmt.run(nama, nim, jurusan);

  res.status(201).json({
    success: true,
    message: 'Data mahasiswa berhasil ditambahkan',
    data: {
      id: result.lastInsertRowid,
      nama,
      nim,
      jurusan
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});