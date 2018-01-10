const mongoose = require('mongoose');

const options = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
};

const AuthorSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true,
    default: null,
  },
  last: {
    type: String,
    required: true,
    default: null,
  },
}, options);

AuthorSchema.virtual('fullname').get(function() {
  return `${this.first} ${this.last}`;
});

module.exports = mongoose.model('Author', AuthorSchema);
