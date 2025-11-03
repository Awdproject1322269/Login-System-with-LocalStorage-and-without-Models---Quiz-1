🧑‍💻 Developer

Name: Farhan Butt, Abdullah Gujjar, Hassan Shah

GitHub: Awdproject1322269

Email: awdproject123@gmail.com

# 🎯 Quiz Quest-3

_Quiz Quest-3_ is a full-stack web application that allows users to play quizzes, track scores, and experience interactive question-based learning.  
It includes a modern _React (Vite)_ frontend and a _Node.js + Express + MongoDB_ backend.

---

## 🚀 Features

✅ Interactive quiz system  
✅ MongoDB database for storing questions & results  
✅ RESTful API built with Express  
✅ Modern and responsive UI  
✅ Separate frontend & backend setup for clean architecture

---

## ⚙ Technologies Used

_Frontend:_

- React (Vite)
- Axios (for API calls)
- React Router
- TailwindCSS or CSS (based on your setup)

_Backend:_

- Node.js
- Express.js
- MongoDB (with Mongoose)
- dotenv (for environment variables)
- CORS & body-parser middleware

---

## 🧠 Prerequisites

Before running the project, make sure you have:

- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/) installed or an online MongoDB Compass connection
- npm or yarn package manager

---

## 🛠 Installation & Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/quiz-quest-3.git
cd quiz-quest-3

Step 2: Setup Backend
cd backend
npm install

Create a .env file inside backend/
PORT=5000
MONGO_URI=your_mongodb_connection_string

Start the backend server
npm run dev


By default it will run on:
👉 http://localhost:5000

Step 3: Setup Frontend
cd ../frontend
npm install

Start the frontend (Vite)
npm run dev


By default it will run on:
👉 http://localhost:5173

Step 4: Connect Frontend with Backend

If the backend runs on a different port, make sure your frontend .env file (inside frontend/) contains:

VITE_API_URL=http://localhost:5000


Then, in your frontend code (for example using Axios):

axios.get(${import.meta.env.VITE_API_URL}/api/quiz)

```
