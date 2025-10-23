
---

# 🚀 **Sentinel** – AI-Powered Team Performance & Engagement Dashboard

Sentinel is an **AI-driven performance and psychological safety monitoring platform** built for teams and corporate organizations. It analyzes team chat interactions, visualizes performance trends, and provides actionable insights to boost collaboration, engagement, and productivity.

---
## 📑 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Project Structure](#-project-structure)
4. [Getting Started](#-getting-started)

   * [Backend Setup](#-backend-setup)
   * [Frontend Setup](#-frontend-setup)
5. [Environment Variables](#-environment-variables)
6. [Dashboard Insights](#-dashboard-insights)
7. [Future Scope](#-future-scope)
8. [Team](#-team)
    
## 🌟 Features

* **Authentication & Security**

  * JWT-based secure login/signup
  * Role-based access (future scope)

* **Dashboard**

  * AI-powered **psychological safety score**
  * Performance trends & comparisons
  * Team summary (size, average rating, participation)
  * Weekly comparison visualization

* **AI Integrations**

  * Chatbot assistant for team queries
  * Performance suggestions via LLMs (Gemini/OpenAI)
  * Automated sentiment analysis from chat logs

* **Collaboration Tools**

  * Synchronous & asynchronous tabs
  * Suggestions dashboard for managers and teams
  * Vertex AI integration (Contains all the news necessary to know for companies)

---

## 🛠️ Tech Stack

### **Frontend**

* React (with Hooks & Components)
* TailwindCSS (styling)
* ShadCN/UI (UI components)
* Recharts (data visualization)

### **Backend**

* Flask (Python)
* Flask-JWT-Extended (authentication)
* MongoDB (database)
* Google Gemini API / OpenAI API (AI insights)

### **DevOps & Tooling**

* Git & GitHub for version control
* `.env` for environment variables
* Gitignore for secure repo management

---
## Demo
<img width="1894" height="905" alt="Screenshot 2025-08-31 231148" src="https://github.com/user-attachments/assets/83a572b7-32ca-4fce-ac79-e562b4a0098e" />
<img width="1897" height="908" alt="Screenshot 2025-08-31 231208" src="https://github.com/user-attachments/assets/e031a9ff-8b10-4c4b-bdd7-aa0a5dbd40e7" />
<img width="1899" height="914" alt="Screenshot 2025-08-31 231243" src="https://github.com/user-attachments/assets/fb7844ee-3872-4141-811f-4b81687ba31a" />
<img width="1893" height="913" alt="Screenshot 2025-08-31 231323" src="https://github.com/user-attachments/assets/afb7ecb7-0bf7-4edb-9c6a-5fc8ae05d493" />
<img width="1905" height="891" alt="Screenshot 2025-08-31 231347" src="https://github.com/user-attachments/assets/e68ebd2a-95f4-4d40-923b-55deb6d2a296" />
<img width="1879" height="913" alt="Screenshot 2025-08-31 231406" src="https://github.com/user-attachments/assets/cb77e956-706c-4286-9ea8-252119e2e750" />


## 📂 Project Structure

```
Sentinel/
│── backend/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── .env
│   └── routes/
│       ├── auth_routes.py
│       ├── chatbot_routes.py
│       ├── dashboard_routes.py
│       └── suggestions_routes.py
│
│── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       │   ├── dashboard/
│       │   ├── tabs/
│       │   ├── ui/
│       │   └── Chatbot.js
│       ├── pages/
│       │   ├── Index.js
│       │   ├── Login.js
│       │   └── Signup.js
│       ├── App.js
│       ├── index.js
│       └── .env
│
└── .gitignore
```

---

## ⚡ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/sentinel.git
cd sentinel
```

### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # On Windows
source venv/bin/activate  # On Mac/Linux

pip install -r requirements.txt
```

Create a **`.env` file** in `/backend`:

```
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
MONGO_URI=your_mongo_uri
GEMINI_API_KEY=your_gemini_api_key
```

Run the backend:

```bash
python app.py
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create a **`.env` file** in `/frontend`:

```
REACT_APP_API_URL=http://localhost:8000
```

Run the frontend:

```bash
npm start
```

---

## 🔒 Environment Variables

Both **frontend** and **backend** have separate `.env` files:

* **Backend** → JWT secrets, Mongo URI, API keys
* **Frontend** → API base URL

`.env` files are **ignored in Git** (via `.gitignore`).

---

## 📊 Example Dashboard Data

* **Score:** Latest AI-generated psychological safety score (0–100)
* **Participation:** Average participation percentage
* **Team Size:** Number of members in the team
* **Avg Rating:** Engagement rating (1–5 scale)

---

## 🚀 Future Scope

* [ ] Role-based access control (Admin, Team Lead, Member)
* [ ] OAuth integration (Google, Microsoft login)
* [ ] Advanced AI models (sentiment analysis, burnout prediction)
* [ ] Multi-team/org level dashboards
* [ ] Slack/Discord/Teams integration for automatic chat ingestion
* [ ] Gamification (leaderboards, badges)
* [ ] Cloud deployment (Docker + Kubernetes on AWS/GCP/Azure)
* [ ] Ethical AI Transparency Dashboard

---

## License

This project is **proprietary** and protected by copyright © 2025 Rasika Gautam.

You are welcome to view the code for educational or evaluation purposes (e.g., portfolio review by recruiters).  
However, you may **not copy, modify, redistribute, or claim this project as your own** under any circumstances — including in interviews or job applications — without written permission.

---

## 🧑‍💻 Author

**Rasika Gautam**
*Data Science & AI Enthusiast* | B.Tech MAC, NSUT
[GitHub](https://github.com/rasika1205)

