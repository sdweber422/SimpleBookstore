const express = require('express');
const router = express.Router();
const Authors = require('../database/db').Authors
const Genres = require('../database/db').Genres
const Books = require('../database/db').Books

/* GET home page. */
router.get('/', function(req, res, next) {
  // const page = req.body.page || 1
  // const offset = (page - 1) * 10
  // return Books.all(offset)
  let random = []
  for (var i = 0; i < 10; i++) {
    let id = Math.floor(Math.random()*1000)
    random.push(Books.get(id))
  }
  Promise.all(random)
  .then(books => {
    const bookList = books
    const bookIds = books.map(book => book.id)
    if(bookIds.length === 0){
      return Promise.resolve(books)
    }
    return Promise.all([Authors.get(bookIds), Genres.get(bookIds), bookList])
    })
    .then(results => {
      const authors = results[0]
      const genres = results[1]
      const books = results[2]
      books.forEach(book => {
        book.authors = authors.filter(author => author.book_id === book.id)
        book.genres = genres.filter(genre => genre.book_id === book.id)
      })
      return books
  })
  .then( items => {
    console.log(items)
    res.render('index', { title: 'Express', books: items })
  })
});

router.get('/details/:id', function(req, res, next) {
  var id = req.params.id
  Books.get(id).then((book) => {
    res.render('details', { book: book })
  })
});

// router.post('/details', function(req, res, next) {
//
// })

module.exports = router;
