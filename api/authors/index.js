const router = require('express').Router();
const httpStatus = require('http-status');
const authorModel = require('./author.model');
const bookRoutes = require('./books');

router.route('/')
  .post((req, res, next) => {
    let author = new authorModel(req.body);

    author
      .save()
      .then(savedAuthor => {
        res.status(httpStatus.OK)
          .json({ status: httpStatus.OK, data: savedAuthor });
      })
      .catch(error => {
        next(error);
      });
  })
  .get((req, res, next) => {
    authorModel
      .find({})
      .exec()
      .then(authors => {
        if (authors.length > 0) {
          res.status(httpStatus.OK)
            .json({ status: httpStatus.OK, data: authors });
        } else {
          res.status(httpStatus.NO_CONTENT)
            .json({ status: httpStatus.NO_CONTENT });
        }
      })
      .catch(error => {
        next(error);
      });
  });

router.route('/:id')
  .put((req, res, next) => {
    authorModel
      .findOneAndUpdate(
        { _id: req.params.id },
        { '$set': req.body },
        { new: true }
      )
      .exec()
      .then(updatedAuthor => {
        res.status(httpStatus.OK)
          .json({ status: httpStatus.OK, data: updatedAuthor });
      })
      .catch(error => {
        next(error);
      });
  })
  .get((req, res, next) => {
    authorModel
      .findById(req.params.id)
      .exec()
      .then(author => {
        if (author) {
          res.status(httpStatus.OK)
            .json({ status: httpStatus.OK, data: author });
        } else {
          res.status(httpStatus.NO_CONTENT)
            .json({ status: httpStatus.NO_CONTENT });
        }
      });
  })
  .delete((req, res, next) => {
    authorModel
      .findByIdAndRemove(req.params.id)
      .exec()
      .then(() => {
        res.status(httpStatus.OK)
          .json({ status: httpStatus.OK, message: 'Author was deleted.' });
      })
      .catch(error => {
        next(error);
      });
  });

router.use('/:authorId/books', bookRoutes);

module.exports = router;
