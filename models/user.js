const {model, Schema} = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  
});
userSchema.plugin(passportLocalMongoose, {usernameField: "username"});


const User = model('User', userSchema);
module.exports = User;