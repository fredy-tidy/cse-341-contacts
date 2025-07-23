const express = require('express');
const router = express.Router();

const contactsController = require('../controller/contacts');

router.get('/getAll', contactsController.getAll);
router.get('/getOne/:id', contactsController.getSingle);
router.post('/create', contactsController.createContact);
router.put('/update/:id',contactsController.updateContact);
router.delete('/delete/:id',contactsController.deleteContact);
router.use('/',require('./swagger'));

router.get('/', (req,res) => {
    // swagger.tags=['Hello World']
    res.send('Hellow World');
});


module.exports = router;

