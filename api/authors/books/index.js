const router = require('express').Router({mergeParams: true});
const httpStatus = require('http-status');
const authorModel = require('../author.model');
const bookModel = require('../../books/book.model');

router.route('/')
  .get((req, res, next) => {
    bookModel
      .find({ author: req.params.authorId })
      .populate({path: 'author'})
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
      .catch(error => {
        next(error);
      });
  })
  .post((req, res, next) => {
    authorModel
      .findById(req.params.authorId)
      .exec()
      .then(author => {
        const parameters = Object.assign({}, req.body, {author: author._id});

        const book = new bookModel(parameters);

        book
          .save()
          .then(savedBook => {
            res.status(httpStatus.OK)
              .json({ status: httpStatus.OK, data: savedBook });
          })
          .catch(error => {
            next(error);
          });
      })
      .catch(error => {
        next(error);
      });
  });

router.route('/:id')
  .get((req, res, next) => {
    bookModel
      .findById(req.params.id)
      .populate('author')
      .exec()
      .then(book => {
        if (book) {
          res.status(httpStatus.OK)
            .json({ status: httpStatus.OK, data: book });
        } else {
          res.status(httpStatus.NO_CONTENT)
            .json({ status: httpStatus.NO_CONTENT });
        }
      })
      .catch(error => {
        next(error);
      });
  })
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
  .delete((req, res, next) => {
    bookModel
      .findByIdAndRemove(req.params.id)
      .exec()
      .then(() => {
        res.status(httpStatus.NO_CONTENT)
      })
      .catch(error => {
        next(error);
      });
  });

module.exports = router;
