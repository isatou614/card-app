Project Overview

CodeCards is a full-stack web application developed to help students and beginner programmers learn programming language syntax through interactive flashcards and quizzes. Unlike traditional flashcard applications that display plain text, CodeCards presents code snippets in a properly formatted layout with syntax highlighting, making it easier for users to understand and remember programming concepts.

The application allows users to create their own study decks, add flashcards containing either text or code snippets, and test their knowledge through interactive quizzes. It also records quiz scores so users can monitor their learning progress over time.

Project Objectives

The main objective of this project was to develop an easy-to-use learning platform that helps users improve their programming skills through interactive study methods. The specific objectives of the project were:

* To develop a secure user registration and login system.
* To allow users to create, edit, and delete flashcard decks.
* To support both text-based and code-based flashcards.
* To provide interactive quizzes for self-assessment.
* To record quiz scores so users can track their progress.
* To develop a responsive interface that works on mobile phones, tablets, and desktop computers.
* To implement security measures that protect user information and application data.

Main Features

User Authentication

The application allows users to register and log in securely. Passwords are encrypted before being stored in the database, while JSON Web Tokens (JWT) are used to authenticate users and protect their accounts.

Flashcard Deck Management

Users can create multiple flashcard decks based on different programming topics. They can also edit or delete their decks whenever necessary.

Flashcards

The application supports two types of flashcards:

* Text cards for definitions, explanations, and notes.
* Code cards for programming examples with syntax highlighting.

CodeCards currently supports multiple programming languages, including JavaScript, Python, Java, HTML, CSS, TypeScript, SQL, Go, and Rust.

Interactive Quizzes

Users can test their understanding by taking quizzes generated from the flashcards in each deck. The quizzes present questions randomly, display whether answers are correct or incorrect, calculate the user’s score automatically, and save previous quiz results for future reference.

Responsive User Interface

The application was designed to work across different screen sizes, ensuring that users can access it comfortably from desktop computers, tablets, and smartphones.

Security

Several security measures were implemented throughout the application, including password hashing, JWT authentication, Cross-Origin Resource Sharing (CORS) configuration, rate limiting, and security headers using Helmet.js to protect the application from common security threats.

Technical Implementation

The backend of the application was developed using Node.js and Express.js, while MongoDB Atlas was used as the cloud database. Database operations were managed using Mongoose, and the backend followed a modular structure consisting of models, controllers, routes, and middleware to improve code organization and maintainability.

The frontend was developed using HTML5, CSS3, and Vanilla JavaScript without relying on external frontend frameworks. Communication between the frontend and backend was handled using the Fetch API, while browser local storage was used to maintain user sessions.

For deployment, the backend was hosted on Render, the frontend was deployed on Netlify, and the database was hosted on MongoDB Atlas, allowing the application to be accessed online from any location with an internet connection.


Project Summary

The CodeCards project consists of approximately 31 source files and around 2,500 lines of code. Through the development of this project, I gained practical experience in full-stack web development, database management, cloud deployment, authentication, application security, and debugging. The project also strengthened my understanding of integrating multiple technologies to build and deploy a complete web application.
