let currentDeck = null;
let quizCards = [];
let currentCardIndex = 0;
let correctCount = 0;
let startTime = null;
let isFlipped = false;

document.addEventListener('DOMContentLoaded', () => {
  if (!requireAuth()) return;

  updateNavigation();

  const params = new URLSearchParams(window.location.search);
  const deckId = params.get('id');

  if (!deckId) {
    window.location.href = '../pages/dashboard.html';
    return;
  }

  loadDeckAndStartQuiz(deckId);

  document.getElementById('flipBtn').addEventListener('click', flipCard);
  document.getElementById('correctBtn').addEventListener('click', () => handleAnswer(true));
  document.getElementById('incorrectBtn').addEventListener('click', () => handleAnswer(false));
  document.getElementById('quitBtn').addEventListener('click', () => {
    if (confirm('Quit quiz? Your progress will not be saved.')) {
      window.location.href = `deck.html?id=${deckId}`;
    }
  });
  document.getElementById('retakeBtn').addEventListener('click', () => location.reload());
  document.getElementById('backToDeckBtn').addEventListener('click', () => {
    window.location.href = `deck.html?id=${deckId}`;
  });
});

async function loadDeckAndStartQuiz(deckId) {
  try {
    // Load deck info
    const deckData = await apiCall(`/decks/${deckId}`);
    currentDeck = deckData.deck;
    document.getElementById('deckNameQuiz').textContent = currentDeck.title;

    // Load shuffled cards
    const quizData = await apiCall(`/quiz/${deckId}/cards`);
    quizCards = quizData.cards;

    if (quizCards.length === 0) {
      showAlert('error', 'No cards in this deck');
      setTimeout(() => {
        window.location.href = `deck.html?id=${deckId}`;
      }, 2000);
      return;
    }

    startTime = Date.now();
    showCard(0);
  } catch (err) {
    showAlert('error', 'Failed to start quiz');
  }
}

function showCard(index) {
  currentCardIndex = index;
  const card = quizCards[index];

  isFlipped = false;
  document.getElementById('flashcard').classList.remove('flipped');

  const frontContent = document.getElementById('cardFrontContent');
  const backContent = document.getElementById('cardBackContent');

  if (card.cardType === 'code') {
    frontContent.innerHTML = `<div class="card-code ${card.language}">${escapeHtml(card.front)}</div>`;
    backContent.innerHTML = `<div class="card-code ${card.language}">${escapeHtml(card.back)}</div>`;
  } else {
    frontContent.innerHTML = `<p>${escapeHtml(card.front)}</p>`;
    backContent.innerHTML = `<p>${escapeHtml(card.back)}</p>`;
  }

  // Update counter and progress
  document.getElementById('cardCounter').textContent = `${index + 1} / ${quizCards.length}`;
  const progress = ((index + 1) / quizCards.length) * 100;
  document.getElementById('progressBar').style.width = `${progress}%`;

  document.getElementById('flipBtn').textContent = 'Flip Card';
}

function flipCard() {
  isFlipped = !isFlipped;
  document.getElementById('flashcard').classList.toggle('flipped');
  document.getElementById('flipBtn').textContent = isFlipped ? 'Flip Back' : 'Flip Card';
}

async function handleAnswer(isCorrect) {
  if (isCorrect) {
    correctCount++;
  }

  if (currentCardIndex < quizCards.length - 1) {
    currentCardIndex++;
    showCard(currentCardIndex);
  } else {
    await finishQuiz();
  }
}

async function finishQuiz() {
  const deckId = new URLSearchParams(window.location.search).get('id');
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  const totalCards = quizCards.length;
  const score = Math.round((correctCount / totalCards) * 100);

  try {
    // Submit score
    const scoreData = await apiCall(`/quiz/${deckId}/score`, {
      method: 'POST',
      body: JSON.stringify({
        correctAnswers: correctCount,
        totalCards,
        timeSpent
      })
    });

    // Get score history
    const historyData = await apiCall(`/quiz/${deckId}/history`);

    // Show results
    document.getElementById('quizView').style.display = 'none';
    document.getElementById('resultsView').style.display = 'block';

    document.getElementById('finalScore').textContent = `${score}%`;
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('totalCount').textContent = totalCards;
    document.getElementById('timeSpent').textContent = formatTime(timeSpent);

    // Set result message
    const resultMsg = document.getElementById('resultMessage');
    if (score >= 80) {
      resultMsg.textContent = '🌟 Excellent work! Keep it up!';
    } else if (score >= 60) {
      resultMsg.textContent = '👍 Good job! Practice more for better results.';
    } else {
      resultMsg.textContent = '📚 Keep studying! You\'ll improve with practice.';
    }

    // Show score history
    renderScoreHistory(historyData.stats.scores);
  } catch (err) {
    showAlert('error', 'Failed to save score');
  }
}

function renderScoreHistory(scores) {
  const container = document.getElementById('scoreHistory');

  if (scores.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--gray-500);">No previous scores</p>';
    return;
  }

  container.innerHTML = scores.slice(0, 5).map(score => `
    <div class="score-item">
      <div>
        <div style="font-weight: 500;">${score.correctAnswers} / ${score.totalCards}</div>
        <div class="score-date">${new Date(score.createdAt).toLocaleDateString()} ${new Date(score.createdAt).toLocaleTimeString()}</div>
      </div>
      <div class="score-value">${score.score}%</div>
    </div>
  `).join('');
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
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
