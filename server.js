const express = require('express');
const app = express();

const port = 3000;

app.use('/', require('./routes'));
 
app.listen(process.env.PORT || port, () => {console.log("Running on port "+ (process.env.PORT || 3000))});