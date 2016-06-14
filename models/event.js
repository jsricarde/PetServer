var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Event = new Schema({
    name: String,
    country: String,
    city: String,
    latitude: String,
    longitude: String,
    time_start_event: String,
    date_start_event: String,
    description: String,
    id_user_rescue: String,
    status: String
});


module.exports = mongoose.model('Event', Event);
