const express = require('express');
//const bodyParser = require('body-parser');
const mongodb = require('./model/connect')
const app = express();

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-with, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
    next();
});


app.use('/', require('./routes/contacts'));


// --- Configuración de EJS ---
app.set('view engine', 'ejs'); // Le decimos a Express que use EJS como motor de plantillas
app.set('views', './views');   // Le decimos a Express dónde están tus archivos de plantilla (ej. en una carpeta 'views')
// --- Fin de Configuración de EJS ---

mongodb.initDb((err) => {
    if(err){
        console.log(err);
    }
    else{
        app.listen(process.env.PORT || port, () => {console.log("Running and db on port "+ (process.env.PORT || 3000))});
    }
});
 
