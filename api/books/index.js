const router = require('express').Router();
const httpStatus = require('http-status');
const bookModel = require('./book.model');

router.route('/')
  .post((req, res, next) => {
    let book = new bookModel(req.body);

    book
      .save()
      .then(savedBook => {
        res.status(httpsStatus.OK)
          .json({ status: httpStatus.OK, data: savedBook });
      })
      .catch(error => {
        next(error);
      });
  })
  .get((req, res, next) => {
    bookModel
      .find({})
      .exec()
      .then(books => {
        if (books.length > 0) {
          res.status(httpStatus.OK)
            .json({ status: httpStatus.OK, data: books });
        } else {
          res.status(httpStatus.NO_CONTENT)
            .json({ status: httpStatus.NO_CONTENT });
        }
      })
  });

router.route('/:id')
  .put((req, res, next) => {
    bookModel
      .findOneAndUpdate(
        { _id: req.params.id },
        { '$set': req.body },
        { new: true }
      )
      .exec()
      .then(updatedBook => {
        res.status(httpStatus.OK)
          .json({ status: httpStatus.OK, data: updatedBook });
      })
      .catch(error => {
        next(error);
      });
  })
  .get((req, res, next) => {
    bookModel
      .findById(req.params.id)
      .exec()
      .then(book => {
        if (book) {
          res.status(httpStatus.OK)
            .json({ status: httpStatus.OK, data: book });
        } else {
          res.status(httpStatus.NO_CONTENT)
            .json({ status: httpStatus.NO_CONTENT });
        }
      });
  })
  .delete((req, res, next) => {
    bookModel
      .findByIdAndRemove(req.params.id)
      .exec()
      .then(() => {
        res.status(httpStatus.OK)
          .json({ status: httpStatus.OK, message: 'Book was deleted.' });
      })
      .catch(error => {
        next(error);
      });
  });

module.exports = router;
