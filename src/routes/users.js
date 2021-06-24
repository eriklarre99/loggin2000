const router = require('express').Router();
const passport = require('passport');

// creation of users - SignUp
router.get('/signup', (req, res, next) => {
    res.render('users/signup')
});

router.post('/signup',  passport.authenticate('local-signUp', {
    successRedirect: 'profile',
    failureRedirect: 'signup',
    passReqToCallback: true
}));


// login of users - - SignIn
router.get('/signin', (req, res, next) => {
    res.render('users/signin')
})

router.post('/signin',  passport.authenticate('local-signIn', {
    successRedirect: 'profile', 
    failureRedirect: 'signin',
    passReqToCallback: true
}));

// views of welcome and profile 
router.get('/welcome', isAuthenticated, (req, res, next) => {
    res.render('users/welcome')
})

router.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('users/profile')
})

router.get('/listUsers', isAuthenticated, async (req, res, next) => {
    const User = require('../models/user');
    const listUsers = await User.find();
    console.log('List of Users');
    console.log(listUsers);
    res.render('users/listUsers', { listUsers } )
})

// comprobación de autenticación
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('notAuthenticated', 'Regístrate o Inicia sesión ! ')
    res.redirect('/')
}

// logout of user - exit session
router.get('/logout', (req, res, next) => {
    req.logout();
    console.log('logout ok');
    res.redirect('/signin');
});


module.exports = router;