var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book-app");
// connecting to a database

var BookModel = require("./book.js");
// require the page that has the book model
var AuthorModel = require('./author.js')

module.exports = {
	Book: BookModel,
	Author: AuthorModel
}
//  all of the models that it can use
