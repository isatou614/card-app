CodeCards

How to Run the Project

1. Install backend packages

cd backend
npm install

2. Set up the environment

* Go to the backend folder.
* Edit the .env file.
* If you’re not using local MongoDB, change the MONGODB_URI.

3. Start MongoDB

Open another terminal and run:

mongod

4. Start the backend

cd backend
npm start

Runs on: http://localhost:5000

5. Start the frontend

Open a new terminal:

cd frontend
python -m http.server 3000

You can also use http-server or VS Code Live Server.

6. Open the project

Go to:

http://localhost:3000


Basic Workflow

1. Register a new account.
2. Create a flashcard deck.
3. Add flashcards (Text or Code).
4. Start a quiz.
5. Check your score and progress.


Creating Flashcards

Text Cards

* Choose Text.
* Enter the question and answer.

Code Cards

* Choose Code.
* Select the programming language.
* Paste the code into the card.


Quiz

* Flip the card to see the answer.
* Mark it as Correct or Incorrect.
* Repeat quizzes to improve your score.


Common Problems

* MongoDB not connecting → Make sure mongod is running.
* CORS error → Check if the backend is running on port 5000.
* Login not working → Make sure MongoDB is connected.
* Code formatting looks wrong → Select the correct programming language.
* Token expired → Log in again.


Customization

Change the colors

Edit frontend/css/style.css:

:root {
  --primary: #2563eb;
  --secondary: #10b981;
  --danger: #ef4444;
}

Add a new programming language

1. Add it to the language options in deck.html.
2. Add its color style in style.css.

Change the API URL

In frontend/js/auth.js:

const API_URL = 'http://localhost:5000/api';


Using the Project on a Phone

* Find your computer’s IP address using ipconfig (Windows) or ifconfig (Mac/Linux).
* Open:

http://YOUR_IP:3000

on your phone.


Deployment

Backend

* Push the project to GitHub.
* Deploy it on Render.
* Add the required environment variables.

Frontend

* Push to GitHub.
* Deploy using Netlify.
* Update the API URL to the deployed backend.


Features

* User login and registration
* Create, edit and delete decks
* Create, edit and delete flashcards
* Text and code flashcards
* Quiz mode
* Score tracking
* Responsive design
* Error handling and security
