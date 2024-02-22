const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  measurements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' }]
  
});
userSchema.plugin(passportLocalMongoose);


const User = model('User', userSchema);
module.exports = User;