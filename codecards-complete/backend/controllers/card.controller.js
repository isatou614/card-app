const Card = require('../models/card.model');
const Deck = require('../models/deck.model');

exports.createCard = async (req, res, next) => {
  try {
    const { front, back, cardType, language } = req.body;
    const { deckId } = req.params;

    if (!front || !back) {
      return res.status(400).json({ error: 'Please provide front and back content' });
    }

    const deck = await Deck.findById(deckId);
    if (!deck || deck.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const card = await Card.create({
      deckId,
      front,
      back,
      cardType: cardType || 'text',
      language: language || null
    });

    await Deck.findByIdAndUpdate(deckId, { $inc: { cardCount: 1 } });

    res.status(201).json({ success: true, card });
  } catch (err) {
    next(err);
  }
};

exports.getCards = async (req, res, next) => {
  try {
    const { deckId } = req.params;

    const deck = await Deck.findById(deckId);
    if (!deck || deck.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const cards = await Card.find({ deckId });
    res.json({ success: true, cards });
  } catch (err) {
    next(err);
  }
};

exports.updateCard = async (req, res, next) => {
  try {
    const { deckId, cardId } = req.params;

    const deck = await Deck.findById(deckId);
    if (!deck || deck.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const card = await Card.findByIdAndUpdate(cardId, req.body, {
      new: true,
      runValidators: true
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json({ success: true, card });
  } catch (err) {
    next(err);
  }
};

exports.deleteCard = async (req, res, next) => {
  try {
    const { deckId, cardId } = req.params;

    const deck = await Deck.findById(deckId);
    if (!deck || deck.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    await Deck.findByIdAndUpdate(deckId, { $inc: { cardCount: -1 } });

    res.json({ success: true, message: 'Card deleted' });
  } catch (err) {
    next(err);
  }
};
