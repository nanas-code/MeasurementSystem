const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  }
});
userSchema.plugin(passportLocalMongoose);

const User = model('User', userSchema);
module.exports = User;