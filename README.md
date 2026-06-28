# CodeCards 🎯

A full-stack web application for learning code syntax through interactive flashcards and quizzes. Code blocks are rendered as formatted, syntax-highlighted flashcards—not plain text.

## Features

✨ **Code-Focused Flashcards**  
Create and study flashcards with properly formatted code blocks, syntax highlighting, and monospace fonts.

📚 **Deck Management**  
Organize flashcards into decks. Create, edit, update, and delete decks seamlessly.

💻 **Multiple Language Support**  
JavaScript, Python, Java, HTML, CSS, TypeScript, SQL, Go, Rust, and more.

🎯 **Interactive Quizzes**  
Test your knowledge with shuffled card quizzes and flip-card animations. See your progress in real-time.

📊 **Score Tracking**  
Track quiz performance over time with detailed score history and statistics per deck.

🔐 **User Authentication**  
Secure login/register with JWT tokens and bcrypt password hashing.

📱 **Responsive Design**  
Works beautifully on desktop, tablet, and mobile devices.

---

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Helmet.js for security headers
- Express Rate Limiting

**Frontend:**
- Vanilla HTML/CSS/JavaScript (no frameworks)
- Fetch API for HTTP requests
- CSS Custom Properties for theming
- Responsive Grid & Flexbox layout

---

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- Git

cd backend
npm install
```

Create a `.env` file:

NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codecards
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

Start MongoDB (if local):

```bash
mongod
```

Start the backend server:

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will be running at `http://localhost:5000`.

### 2. Setup Frontend

Navigate to the `frontend` folder. No build step required—just serve the files:

**Option A: Using Python (built-in)**

```bash
cd frontend
python -m http.server 3000
```

**Option B: Using Node.js http-server**

```bash
npm install -g http-server
cd frontend
http-server -p 3000
```

**Option C: Using Live Server (VS Code extension)**

Install the Live Server extension, right-click `index.html`, and select "Open with Live Server".

Open your browser to `http://localhost:3000`.

---

## Project Structure

```
codecards-complete/
├── backend/
│   ├── models/
│   │   ├── user.model.js
│   │   ├── deck.model.js
│   │   ├── card.model.js
│   │   └── score.model.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── deck.controller.js
│   │   ├── card.controller.js
│   │   └── quiz.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── deck.routes.js
│   │   ├── card.routes.js
│   │   └── quiz.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── errorHandler.js
│   ├── index.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── pages/
    │   ├── dashboard.html
    │   ├── deck.html
    │   └── quiz.html
    ├── js/
    │   ├── auth.js
    │   ├── main.js
    │   ├── dashboard.js
    │   ├── deck.js
    │   └── quiz.js
    ├── css/
    │   └── style.css
    ├── index.html
    └── .env.example
```

---

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Decks (Protected)

- `POST /api/decks` - Create a deck
- `GET /api/decks` - Get all user's decks
- `GET /api/decks/:id` - Get deck by ID
- `PUT /api/decks/:id` - Update deck
- `DELETE /api/decks/:id` - Delete deck

### Cards (Protected)

- `POST /api/cards/:deckId` - Add card to deck
- `GET /api/cards/:deckId` - Get all cards in deck
- `PUT /api/cards/:deckId/:cardId` - Update card
- `DELETE /api/cards/:deckId/:cardId` - Delete card

### Quiz (Protected)

- `GET /api/quiz/:deckId/cards` - Get shuffled cards for quiz
- `POST /api/quiz/:deckId/score` - Submit quiz score
- `GET /api/quiz/:deckId/history` - Get score history for deck

---

## Key Design Decisions

### Code Cards Differentiation

The `.card-code` class renders flashcard content in:
- **Monospace font** (`Monaco`, `Courier New`)
- **Dark background** with color-coded syntax
- **Smaller font size** for code readability
- **Language-specific colors** (JavaScript yellow, Python blue, etc.)

### Authentication Flow

1. User registers/logs in → JWT token issued
2. Token stored in `localStorage`
3. All protected routes require `Authorization: Bearer <token>` header
4. Token validated on every request

### Responsive Design

