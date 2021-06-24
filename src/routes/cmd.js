const router = require('express').Router();

const cmdSchema = require('../models/cmd');

// creation of cmd 
router.get('/listCMD', isAuthenticated, async (req, res, next) => {
    const listCMD = await cmdSchema.find().sort( {'createdAt' : -1 } );
    res.render('cmd/listCMD', { listCMD });
});

router.post('/cmd/newCmd', isAuthenticated, async (req, res, next) => {
    const { cmd, description } = req.body ;
    
    const newCMD = new cmdSchema({ cmd, description });
    await newCMD.save();

    req.flash('cmdMessage', 'Guardado con éxito ! ')

    res.redirect('/listCmd');
});



// comprobación de autenticación
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('notAuthenticated', 'Regístrate o Inicia sesión ! ')
    res.redirect('/')
}


module.exports = router;