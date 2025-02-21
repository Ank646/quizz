**# Interactive Quiz Platform with Firebase Authentication**

## Overview
This is a multiplayer quiz application with **Firebase Authentication** and **AI-powered explanations** using **Google Gemini API**.

## Features
- **Firebase Authentication:** Sign up, log in, and manage user sessions.
- **Multiplayer Mode:** Play in real-time using WebSockets.
- **AI-Powered Explanations:** Get answer explanations via Google Gemini API.
- **Custom Quiz Builder:** Create and attempt personalized quizzes.
- **Scoreboard & Quiz History:** Track quiz performance using IndexedDB.

---

## Installation & Setup

### Clone the Repository
1. Clone the repository using Git.
2. Navigate to the project folder.

### Install Dependencies
#### Backend (Server)
1. Navigate to the **server** directory.
2. Install dependencies using:
   ```bash
   npm install
   ```
#### Frontend (Client)
1. Navigate to the **client** directory.
2. Install dependencies using:
   ```bash
   npm install
   ```

---

## Configuration

### 1. Firebase Authentication Setup
- Create a new project in **Firebase**.
- Enable **Email/Password** authentication.
- Get **Firebase configuration details** from Project Settings.
- Store the configuration in a file for authentication integration.

### 2. Set Up Backend API Keys
- Create a **.env** file inside the **server** directory.
- Add your **Google Gemini API Key** to enable AI-powered explanations.

---

## Running the Application

### Start the Backend Server
1. Navigate to the **server** directory.
2. Run the server using:
   ```bash
   node server.js
   ```

### Start the Frontend
1. Navigate to the **client** directory.
2. Start the React application using:
   ```bash
   npm start
   ```
3. Open **http://localhost:3000** in your browser.

---

## API Endpoints

### Multiplayer API (WebSockets)
- **joinGame:** A player joins the quiz game.
- **startGame:** Starts the quiz for all connected players.
- **updatePlayers:** Sends the updated player list to all users.
- **disconnect:** Handles player disconnections.

### AI Explanation API
- **POST /explain:** Generates an AI-powered explanation for quiz answers.

---

## Tech Stack

- **Frontend:** React.js, Firebase Authentication, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** IndexedDB (Quiz History)
- **AI API:** Google Gemini (Text Generation)
- **Real-Time:** Socket.io (Multiplayer)

---

## Contributing
1. Fork the repository.
2. Make your changes.
3. Submit a pull request for review.