- **Desktop (1200px+)**: Multi-column grids, full-sized flashcards
- **Tablet (768px–1199px)**: 2-column grids, adjusted spacing
- **Mobile (<768px)**: Single column, smaller flashcards, touch-friendly buttons

---

## Usage Workflow

### 1. Register & Login
- Visit `http://localhost:3000`
- Click "Register" and create an account
- Login with your credentials

### 2. Create a Deck
- Navigate to Dashboard
- Click "+ New Deck"
- Enter title and description
- Click "Create Deck"

### 3. Add Cards
- Click "View" on a deck
- Click "+ Add Card"
- Choose **Text** or **Code**
- If Code, select programming language
- Enter front (question) and back (answer)
- Click "Add Card"

### 4. Take a Quiz
- On the deck detail page, click "Start Quiz"
- Read the question on the front
- Click "Flip Card" to reveal the answer
- Click "Correct" or "Incorrect"
- Continue through all cards
- View your final score and history

### 5. Track Progress
- Score history displays on quiz results page
- Decks show card count and creation date
- Quiz statistics show average score and high score

---

## Environment Variables

### Backend (.env)

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Environment mode |
| `PORT` | 5000 | Server port |
| `MONGODB_URI` | mongodb://localhost:27017/codecards | Database connection |
| `JWT_SECRET` | (required) | Secret for signing JWTs |
| `JWT_EXPIRE` | 7d | Token expiration time |
| `CORS_ORIGIN` | http://localhost:3000 | Allowed frontend origin |

---

## Security Features

✅ **Password Hashing** - Bcrypt with 10 salt rounds  
✅ **JWT Auth** - Stateless, time-limited tokens  
✅ **CORS** - Restricted to frontend origin  
✅ **Helmet.js** - Security headers (CSP, X-Frame-Options, etc.)  
✅ **Rate Limiting** - 5 auth attempts per 15 min, 100 API calls per 15 min  
✅ **Input Validation** - Schema-level validation via Mongoose  
✅ **Error Handling** - Consistent JSON error responses  

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB locally (`mongod`) or update `MONGODB_URI` in `.env` to your Atlas URL.

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Ensure `CORS_ORIGIN` in `.env` matches your frontend URL (e.g., `http://localhost:3000`).

### Backend Not Responding
```
Failed to fetch...
```
**Solution:** 
1. Verify backend is running on port 5000
2. Check network tab in DevTools for exact error
3. Confirm `.env` file is in `backend/` folder

### JWT Token Expired
Users are automatically logged out. They can login again to get a new token.

---

## Deployment

### Backend (Render)

1. Push to GitHub
2. Create new Web Service on Render
3. Connect to GitHub repo
4. Set environment variables in Render dashboard
5. Deploy

### Frontend (Netlify)

1. Push to GitHub
2. Connect repo to Netlify
3. Build command: (none required)
4. Publish directory: `frontend/`
5. Update `API_URL` in `frontend/js/auth.js` to production backend URL
6. Deploy

---

## Future Features (Nice-to-Have)

- 🎨 Dark mode toggle
- 📥 Import/export decks (CSV, JSON)
- 🔄 Spaced repetition algorithm
- 👥 Sharing decks with other users
- 📈 Advanced analytics dashboard
- 🏆 Leaderboard & achievements
- 📲 Mobile app (React Native)
- 🌐 Multiple language UI

---

## Development Notes

### Adding a New Language to Code Cards

1. Add language to the `<select>` in `frontend/pages/deck.html`
2. Add color styling in `frontend/css/style.css` (`.card-code.language`)
3. No backend changes required—language is stored in Card model

### Modifying Quiz Shuffle

Change the Fisher-Yates shuffle in `backend/controllers/quiz.controller.js:getShuffledCards()`.

### Extending Score Tracking

Add new metrics in `backend/models/score.model.js` and update `quiz.controller.js` submissions.

---

## License

MIT

---

## Support

For issues, feature requests, or questions:
1. Check existing docs
2. Review API error messages
3. Check browser console for client-side errors
4. Check server logs for backend errors

---

**Happy learning! 🚀**
