const Deck = require('../models/deck.model');
const Card = require('../models/card.model');

exports.createDeck = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Please provide a title' });
    }

    const deck = await Deck.create({
      title,
      description,
      userId: req.userId
    });

    res.status(201).json({
      success: true,
      deck
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllDecks = async (req, res, next) => {
  try {
    const decks = await Deck.find({ userId: req.userId });
    res.json({ success: true, decks });
  } catch (err) {
    next(err);
  }
};

exports.getDeck = async (req, res, next) => {
  try {
    const deck = await Deck.findById(req.params.id);

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    if (deck.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json({ success: true, deck });
  } catch (err) {
    next(err);
  }
};

exports.updateDeck = async (req, res, next) => {
  try {
    let deck = await Deck.findById(req.params.id);

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    if (deck.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    deck = await Deck.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, deck });
  } catch (err) {
    next(err);
  }
};

exports.deleteDeck = async (req, res, next) => {
  try {
    const deck = await Deck.findById(req.params.id);

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    if (deck.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Card.deleteMany({ deckId: req.params.id });
    await Deck.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Deck deleted' });
  } catch (err) {
    next(err);
  }
};
