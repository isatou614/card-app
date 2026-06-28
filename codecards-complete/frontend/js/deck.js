let currentDeck = null;
let cards = [];
let currentCardId = null;

document.addEventListener('DOMContentLoaded', () => {
  if (!requireAuth()) return;

  updateNavigation();

  const params = new URLSearchParams(window.location.search);
  const deckId = params.get('id');

  if (!deckId) {
    window.location.href = 'dashboard.html';
    return;
  }

  loadDeck(deckId);
  loadCards(deckId);

  document.getElementById('addCardBtn').addEventListener('click', () => {
    currentCardId = null;
    document.getElementById('cardModalTitle').textContent = 'Add Card';
    document.getElementById('cardForm').reset();
    document.getElementById('submitCardBtn').textContent = 'Add Card';
    openModal('cardModal');
  });

  document.getElementById('createFirstCardBtn').addEventListener('click', () => {
    currentCardId = null;
    openModal('cardModal');
  });

  document.getElementById('cardForm').addEventListener('submit', handleSaveCard);
  document.getElementById('startQuizBtn').addEventListener('click', () => {
    window.location.href = `quiz.html?id=${deckId}`;
  });
});

async function loadDeck(deckId) {
  try {
    const data = await apiCall(`/decks/${deckId}`);
    currentDeck = data.deck;
    document.getElementById('deckTitle').textContent = currentDeck.title;
    document.getElementById('deckDescription').textContent = currentDeck.description || '';
  } catch (err) {
    showAlert('error', 'Failed to load deck');
  }
}

async function loadCards(deckId) {
  try {
    const data = await apiCall(`/cards/${deckId}`);
    cards = data.cards;
    renderCards();
  } catch (err) {
    showAlert('error', 'Failed to load cards');
  }
}

function renderCards() {
  const container = document.getElementById('cardsList');
  const emptyState = document.getElementById('emptyState');

  if (cards.length === 0) {
    container.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  container.style.display = 'grid';
  emptyState.style.display = 'none';

  container.innerHTML = cards.map(card => `
    <div class="card">
      <div style="margin-bottom: 1rem;">
        <h4 style="margin-bottom: 0.5rem;">
          ${card.cardType === 'code' ? '💻' : '📝'} ${card.cardType === 'code' ? card.language || 'Code' : 'Text'}
        </h4>
        <div class="card-${card.cardType}" style="margin-bottom: 1rem;">
          ${escapeHtml(card.front)}
        </div>
      </div>
      <div style="margin-bottom: 1rem; padding: 1rem; background: var(--gray-50); border-radius: var(--radius);">
        <small style="color: var(--gray-600); font-weight: 600;">Answer:</small>
        <div class="card-${card.cardType}">
          ${escapeHtml(card.back)}
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-secondary btn-sm" onclick="editCard('${card._id}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteCard('${card._id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

function updateCardTypeFields() {
  const cardType = document.getElementById('cardType').value;
  const languageGroup = document.getElementById('languageGroup');

  if (cardType === 'code') {
    languageGroup.style.display = 'block';
  } else {
    languageGroup.style.display = 'none';
  }
}

async function handleSaveCard(e) {
  e.preventDefault();

  const cardType = document.getElementById('cardType').value;
  const front = document.getElementById('cardFront').value;
  const back = document.getElementById('cardBack').value;
  const language = cardType === 'code' ? document.getElementById('cardLanguage').value : null;
  const difficulty = document.getElementById('cardDifficulty').value;

  const deckId = new URLSearchParams(window.location.search).get('id');

  try {
    if (currentCardId) {
      // Edit
      await apiCall(`/cards/${deckId}/${currentCardId}`, {
        method: 'PUT',
        body: JSON.stringify({ cardType, front, back, language, difficulty })
      });
      showAlert('success', 'Card updated!');
    } else {
      // Create
      await apiCall(`/cards/${deckId}`, {
        method: 'POST',
        body: JSON.stringify({ cardType, front, back, language, difficulty })
      });
      showAlert('success', 'Card added!');
    }

    closeModal('cardModal');
    document.getElementById('cardForm').reset();
    loadCards(deckId);
  } catch (err) {
    showAlert('error', err.message);
  }
}

function editCard(cardId) {
  const card = cards.find(c => c._id === cardId);
  if (!card) return;

  currentCardId = cardId;

  document.getElementById('cardType').value = card.cardType;
  document.getElementById('cardLanguage').value = card.language || '';
  document.getElementById('cardFront').value = card.front;
  document.getElementById('cardBack').value = card.back;
  document.getElementById('cardDifficulty').value = card.difficulty;

  updateCardTypeFields();

  document.getElementById('cardModalTitle').textContent = 'Edit Card';
  document.getElementById('submitCardBtn').textContent = 'Update Card';

  openModal('cardModal');
}

async function deleteCard(cardId) {
  if (!confirm('Delete this card?')) return;

  const deckId = new URLSearchParams(window.location.search).get('id');

  try {
    await apiCall(`/cards/${deckId}/${cardId}`, { method: 'DELETE' });
    showAlert('success', 'Card deleted');
    loadCards(deckId);
  } catch (err) {
    showAlert('error', err.message);
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
