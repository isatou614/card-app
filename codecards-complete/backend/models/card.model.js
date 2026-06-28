const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  deckId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    required: true
  },
  cardType: {
    type: String,
    enum: ['text', 'code'],
    default: 'text'
  },
  front: {
    type: String,
    required: [true, 'Please provide front content']
  },
  back: {
    type: String,
    required: [true, 'Please provide back content']
  },
  language: {
    type: String,
    default: null
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

cardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Card', cardSchema);
