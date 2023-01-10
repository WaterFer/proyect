const mongoose = require('mongoose');

const citasSchema = new mongoose.Schema({
  dia: String,
  servicios: String,
  
});

citasSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Citas = mongoose.model('Citas', citasSchema);

module.exports = Citas;
