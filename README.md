# EduTrack Pro - Student Management System (SMS)
### Complete CRUD-Based Web Application Development
*Developed in accordance with the Standard Operating Procedure (SOP)*

---

## 🌟 Overview
**EduTrack Pro** is a modern, production-grade full-stack web application implementing complete Create, Read, Update, and Delete (CRUD) operations. It features:
- **Frontend**: React 18 + Vite + Responsive CSS3 + Lucide Icons (Dual Table & Card Grid Views, Live Search, Department & Status Filters, Accessible Modals, Toast Alerts)
- **Backend**: Django 6.1 + Django REST Framework (DRF) + `django-cors-headers`
- **Database**: SQLite3 relational database with uniqueness constraints, range validators, and indexes
- **Testing**: 17 automated unit and integration tests (`python manage.py test students`) + Postman Collection
- **Documentation**: Comprehensive academic project report in [`docs/PROJECT_REPORT.md`](docs/PROJECT_REPORT.md)

---

## 🚀 Quick Start Guide

### Option 1: One-Click Launch (Windows)
1. **Start Backend**: Double click `run_backend.bat` (serves API at `http://127.0.0.1:8000`)
2. **Start Frontend**: Double click `run_frontend.bat` (serves UI at `http://127.0.0.1:5173`)
3. Open your browser to **`http://localhost:5173`**

---

### Option 2: Manual Terminal Execution

#### Terminal 1 — Backend (Django REST Framework)
```powershell
# Navigate to backend directory
cd backend

# Run database migrations
..\.venv\Scripts\python.exe manage.py migrate

# (Optional) Seed sample data for demonstration
..\.venv\Scripts\python.exe manage.py seed_students

# Start the server
..\.venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```

#### Terminal 2 — Frontend (React + Vite)
```powershell
# Navigate to frontend directory
cd frontend

# Install packages
npm install

# Start Vite development server
npm run dev
```

---

## 📋 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/students/` | List all students with search & filter query params |
| `POST` | `/api/students/` | Create a new student (validated payload) |
| `GET` | `/api/students/{id}/` | Retrieve a single student by primary key |
| `PUT` | `/api/students/{id}/` | Full update of existing student |
| `PATCH` | `/api/students/{id}/` | Partial update of existing student |
| `DELETE`| `/api/students/{id}/` | Permanently remove student |
| `GET` | `/api/students/stats/` | Aggregated analytics (totals, average GPA, department breakdown) |

---

## 🧪 Testing

### Automated Backend Tests
Run the 17 automated tests covering positive, negative, duplicate, boundary, and delete scenarios:
```powershell
cd backend
..\.venv\Scripts\python.exe manage.py test students
```

### Postman Testing
Import [`postman/Student_Management_System.postman_collection.json`](postman/Student_Management_System.postman_collection.json) into Postman to run pre-configured requests and tests against all endpoints.

---

## 📁 Project Structure

```
.
├── backend/
│   ├── core/                  # Django project settings, CORS & routing
│   ├── students/              # App: models, serializers, views, tests, seed
│   ├── requirements.txt       # Backend dependencies
│   └── db.sqlite3             # Relational SQLite database
├── frontend/
│   ├── src/
│   │   ├── components/        # UI components (Table, Cards, Modals, Navbar, etc.)
│   │   ├── services/api.js    # API service client
│   │   ├── App.jsx            # State & CRUD controller
│   │   └── index.css          # Modern responsive styling
│   ├── package.json
│   └── vite.config.js
├── postman/
│   └── Student_Management_System.postman_collection.json
├── docs/
│   └── PROJECT_REPORT.md      # Full academic project report & Viva guide
├── run_backend.bat            # Quick start backend launcher
├── run_frontend.bat           # Quick start frontend launcher
├── .gitignore
└── README.md
```

---

## 📜 Full Documentation
For the complete system architecture, database ER diagrams, validation matrix, and viva questions, please refer to [**`docs/PROJECT_REPORT.md`**](docs/PROJECT_REPORT.md).
