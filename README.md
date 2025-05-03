# 📚 BookMatch – AI-Based Book Recommendation System

**BookMatch** is a simple and interactive book recommendation system powered by an AI agent. It uses CSV files to manage a basic library of books and users, allowing personalized suggestions based on user preferences.

---

## 🌐 About

**BookMatch** is an interactive AI-powered book recommendation system where an intelligent agent perceives and reacts to user actions.

The system uses a lightweight database stored in CSV files containing book and user information. Users can register, select their favorite books, and receive suggestions tailored to their literary tastes.

---

## 🔹 Key Features

- 📥 User registration with management of literary preferences  
- ⭐ Favorite book selection to help the agent understand user taste  
- 📖 Personalized book recommendations based on genre similarity  
- 🤖 Intelligent agent interaction: the agent perceives user data (name, preferences) and reacts accordingly with suggestions or prompts

---

## 🧠 Agent Behavior

The agent follows a simple yet effective **perception–reaction** logic:

1. Redirects users to registration if they are not yet registered  
2. Prompts users to select favorite books if preferences are missing  
3. Generates recommendations based on genre similarity and match scores

---

## 🛠️ Technologies Used

- **Frontend**: React, TypeScript, Bootstrap  
- **Backend**: Python, Flask  
- **Data Storage**: CSV file handling  
- **AI Logic**: Reactive agent (perception + reaction)
  
---

## 🚀 How to Run BookMatch

1. Clone the repository
```bash
   git clone https://github.com/ZeinebGhrab/BookMatch-AI
   cd bookmatch
```

2. Start the Backend (Flask + AI Agent)

```bash
   cd library-app-backend
   python agent.py
```

3. Start the Frontend (React App)

```bash
   cd library-app
   npm install
   npm run dev
```
📌 The application will be available at http://localhost:5173/ by default.

