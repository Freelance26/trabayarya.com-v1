const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');
const Admin = require('../models/Admins');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, done) => {
    
        // Match email user
        const user = await User.findOne({email})
        const admin = await Admin.findOne({email})
        console.log('ya busque el usuario')
        if (!user) {
            console.log('estoy en el primer if')
            console.log('usuario no encontrado')
            return done(null, false, {message: 'Usuario no encontrado'});
            
        } else {
            console.log('estoy en el primer else')
            // Match password user
            const match = await user.matchPassword(password);
            if (match){
                console.log('estoy en el segundo if')
                
                return done(null, user)
            } else {
                console.log('estoy el el segundo else')
                console.log('contrasena incorrecta')
                return done(null, false, {message: 'Contraseña Incorrecta'});
            }
        }
    }))




passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done (err, user);
    })
})