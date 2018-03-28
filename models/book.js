var mongoose = require('mongoose');
// requiring mongoose
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title:  String,

    // reference to author model by ID
    // because one suthor has many books
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author'
    },

    image: String,
    releaseDate:   String,
});

var BookModel = mongoose.model('Book', BookSchema);
// creates the book model

module.exports = BookModel;
// exports model
