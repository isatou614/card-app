# CodeCards - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment
```bash
cd backend
# Edit .env (copy from .env.example)
# Update MONGODB_URI if not using local MongoDB
```

### Step 3: Start MongoDB
```bash
# In a separate terminal
mongod
```

### Step 4: Start Backend Server
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

### Step 5: Start Frontend (in new terminal)
```bash
cd frontend
python -m http.server 3000
# OR: http-server -p 3000
# OR: Use VS Code Live Server extension
```

### Step 6: Open in Browser
```
http://localhost:3000
```

---

## 📋 Workflow

1. **Register** - Create account on landing page
2. **Create Deck** - Add new flashcard deck on dashboard
3. **Add Cards** - Click "View" deck → Add cards (text or code)
4. **Take Quiz** - Click "Start Quiz" → Answer cards → View score
5. **Track Progress** - See score history and stats

---

## 💡 Tips

### Creating Code Cards
- Select **Code** as card type
- Choose programming language
- Paste code in front/back fields
- Code will render with syntax highlighting

### Text Cards
- Select **Text** as card type
- Enter plain text questions/answers
- Perfect for definitions, formulas, etc.

### Quiz Strategy
- **Flip Card** to see answer
- Click **Correct** or **Incorrect** honestly
- Retake quizzes to improve scores
- Check score history to track learning

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection fails | Start `mongod` or use MongoDB Atlas |
| CORS error | Check backend running on :5000 |
| Can't login | Verify MongoDB is running |
| Code syntax looks wrong | Select correct language in card type |
| Token expired | Login again to get new token |

---

## 🎨 Customizing

### Change Colors
Edit CSS custom properties in `frontend/css/style.css`:
```css
:root {
  --primary: #2563eb;      /* Main color */
  --secondary: #10b981;    /* Success color */
  --danger: #ef4444;       /* Danger color */
}
```

### Add More Languages
1. Edit `frontend/pages/deck.html` - add `<option>` to language select
2. Edit `frontend/css/style.css` - add color class for language
3. Done!

### Change API Base URL
In `frontend/js/auth.js`, update:
```javascript
const API_URL = 'http://localhost:5000/api';
```

---

## 📱 Access on Phone

1. Get your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On phone, visit: `http://YOUR_IP:3000`
3. Create account and start learning!

---

## 🚀 Deploy

### Backend to Render
1. Push repo to GitHub
2. Create Render account
3. New Web Service → Connect GitHub repo
4. Set environment variables
5. Deploy!

### Frontend to Netlify
1. Push repo to GitHub
2. Create Netlify account  
3. Connect repo → Deploy
4. Update API_URL in auth.js to production backend

---

## 📚 Feature Checklist

- ✅ User authentication (JWT)
- ✅ Create/Edit/Delete decks
- ✅ Add/Edit/Delete cards
- ✅ Code card rendering with syntax highlighting
- ✅ Interactive flip-card quiz
- ✅ Score tracking & history
- ✅ Responsive mobile design
- ✅ Rate limiting & security headers
- ✅ Error handling throughout
- ✅ Multiple programming languages

---

**Questions?** Check README.md for detailed docs!
