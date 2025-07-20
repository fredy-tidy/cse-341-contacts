const mongodb = require('../model/connect');
const ObjectId = require('mongodb').ObjectId;
/** 
const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type','aplication/json');
        res.status(200).json(contacts);
    });
};
*/
const getAll = async (req, res) => {
    try {
      const result = await mongodb.getDb().db().collection('contacts').find();
      const contacts = await result.toArray(); // Aquí tienes tus datos
  
      // --- ¡Cambio clave aquí! ---
      // Renderiza la plantilla 'contacts.ejs' y le pasa los datos de 'contacts'
      res.render('contacts', { contacts: contacts }); // El primer argumento es el nombre del archivo EJS sin la extensión
                                                  // El segundo argumento es un objeto con los datos que quieres que la plantilla acceda
    } catch (error) {
      console.error('Error al obtener contactos para la página:', error);
      // Puedes renderizar una página de error o simplemente enviar un mensaje
      res.status(500).send('<h1>Error del Servidor</h1><p>Hubo un problema al cargar los contactos.</p>');
    }
  };

  const getSingle = async (req, res) => {
    try {
      // 1. Obtener el ID del parámetro de la URL y convertirlo a ObjectId
      const contactId = new ObjectId(req.params.id);
  
      // 2. Buscar un solo documento por ID usando findOne()
      // Se pasa un objeto de consulta { _id: contactId }
      const contact = await mongodb.getDb().db().collection('contacts').findOne({ _id: contactId });
  
      // 3. Verificar si el contacto fue encontrado
      if (!contact) {
        // Si no se encuentra el contacto, puedes:
        // a) Renderizar una página de "no encontrado"
        res.status(404).render('404', { message: 'Contacto no encontrado' });
        // b) O simplemente enviar un mensaje de texto
        // res.status(404).send('<h1>404 Not Found</h1><p>El contacto solicitado no existe.</p>');
        return; // Importante para detener la ejecución si no se encuentra
      }
  
      // 4. Si el contacto se encuentra, renderizar la plantilla 'contact-details.ejs'
      // y pasarle el objeto 'contact'
      res.render('contact', { contact: contact });
  
    } catch (error) {
      // 5. Manejo de errores (ej. ID inválido, problema de conexión a la BD)
      console.error('Error al obtener un solo contacto:', error);
      // Puedes renderizar una página de error genérica
      res.status(500).render('error', { message: 'Ocurrió un error al cargar el contacto.' });
      // O enviar un mensaje de texto
      // res.status(500).send('<h1>Error del Servidor</h1><p>Hubo un problema al cargar el contacto.</p>');
    }
  };
/** const getSingle = async (req, res) => {
    const contactId = ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find(contactId);
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type','aplication/json');
        res.status(200).json(contacts);
    });

};
*/

module.exports = {
    getAll,
    getSingle
};