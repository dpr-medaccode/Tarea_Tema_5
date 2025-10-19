const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const path = require('path');

// Servir la carpeta public como archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors());

// Ruta para recibir datos del formulario
app.post('/send-email', async (req, res) => {
    const { email, subject, message } = req.body;

    // Validación de campos
    if (!email || !subject || !message) {
        return res.status(400).json({ success: false, error: 'Todos los campos son obligatorios' });
    }

    try {
        // Configuración del transporte usando Postmark SMTP
        const transporter = nodemailer.createTransport({
            host: "smtp.postmarkapp.com",
            port: 587,
            auth: {
                user: process.env.POSTMARK_USER,  // token Postmark
                pass: process.env.POSTMARK_PASS   // token Postmark
            }
        });

        // Opciones del correo
        const mailOptions = {
            from: process.env.MAIL_FROM, // tu correo verificado @alu.medac.es
            to: email,                    // destinatario: el correo que puso el usuario
            subject: subject,
            text: message
        };

        console.log('Enviando correo desde:', mailOptions.from);
        console.log('Hacia:', mailOptions.to);

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Correo enviado correctamente' });

    } catch (error) {
        console.error('Error enviando correo:', error);
        res.status(500).json({ success: false, error: 'Error enviando el correo' });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
