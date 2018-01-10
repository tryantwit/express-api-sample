const mongoose = require('mongoose');
const expect = require('chai').expect;
const authorModel = require('../../../api/authors/author.model');

require('../../../db');

describe('Author', () => {
  describe('fullname', () => {
    it('returns the authors full name.', (done) => {
      let author = new authorModel({ first: 'Stephen', last: 'King' });

      author
        .save()
        .then(createdAuthor => {
          expect(createdAuthor.fullname).to.eq('Stephen King');
        })
        .catch(done());
    });
  });
});
