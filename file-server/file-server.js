import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// __dirname analog w ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3005;

// Konfiguracja przechowywania plików
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Można dodać Date.now() dla unikalności
  }
});

const upload = multer({ storage });

// Endpoint do wysyłania plików
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send('File uploaded successfully.');
});

// Endpoint do pobierania plików
app.get('/files/:filename', (req, res) => {
  const filepath = path.join(__dirname, 'uploads', req.params.filename);
  if (!fs.existsSync(filepath)) return res.status(404).send('File not found.');
  res.download(filepath);
});

// Start serwera
app.listen(PORT, () => {
  console.log(`File server running on http://localhost:${PORT}`);
});
