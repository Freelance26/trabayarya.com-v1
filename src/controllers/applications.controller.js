//Creacion de controlador
const applicationsCtrl = {}
const paypal = require('paypal-rest-sdk')
const request = require('request');

//Importancion de modulos
const Applications = require('../models/Applications');
const Payment = require('../models/Payment');
const PaymentReport = require('../models/PaymentReport');

const Jobs = require('../models/Jobs');
const User = require('../models/Users');
const nodemailer = require('nodemailer')


//live
const CLIENT = 'AfWRb0MCwvso9SNBs7wpHWeLllTnkZx7nfcEKM-H3tnBemfvGHW3MHx2x4rGMhHWmYyIROCh5AJSRgIi';
const SECRET = 'EK1JvRf3Marhb8EoKzO1KBtwR28MW2wDeivn-oUbFdHWyqsSEsPnTZCfbooE58OkI_1KGK1K7HYwWFOz';
const PAYPAL_API = 'https://api-m.paypal.com'; // Live https://api-m.paypal.com
    


//sandbox
// const CLIENT = 'AWZ8rEH_KwtPMqF94psimgpNBi03FPVvVQxIaTvjsp_9i2p7SiVfo6U_HdvPKuF4IsYf6CPCsY6Ik-8v';
// const SECRET = 'EOcXbGIOoaFg8RIswxGQigR03VRfafN7oIWKsbPjgNz-rrwVwlF3PyrqE180kuNQ17vaxc3llfBaqxtO';
// const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com

const auth = { user: CLIENT, pass: SECRET }

//Vista de creacion de aplicacion
applicationsCtrl.newApplicantions = async (req, res) => {
    if (req.user) {

        if (req.user.tipo_cuenta === 'Freelancer') {

            const appliJobs = await Applications.findOne({ id_jobs: req.body.id_anuncio, id_applicant: req.user.id })
            if (appliJobs !== null) {

                req.flash('error_msg', 'Ya te has postulado para este anuncio')
                res.redirect('/lista-trabajos');

            } else {
                const { id_jobs, id_applicant, name_applicant, email_applicant, phone_applicant, message,email_user } = req.body;
                const profile_img = await User.findOne({profile_img: req.user.filename});
                const newApplicant = new Applications({ id_jobs, id_applicant, name_applicant, email_applicant, phone_applicant, message,profile_img:req.user.filename });
                await newApplicant.save();
                if(newApplicant){
                    contentHTML = `
                    <h1>Información del usuario</h1>
                    <ul>
                        <li>Nombre de usuario: ${name_applicant}</li>
                       
                        <li>Número de contacto: ${phone_applicant}</li>
                        
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
                            from: "'Studio73pty Server' <test_web@studio73pty.com>",
                            to: email_user,
                            subject:'Webiste contact form',
                            //text:'hello world'
                            html: contentHTML
                        })
                    
           
                    //req.flash('success_msg', 'Solicitud Enviada')
                    res.redirect('/')
                        
                    } catch (error) {
                        
                    }

            
                }
                
            }
        } else {
            req.flash('error_msg', 'Accion solo permitida para los Freelancers');
            res.redirect('/')
        }
    }
};

applicationsCtrl.newPay = async (req, res) => {
    const { id_applicant,salario, email_applicant, name_applicant,id_jobs,email } = req.body;

    const newPayment = new Payment({id_jobs,id_applicant,email_applicant,monto_pago:salario,email_employe:email,payed_user:name_applicant});

    var price = parseFloat(salario);
    var tempTotal= (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://freelance26.herokuapp.com/user/sucess",
            "cancel_url": "http://freelance26.herokuapp.com/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Pago",
                    "sku": "001",
                    "price": tempTotal,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": tempTotal
            },
            "description": "Pago servicio freelance"
        }]
    };

    paypal.payment.create(create_payment_json,  function  (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
              }
   
            }
            newPayment.save();
        }
      });
};


applicationsCtrl.newReport = async (req, res) => {
 
    const { id_payment,token, id_payer,email, monto,id,tipo_cuenta } = req.body;

    var monto_pagado = parseFloat(monto);
    var montoTotal = (monto_pagado).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    const newPayment = new PaymentReport({id_payment,token,id_payer,monto:montoTotal,email,id_user:id,tipo_cuenta});

        await newPayment.save();
        req.flash('success_msg', 'Anuncio Publicado Correctamente')
        res.redirect('/')
};


applicationsCtrl.createPayment = (req, res) => {
    const { id_applicant,salario, email_applicant, name_applicant,id_jobs,email } = req.body;

    const newPayment = new Payment({id_jobs,id_applicant,email_applicant,monto_pago:salario,email_employe:email,payed_user:name_applicant});

    var price = parseFloat(salario);
    var tempTotal= (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  

    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                value: price
            }
        }],
        application_context: {
            brand_name: `Freelance26.com`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
            return_url: `https://freelance26.herokuapp.com/user/pago`, // Url despues de realizar el pago
            cancel_url: `https://freelance26.herokuapp.com/` // Url despues de realizar el pago
        }
    }
    //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]

    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, (err, response) => {

        for(let i = 0;i < response.body.links.length;i++){
            if(response.body.links[i].rel === 'approve'){
             res.redirect(response.body.links[i].href);
  
           }
        }
        newPayment.save();
  
    })
}



applicationsCtrl.execute = async (req, res) => {

    const token = req.query.token; //<-----------
     const datos = req.query;

    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (err, response) => {
        //  res.json({ data: response.body })
        //  res.render('users/sucess', {status_user,datos});
         res.redirect('/user/pago');
            
      

    })
}


module.exports = applicationsCtrl;