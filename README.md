# Career Intelligence Platform

A full-stack backend-driven web application that analyzes a user's current technical skills, identifies gaps for a target role, and generates a structured learning roadmap with persistent progress tracking.

Built with a backend-first approach focusing on system design, API architecture, and production-ready workflows.

---

## 🚀 Problem Statement

Students and early professionals often struggle to understand:

* Which skills they lack for a specific role
* What order to learn skills in
* How close they are to job readiness
* How to track progress consistently

Most resources provide static roadmaps but not personalized guidance.

---

## 💡 Solution

Career Intelligence Platform provides:

* Skill readiness analysis
* Gap identification
* Personalized learning roadmap
* Persistent progress tracking
* Re-analysis workflow
* Backend-driven recommendation logic

This turns static learning paths into an evolving career journey.

---

## 🧱 System Architecture

Frontend (Next.js) communicates with a backend (FastAPI) which handles authentication, skill analysis, and progress persistence in PostgreSQL.

See architecture diagram below.

---

## 🛠️ Tech Stack

### Backend

* FastAPI (async APIs)
* PostgreSQL
* SQLAlchemy
* JWT Authentication
* Pydantic (typed schemas)

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Component + hooks architecture

### DevOps

* Docker & Docker Compose
* Environment-based configuration

---

## ✨ Key Features

### 🔐 Authentication

* JWT-based login & signup
* Protected APIs
* Token-based session handling

### 📊 Skill Gap Analysis

* Role-based skill evaluation
* Readiness score calculation
* Missing / weak / strong skill classification

### 🧭 Personalized Roadmap

* Phase-wise learning structure
* Estimated learning duration
* Skill progression logic

### 📈 Progress Tracking

* Persistent progress stored in PostgreSQL
* Resume learning anytime

### 🔁 Re-analysis Workflow

* Detect existing roadmap
* Reset progress intentionally
* Generate updated roadmap

### 🧱 Production Architecture

* Types → Services → Hooks → Components layering
* Separation of concerns
* Scalable structure for AI integration

---

## 📦 Project Structure

```
src/
│
├── app/                # Routing & page controllers
├── components/         # UI components
├── hooks/              # Business logic
├── services/           # API communication layer
├── types/              # TypeScript models
├── context/            # Auth state
├── lib/                # Config & utilities
```

Backend:

```
app/
├── api/
├── core/
├── models/
├── schemas/
├── services/
└── db/
```

---

## 🐳 Docker Setup

Run entire system:

```
docker compose up --build
```

Services:

* frontend → [http://localhost:3000](http://localhost:3000)
* backend → [http://localhost:8000](http://localhost:8000)
* database → PostgreSQL container

---

## 🧪 Example Workflow

1. User signs up & logs in
2. Selects skill proficiency
3. Backend performs analysis
4. Generates readiness score + roadmap
5. User tracks learning progress
6. Can re-analyze to update roadmap

---

## 🧱 System Architecture

```
flowchart LR

User[User Browser] --> Frontend[Next.js Frontend]

Frontend -->|REST API Calls| Backend[FastAPI Backend]

Backend --> Auth[JWT Authentication Service]
Backend --> Analysis[Skill Gap Analysis Engine]
Backend --> Roadmap[Roadmap Generator]
Backend --> Progress[Progress Tracking Service]

Auth --> DB[(PostgreSQL)]
Analysis --> DB
Roadmap --> DB
Progress --> DB

Backend --> Frontend

```

---

## 🗄️ Database Schema

```
erDiagram

USERS {
    UUID id PK
    STRING email
    STRING password_hash
    TIMESTAMP created_at
}

USER_PROGRESS {
    UUID id PK
    UUID user_id FK
    STRING skill_id
    INTEGER proficiency
    BOOLEAN completed
    TIMESTAMP updated_at
}

SKILLS {
    STRING id PK
    STRING name
}

ROLES {
    STRING id PK
    STRING name
}

ROLE_SKILLS {
    STRING role_id FK
    STRING skill_id FK
    INTEGER importance
}

USERS ||--o{ USER_PROGRESS : tracks
SKILLS ||--o{ USER_PROGRESS : belongs_to
ROLES ||--o{ ROLE_SKILLS : maps
SKILLS ||--o{ ROLE_SKILLS : required_for
```


---

## 📌 Backend Highlights

* Designed REST APIs for skill analysis and progress persistence
* Implemented JWT authentication & authorization
* Built modular service layer for business logic
* Integrated PostgreSQL for stateful learning workflows
* Dockerized environment for reproducible deployment

---

## 🔮 Future Enhancements

* AI-based skill recommendations
* Analysis history tracking
* Multiple career role support
* Analytics dashboard
* Notification system
* OAuth login

---

## 👨‍💻 Author


### Sumit Kumar

