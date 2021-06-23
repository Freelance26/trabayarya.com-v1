//Modulos requeridos
const express = require('express');
const paypal = require('paypal-rest-sdk')
const router = express.Router();

//Autenticacion
const { isAuthenticated } = require('../helpers/auth')

//Controlador
const { newApplicantions, newPay,newReport,createPayment,execute } = require('../controllers/applications.controller');

//Ruta de creacion de aplicacion a anuncio
router.post('/appli/newApplicantions', isAuthenticated, newApplicantions)
// router.post('/appli/pay', isAuthenticated, newPay)
router.post('/appli/report', isAuthenticated, newReport)

router.post('/appli/pay', isAuthenticated,createPayment);
router.get('/appli/sucess', isAuthenticated,execute);


router.get('/payment', (req, res) => {
    console.log(req.query);
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    };
    console.log('PAGO')
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
          
      } else {
       
      }

  });
});



//Exportando modulo
module.exports = router;