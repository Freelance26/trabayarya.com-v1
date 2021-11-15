//Modulos requeridos
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const User = require('../models/Users')

//Controlador de Email
const { enviarEmaildeContacto } = require('../controllers/emails.controller');

//Controlador de Contacto
const { crearMensajeDeContacto } = require('../controllers/index.controller')

//Ruta de creacion de aplicacion a anuncio
//router.post('/formulario-contacto', enviarEmaildeContacto, crearMensajeDeContacto)
router.post('/send-mail', async (req,res) => {
    const { name, email, phone, message } = req.body;

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Nombre de usuario: ${name}</li>
            <li>Correo electrónico: ${email}</li>
            <li>Número de contacto: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;

    const transporter = nodemailer.createTransport({
        host: 'mail.studio73pty.com',
        port: 587,
        secure: false,
        auth: {
            user: 'test_web@studio73pty.com',
            pass: '123456qwerty'
        },
        tls:{
            rejectUnauthorized: false
        }
    })

    try {
        const info = await transporter.sendMail({
            from: "'Freelance26' <info@freelance26.com>",
            to: "info@freelance26.com",
            subject:'Webiste contact form',
            //text:'hello world'
            html: contentHTML
        })
     
  
        res.render('contacto', {msg: 'Email enviado'})
    } catch (error) {
        console.log(error)
    }
    
    
})

router.post('/send-mail-user/', async (req,res) => {
    

    const { username, email, message, email_user } = req.body;



    contentHTML = `
        <h1>Información de usuario</h1>
        <ul>
            <li>Nombre de usuario: ${username}</li>
        </ul>
        <p>${message}</p>
    `;


    console.log('test')
    const transporter = nodemailer.createTransport({
        host: 'mail.fonsecatours.com',
        port: 587,
        secure: false,
        auth: {
            user: 'emails@fonsecatours.com',
            pass: '123456789'
        },
        tls:{
            rejectUnauthorized: false
        }
    })
    try {
        const info = await transporter.sendMail({
            from: "'Freelance26' <info@freelance26.com>",
            to: `${email_user}`,
            
            subject:'Alguien quiere contactar contigo!',
            //text:'hello world'
            html: contentHTML
        })
        console.log(info)
        res.redirect('/')
        
    } catch (error) {
        console.log(error)
    }
    
    
    
})

//Exportando modulo
module.exports = router;