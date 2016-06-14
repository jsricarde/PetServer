var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pet = new Schema({
    name: String,
    country: String,
    city: String,
    state: String,
    description: String,
    latitude: String,
    longitude: String,
    color: String,
    size: String,
    age: String,
    principal_image: String,
    id_user_rescue: String,
    status: String
});

module.exports = mongoose.model('Pet', Pet);
