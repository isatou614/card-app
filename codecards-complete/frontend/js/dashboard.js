let decks = [];

document.addEventListener('DOMContentLoaded', () => {
  if (!requireAuth()) return;

  updateNavigation();
  loadDecks();

  document.getElementById('createDeckBtn').addEventListener('click', () => openModal('createDeckModal'));
  document.getElementById('createFirstDeckBtn').addEventListener('click', () => openModal('createDeckModal'));
  document.getElementById('createDeckForm').addEventListener('submit', handleCreateDeck);
});

async function loadDecks() {
  try {
    const data = await apiCall('/decks');
    decks = data.decks;
    renderDecks();
  } catch (err) {
    showAlert('error', 'Failed to load decks');
  }
}

function renderDecks() {
  const container = document.getElementById('decksList');
  const emptyState = document.getElementById('emptyState');

  if (decks.length === 0) {
    container.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  container.style.display = 'grid';
  emptyState.style.display = 'none';

  container.innerHTML = decks.map(deck => `
    <div class="deck-card">
      <div>
        <h3 class="deck-title">${deck.title}</h3>
        <p class="deck-description">${deck.description || 'No description'}</p>
      </div>
      <div class="deck-meta">
        <span>${deck.cardCount} cards</span>
        <span>${new Date(deck.createdAt).toLocaleDateString()}</span>
      </div>
      <div class="deck-actions">
        <button class="btn btn-primary btn-sm" onclick="viewDeck('${deck._id}')">View</button>
        <button class="btn btn-secondary btn-sm" onclick="editDeck('${deck._id}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteDeck('${deck._id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

async function handleCreateDeck(e) {
  e.preventDefault();

  const title = document.getElementById('deckTitle').value;
  const description = document.getElementById('deckDescription').value;

  try {
    await apiCall('/decks', {
      method: 'POST',
      body: JSON.stringify({ title, description })
    });

    showAlert('success', 'Deck created!');
    closeModal('createDeckModal');
    document.getElementById('createDeckForm').reset();
    loadDecks();
  } catch (err) {
    showAlert('error', err.message);
  }
}

function viewDeck(deckId) {
  window.location.href = `deck.html?id=${deckId}`;
}

function editDeck(deckId) {
  const deck = decks.find(d => d._id === deckId);
  if (!deck) return;

  document.getElementById('deckTitle').value = deck.title;
  document.getElementById('deckDescription').value = deck.description || '';

  const form = document.getElementById('createDeckForm');
  const originalOnSubmit = form.onsubmit;

  form.onsubmit = async (e) => {
    e.preventDefault();

    try {
      await apiCall(`/decks/${deckId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: document.getElementById('deckTitle').value,
          description: document.getElementById('deckDescription').value
        })
      });

      showAlert('success', 'Deck updated!');
      closeModal('createDeckModal');
      form.reset();
      form.onsubmit = originalOnSubmit;
      loadDecks();
    } catch (err) {
      showAlert('error', err.message);
    }
  };

  openModal('createDeckModal');
  document.querySelector('.modal-header h3').textContent = 'Edit Deck';
}

async function deleteDeck(deckId) {
  if (!confirm('Are you sure you want to delete this deck? This action cannot be undone.')) return;

  try {
    await apiCall(`/decks/${deckId}`, { method: 'DELETE' });
    showAlert('success', 'Deck deleted');
    loadDecks();
  } catch (err) {
    showAlert('error', err.message);
  }
}
