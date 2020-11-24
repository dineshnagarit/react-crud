const bookController = require('./controllers/book.controller');

module.exports = (app) => {

  app.post('/api/books/',
    bookController.createBook
  );

  app.put('/api/books/:id',
    bookController.updateBook
  );

  app.get('/api/books',
    bookController.getBooks
  );

  app.get('/api/books/:id',
    bookController.getBook
  );

  app.delete('/api/books/:id',
    bookController.deleteBook
  );

};
