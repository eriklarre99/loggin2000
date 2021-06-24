const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// inicializacion
const app = express();
require('./database');
require('./passport/local-auth');

// Settings
app.set('port' , process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine' , '.ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //decimos para recibir datos sencillos, not img, etc
app.use(express.json());
app.use(session({
    secret: 'session9700',
    resave: false,
    saveUninitialized: false
}));
app.use(flash()); // flash va antes de inicializar passport pero despues de sesiones
app.use(passport.initialize())
app.use(passport.session());

app.use( (req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.notAuthenticated = req.flash('notAuthenticated');
    app.locals.cmdMessage = req.flash('cmdMessage');
    app.locals.user = req.user;
    // console.log(app.locals);
    next();
})

// routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/cmd'));

// public static files
app.use(express.static(path.join(__dirname , 'public')));



// 404 handler
app.use( (req, res, next) => {
    res.status(404).render('404');
    // res.status(404).send('404 Not found');
});  

// starting the server
app.listen( app.get('port') , () => {
    console.log( `Port in:  ${app.get('port')}` );
});
