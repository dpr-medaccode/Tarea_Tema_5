const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());              // Permite solicitudes desde cualquier origen (útil mientras pruebas)
app.use(bodyParser.json());    // Para leer JSON del body

// Ruta de prueba
app.post('/send-email', (req, res) => {
  const { email, subject, message } = req.body;

  console.log('Datos recibidos del front:');
  console.log('Email:', email);
  console.log('Asunto:', subject);
  console.log('Mensaje:', message);

  // Respuesta al front
  res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
