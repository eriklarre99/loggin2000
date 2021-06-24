const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// guardar sesiones una vez registrado o logueado
passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});


// proceso de autenticar y regitrar un nuevo usuario
passport.use('local-signUp', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, email, password, done) => {

    // validacion de si existe ya un email
    const userBD = await User.findOne( {'email': email} )
    // console.log(userBD);
    const { username } = req.body
    console.log(username);

    if (userBD) {
        console.log('user already exists ');
        return done(null, false, req.flash('signupMessage', 'El email ya existe !'))
    } else {
        console.log('Username does not exist in BD');

        const newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = newUser.encryptPass(password);
        await newUser.save();
        
        done(null , newUser);
    }
}));

// proceso de autenticar y loguear un usuario ya existente
passport.use('local-signIn', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, email, password, done) => {

    // validacion de si existe ya un email
    const userBD = await User.findOne( {'email': email} )
    console.log('Input: ',email, ' Pass: ', password);

    if (!userBD) {
        // si no existe el usuario
        return done(null, false, req.flash('signinMessage', 'Username does not exist !'));
    } 
              
    if (!userBD.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect Password !'));
    }

    return done(null, userBD);
}));