const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const {
  createCard,
  getCards,
  updateCard,
  deleteCard
} = require('../controllers/card.controller');

router.use(authMiddleware);

router.post('/:deckId', createCard);
router.get('/:deckId', getCards);
router.put('/:deckId/:cardId', updateCard);
router.delete('/:deckId/:cardId', deleteCard);

module.exports = router;
