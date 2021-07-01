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

        if (!user) {
 
            return done(null, false, {message: 'Usuario no encontrado'});
            
        } else {

            // Match password user
            const match = await user.matchPassword(password);
            if (match){

                
                return done(null, user)
            } else {

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