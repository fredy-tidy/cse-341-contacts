const mongodb = require('../model/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Contacs']
    try {
      const result = await mongodb.getDb().db().collection('contacts').find();
      const contacts = await result.toArray(); 
         res.status(200).json(contacts);
       } catch (error) {
      console.error('Error to get contacts', error);
     res.status(500).json({ message: 'Error in server.' });
      }
  };

  const getSingle = async (req, res) => {
    //#swagger.tags=['Contacs']
    try {
      const contactId = ObjectId.createFromHexString(req.params.id);
      const contact = await mongodb.getDb().db().collection('contacts').findOne({ _id: contactId });
  
      if (!contact) {
        res.status(404).json({ message: 'Contacto no encontrado' });
        return;
       }
       res.status(200).json(contact);
  
    } catch (error) {
      console.error('Error to get contact:', error);
      
      res.status(500).json({ message: 'Error Server to get contact' });
     }
  };

const createContact = async (req, res) => {
  //#swagger.tags=['Contacs']
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    return res.status(400).json({ message: 'First name, last name, and email are required fields.' });
  }
   const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoritColor: req.body.favoritColor,
      birthday: req.body.birthday
  };
  try {
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
     if (response.acknowledged) {
      res.status(201).json({
        message: 'Contact created successfully',
        contactId: response.insertedId // Return the ID of the newly created contact
      });
    } else {
       res.status(500).json({ message: 'Failed to create contact: Operation not acknowledged by database.' });
    }
  } catch (error) {
    console.error('Error creating contact:', error); // Log the actual error for debugging

    // Handle specific MongoDB errors (e.g., duplicate key)
    if (error.code === 11000) { // MongoDB duplicate key error code
        return res.status(409).json({ message: 'A contact with this email already exists.' });
    }

    // Generic catch-all for other unexpected errors
    res.status(500).json({ message: error.message || 'An unexpected error occurred while creating the contact.' });
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacs']
  const contactId = ObjectId.createFromHexString(req.params.id);
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    return res.status(400).json({ message: 'First name, last name, and email are required fields.' });
  }
  const contact = {
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     email: req.body.email,
     favoritColor: req.body.favoritColor,
     birthday: req.body.birthday
 };
 const response = await mongodb.getDb().db().collection('contacts').replaceOne({_id:contactId}, contact);
 if (response.modifiedCount > 0){
   res.status(200).json({
    message: 'Contact update successfully',
    contactId: contactId //  as
  });
 } else {
   res.status(500).json(response.error || 'Some error occurred while updating the contact')
 }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacs']
  const contactId = ObjectId.createFromHexString(req.params.id);
 
 const response = await mongodb.getDb().db().collection('contacts').deleteOne({_id: contactId});
 if (response.deletedCount > 0){
   res.status(200).json({
    message: 'Contact delete successfully',
    contactId: contactId 
  });
 } else {
   res.status(500).json(response.error || 'Some error occurred while delete the contact')
 }
};




module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};