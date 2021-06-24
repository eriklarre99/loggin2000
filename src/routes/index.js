const express = require('express');
const router = express.Router();

// home view
router.get('/', (req, res, next) => {
    // res.send('hey view home')
    res.render('index.ejs')
})

module.exports = router;