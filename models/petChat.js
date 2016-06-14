var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetChat = new Schema({
    created: Date,
    text: String,
    user: String,
    room: String
});


module.exports = mongoose.model('PetChat', PetChat);