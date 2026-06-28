const Card = require('../models/card.model');
const Score = require('../models/score.model');
const Deck = require('../models/deck.model');

exports.getShuffledCards = async (req, res, next) => {
  try {
    const { deckId } = req.params;

    const deck = await Deck.findById(deckId);
    if (!deck || deck.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const cards = await Card.find({ deckId });
    
    // Fisher-Yates shuffle
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    res.json({
      success: true,
      cards: shuffled.map(card => ({
        _id: card._id,
        front: card.front,
        back: card.back,
        cardType: card.cardType,
        language: card.language
      }))
    });
  } catch (err) {
    next(err);
  }
};

exports.submitScore = async (req, res, next) => {
  try {
    const { deckId } = req.params;
    const { correctAnswers, totalCards, timeSpent } = req.body;

    if (typeof correctAnswers !== 'number' || typeof totalCards !== 'number') {
      return res.status(400).json({ error: 'Please provide valid score data' });
    }

    const deck = await Deck.findById(deckId);
    if (!deck || deck.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const score = Math.round((correctAnswers / totalCards) * 100);

    const scoreRecord = await Score.create({
      userId: req.userId,
      deckId,
      score,
      totalCards,
      correctAnswers,
      timeSpent: timeSpent || 0
    });

    res.status(201).json({
      success: true,
      score: scoreRecord
    });
  } catch (err) {
    next(err);
  }
};

exports.getScoreHistory = async (req, res, next) => {
  try {
    const { deckId } = req.params;

    const deck = await Deck.findById(deckId);
    if (!deck || deck.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const scores = await Score.find({ userId: req.userId, deckId }).sort({ createdAt: -1 });
    
    const stats = {
      totalAttempts: scores.length,
      averageScore: scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length) : 0,
      highestScore: scores.length > 0 ? Math.max(...scores.map(s => s.score)) : 0,
      scores
    };

    res.json({ success: true, stats });
  } catch (err) {
    next(err);
  }
};
