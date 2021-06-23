//Modulos requeridos
const { Router } = require('express');
const app = require('../server')
const router = Router();
// const multer = require('multer');
const passport = require('passport');
const paypal = require('paypal-rest-sdk')
//Controladores
const { renderPerfilUser,
        renderEditPerfil,
        editPerfil,
        editPic,
        expeEstudios,
        expeTrabajo,
        renderListaCandidatos,
        renderLoginForm,
        renderLoginFormAdmin,
        login,
        descargarCv,
        renderChooseSignupOption,
        renderSignupForm,
        renderSignupFormE,
        renderMembership,
        renderMembershipSucess,
        renderEditJob,
        renderEditJobs,
        paymentMembership,
        signup,
         signupAdmin,
        renderSignupFormAdmin,
        eliminarTrabajo,
        eliminarTrabajoAdmin,
        renderEditPass,
        renderEditPassUsers,
        updateDatos,
        updateDatosUser,
        renderChat,
        createPayment,
        renderPaymentSucess,
        renderListaCandidatosPanel,
        isPlus,
        logout, 
        execute} = require('../controllers/user.controller');
const { isAuthenticated,renderPanel,eliminarUsuario, renderPanelPagos, eliminarUsuarioPago, renderPanelReportesPagos } = require('../helpers/auth');
const { getchatPage } = require('../controllers/privatechat.controller');

//Ruta de lista de freelancers
router.get('/candidatos/:page', renderListaCandidatos);


//Ruta de perfil de freelancer
router.get('/perfil-user/:id', renderPerfilUser);
router.get('/perfil-user/:id', descargarCv);
router.get('/user/chat/:id&:iduser',isAuthenticated,getchatPage);

// router.get('/perfil-user/:id', function (req,res) {
//     res.download(__dirname+'/uploads/'+req.params.id)
// });


//Ruta de Editar Perfil
router.get('/user/edit-perfil', isAuthenticated, renderEditPerfil);

router.post('/edit-perfil', editPerfil);
router.post('/user/edit_pic', editPic);

router.get('/user/edit-jobs',isAuthenticated,renderEditJob);

router.get('/user/edit-pass',isAuthenticated,renderEditPass);
router.post('/user/update-datos', updateDatos);



router.delete('/user/edit-jobs/eliminar/:id', eliminarTrabajo)




router.post('/user/expe_trabajos', expeTrabajo );
router.post('/user/expe_estudios', expeEstudios );


//Ruta de inicio de sesion
router.get('/user/login',renderLoginForm);
router.post('/user/login',  login);


// router.post('/user/login',(req,res,next) =>{
//     passport.authenticate("local",(err,user,info) =>{
//         if (err) throw err;
//         if(!user) res.send("No existe usuario")
//         else{
//             req.logIn(user, err => {
//                 if(err) throw err;
//                 res.send('sucess')
//             })
//         }
//     })(req,res,next)
// })

// router.post(
//     'user/login',
// passport.authenticate('local',{
//     failureRedirect:'/',
// }),(req,res)=>{
//     //const cargoUser = await User.findOne(cargo = ''));
//     if (req.User.tipo_cuenta === 'Empresa') {
//         console.log("Redirect")
//         res.redirect('/');
//     }
//     if (req.User.tipo_cuenta === 'Freelancer') {
//         console.log("Redirect2")
//         res.redirect('user/edit-perfil');
//     }
// })

//Ruta de elección de registro de usuario
router.get('/user/choose-signup-option', renderChooseSignupOption);
router.get('/user/membresia', isAuthenticated,renderMembership);
// router.post('/user/pay',isAuthenticated,paymentMembership);

router.post('/user/pay',createPayment);
router.get('/user/sucess',execute);
router.get('/user/pago-membresia',isAuthenticated,renderMembershipSucess);

router.get('/user/pago',isAuthenticated,renderPaymentSucess);


// router.get('/user/sucess', isAuthenticated,renderMembershipSucess);
// router.get('/user/sucess',paymentMembership);

// router.get('/', (req, res) => {
//     const payerId = req.query.PayerID;
//     const paymentId = req.query.paymentId;
  
//     const execute_payment_json = {
//       "payer_id": payerId,
//       "transactions": [{
//           "amount": {
//               "currency": "USD",
//               "total": "25.00"
//           }
//       }]
//     };
//     paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//       if (error) {
//           console.log(error.response);
//           throw error;
          
//       } else {
         
//           console.log('pago')

//       }
//       console.log('exito')
//   });
//   });


//Ruta de creacion de usuario
router.get('/user/signup', renderSignupForm);
router.post('/user/signup', signup);


//Ruta de creacion usuario-empresa
router.get('/user/signup-enterprise', renderSignupFormE);
router.post('/user/signup-enterprise', signup);

//Ruta de cerrar sesion
router.get('/user/logout', logout);

// router.get('/administracion/panel', isAuthenticated,renderPanel)

router.get('/administracion/pagos', isAuthenticated,renderPanelPagos)
router.get('/administracion/reportes', isAuthenticated,renderPanelReportesPagos)

router.delete('/administracion/eliminar/:id',isAuthenticated, eliminarUsuarioPago)

router.get('/administracion/panel/:id', isAuthenticated,renderEditPassUsers)

router.post('/administracion/panel/update',isAuthenticated, updateDatosUser)


router.get('/administracion/signup_', renderSignupFormAdmin)
router.post('/administracion/signup_', signupAdmin);

router.get('/administracion/login', renderLoginFormAdmin)
router.post('/administracion/login', login);

router.get('/lista-trabajos-admin/:page', renderEditJobs);
router.delete('/administracion/edit-jobs/eliminar/:id',isAuthenticated, eliminarTrabajoAdmin)


router.delete('/administracion/panel/eliminar/:id',isAuthenticated, eliminarUsuario)

router.get('/user/update-datos', updateDatos);


router.get('/administracion/panel/candidatos/:page',isAuthenticated, renderPanel);



//Exportando modulo
module.exports = router;