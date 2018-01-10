const Router = require('express');
const httpStatus = require('http-status');

const authorRoutes = require('./authors');
const bookRoutes = require('./books');

router = Router();

router.route('/health-check')
  .get((req, res, next) => {
    res.status(httpStatus.OK)
      .json({ status: httpStatus.OK, message: 'Server is live.' });
  });

router.use('/authors', authorRoutes);
router.use('/books', bookRoutes);

module.exports = router;
