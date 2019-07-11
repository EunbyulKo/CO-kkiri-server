var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var volenteerSchema = new Schema({
    name: String,
    introduce: String,
    image: String,
    tags: [String]
});

module.exports = mongoose.model('volenteer', volenteerSchema);