const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: {
    type: String,
    required: true,
  },
  role: String, 
  country: String,
  passwordHash: String
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.passwordHash;
    delete returnedObject.__v;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
