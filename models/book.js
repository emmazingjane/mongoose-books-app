var mongoose = require('mongoose');
// requiring mongoose
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title:  String,
    author: String,
    image: String,
    releaseDate:   String,
});

var BookModel = mongoose.model('Book', BookSchema);
// creates the book model

module.exports = BookModel;
// exports model
