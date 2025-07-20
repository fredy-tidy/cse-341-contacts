const express = require('express');
const mongodb = require('./model/connect')
const app = express();

const port = 3000;

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
 
