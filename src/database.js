const mongoose = require('mongoose');
const { mongodb } = require('./keys');


// mongoose.connect(mongodb.URI, { 
mongoose.connect(mongodb.URIenlaNube, { 
    useNewUrlParser: true, //evitar mensajes de moongose en consola
    useUnifiedTopology: true 
})
    .then( db => console.log( 'MongoDB is connected' ) )
    .catch( err => console.error(err) )