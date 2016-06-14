var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    email: String,
    latitude: String,
    longitude: String,
    age: String,
    gender: String,
    country: String,
    city: String,
    description: String,
    status: String,
    first_name: {
      type: String,
        default: ''
    },
    profile_image: {
      type: String,
        default: ''
    },
    last_name: {
      type: String,
        default: ''
    },
    type: {
      type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

User.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', User);
