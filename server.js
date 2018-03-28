// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

var db = require('./models/index.js');
// requires the models and will automatically look for index.js even if its not written

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));



////////////////////
//  DATA
///////////////////

var books = [
  {
    _id: 15,
    title: "The Four Hour Workweek",
    author: "Tim Ferriss",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
    release_date: "April 1, 2007"
  },
  {
    _id: 16,
    title: "Of Mice and Men",
    author: "John Steinbeck",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
    release_date: "Unknown 1937"
  },
  {
    _id: 17,
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
    release_date: "Unknown 1597"
  }
];


var newBookUUID = 18;







////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  console.log('books index');

  db.Book.find({}, function(err, books){
    // .find() is a mongoose method
    if (err){
      console.log(err);
    } else {
      res.json(books);
    }



  })
  // points tot he database to the Book model then finds all of them
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  console.log('books show', req.params);

  db.Book.findById(req.params.id, function(err, singleBook){
    if (err) {
      console.log(err);
    } else {
      res.json(singleBook);
    }
  })
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  console.log('books create', req.body);
  // var newBook = req.body;
  // newBook._id = newBookUUID++;
  // books.push(newBook);
  db.Book.create(req.body, function(err, newBook){
    if (err) {
      console.log(err);
    } else {
      res.json(newBook)
    }
  })
});

// update book
app.put('/api/books/:id', function(req,res){
// get book id from url params (`req.params`)
  console.log('books update', req.params);

   db.Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updateBook){
    if (err) {
      console.log(err);
    } else {
      res.json(updateBook);
    }
  })

});

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);

  db.Book.findByIdAndRemove(req.params.id, function(err, bookToDelete){
    if (err) {
      console.log(err);
    } else {
      res.json(bookToDelete);
    }
  })
});





app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});
