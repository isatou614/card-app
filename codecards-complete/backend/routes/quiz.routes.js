const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const {
  getShuffledCards,
  submitScore,
  getScoreHistory
} = require('../controllers/quiz.controller');

router.use(authMiddleware);

router.get('/:deckId/cards', getShuffledCards);
router.post('/:deckId/score', submitScore);
router.get('/:deckId/history', getScoreHistory);

module.exports = router;
