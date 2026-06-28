#!/bin/bash

echo "🎯 CodeCards - Quick Start Setup"
echo "=================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Please install Node.js from https://nodejs.org"
  exit 1
fi

echo "✅ Node.js $(node --version)"
echo ""

# Backend setup
echo "📦 Installing backend dependencies..."
cd backend
cp .env.example .env
npm install

if [ $? -eq 0 ]; then
  echo "✅ Backend setup complete!"
else
  echo "❌ Backend setup failed"
  exit 1
fi

cd ..
echo ""

echo "🚀 CodeCards is ready!"
echo ""
echo "Next steps:"
echo "1. Start MongoDB: mongod"
echo "2. Start backend: cd backend && npm start"
echo "3. Start frontend: cd frontend && python -m http.server 3000"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "For detailed instructions, see README.md"
