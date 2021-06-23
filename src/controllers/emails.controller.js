/*
const { Router } = require('express');
const  nodemailer  =  require ( 'nodemailer' ) ;

const emailCtrl = {}

emailCtrl.enviarEmaildeContacto = async (req, res) => {
    const { name, email, phone, message } = req.body;

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: '',
        port: ,
        secure: ,
        auth: {
            user: '',
            pass: ''
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '', // sender address,
        to: '',
        subject: '',
        // text: 'Hello World'
        html: contentHTML
    })
    res.redirect('/');
});

module.exports = emailCtrl;
*/