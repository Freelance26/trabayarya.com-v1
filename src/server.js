const express = require('express');
// const Handlebars = require('handlebars');
// const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
// const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs-extra');
const methodOverride = require('method-override')
const morgan = require('morgan')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const moment = require('moment')
const multer = require('multer');
const paypal = require('paypal-rest-sdk');
const adminRouter = require('./routes/admin.router')
const socketio = require('socket.io')
const http = require('http')

//Inicializacion
const app = express();
const server = http.createServer(app);
const io = socketio(server);


require('./config/passport')

//Configuracion
app.set("port", process.env.PORT || 4000);


app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".ejs");

server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
  console.log('Environment:', process.env.NODE_ENV);
})


 app.enable('trust proxy')

 app.use(function(request, response, next) {

   if (process.env.NODE_ENV != 'development' && !request.secure) {
      return response.redirect("https://" + request.headers.host + request.url);
   }

   next();
 })


//paypal
paypal.configure({
  'mode': 'live', //sandbox or live
  // 'client_id': 'AYfUggD1uvncpIpc6W-qhx82rwSDD-qDqxKTv90GcIWuaPTprWfUuUWUeKWjoMRDa3a91yMwv415V_ZL',
  'client_id': 'AcCSVl5y31JUuQPfn8GQAikszz0b2DzjBUYgvE_MxE-E7-D6Hedn1OcInsvYz-PUKnMvVRrdCr9C0ss6L',

  // 'client_secret': 'ELMx0UJZHNmBxJkBqO02A_o9RsGFKExocMD8EEjdiP2yw6S5sgKTJdQGOvgpvcZ3SsPWqG6r1zxz1dGr'
  'client_secret': 'EEOe5vEXddxi76djWPLs4-bD5llkq8HFYI8VFoHImG_KrfTjfwO6DuVzY6lFoPefGh1ltWCezua9QPHc'

})



//Middlewares

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('message','Welcome to chatlance')


  //aviso cuando  usuario se conecta

  socket.broadcast.emit();
  socket.on('join',(params,callback)=>{
    socket.join(params);
    callback();
  })


  socket.on('chatMessage', (msg,callback) => {
    // io.emit('message')
    console.log(msg);
    console.log('Recibido, enviando a cliente');
    io.to(msg.room).emit('newMessage',{
      text: msg.text,
      room: msg.room,
      from: msg.sender
    });
    callback();
  })


});

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session ({
  secret: 'secret',
  resave: true,
  // resave: false,
  saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(multer({
  dest: path.join(__dirname,'./public/uploads/temp')
}).single('userpic'))
app.use(multer({
  dest: path.join(__dirname,'./public/uploads/temp')
}).single('usercv'))



//Variablles Globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});



//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/blog.routes'));
app.use(require('./routes/jobs.routes'));
app.use(require('./routes/user.routes'));
app.use(require('./routes/applications.routes'));
// app.use(require('./routes/admin.router'))
app.use(require('./routes/emails.routes'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));



//ERROR 404
/*app.use('*', function(req, res, next) {
  res.status(404).render('/contacto');
  next();
});*/



module.exports = app;


