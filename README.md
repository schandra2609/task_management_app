# 📝 TaskMaster: Full-Stack Task Management

[![React](https://img.shields.io/badge/React-19-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![Node](https://img.shields.io/badge/Node.js-LTS-green.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Render](https://img.shields.io/badge/Render-Backend-46E3B7.svg?style=for-the-badge&logo=render)](https://render.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000.svg?style=for-the-badge&logo=vercel)](https://vercel.com/)

A high-performance, responsive, and secure task management application built with the **MERN** stack. TaskMaster allows users to organize their daily workflows with real-time updates and an intuitive interface.

---

## 🚀 Live Demo
- **Frontend:** [https://taskmasteronline.vercel.app](https://taskmasteronline.vercel.app)
- **Backend API:** [https://task-management-api-aapv.onrender.com](https://task-management-api-aapv.onrender.com)

---

## ✨ Key Features
- **🔐 Secure Auth:** Signup and Login with JWT and Bcrypt encryption.
- **⚡ Real-time CRUD:** Create, read, update, and delete tasks instantly.
- **🔍 Advanced Search:** Live, case-insensitive task lookup.
- **📅 Smart Filtering:** Filter by status (Pending, In-Progress, Completed).
- **↕️ Dynamic Sorting:** Sort by newest, oldest, or approaching due dates.
- **📱 Responsive Design:** Optimized for Mobile, Tablet, and Desktop using Tailwind CSS.
- **🛡️ Data Security:** User-specific data isolation and protected routes.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** (Functional Components & Hooks)
- **Vite** (Next Generation Frontend Tooling)
- **React Router 7** (SPA Routing)
- **Axios** (API Communication)
- **React Icons** (Iconography)

### Backend
- **Node.js & Express.js**
- **MongoDB Atlas** (Cloud Database)
- **Mongoose** (Object Data Modeling)
- **JWT** (Stateless Authentication)
- **Jest & Supertest** (API Testing)

---

## 📂 Project Structure
```bash
task_management_app/
├── backend/                # Express API & MongoDB Models
│   ├── src/
│   │   ├── config/         # Database & Env Config
│   │   ├── controllers/    # Route Logic
│   │   ├── models/         # Mongoose Schemas
│   │   └── routes/         # API Endpoints
│   └── test/               # Jest Unit & Integration Tests
├── frontend/               # React (Vite) Application
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # View Containers
│   │   └── services/       # Axios API Logic
│   └── public/             # Static Assets
├── .gitignore              # Root Git Ignore
├── LICENSE                 # Project License
└── README.md               # Project Documentation
```

---

## ⚙️ Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/schandra2609/task_management_app.git
cd task_management_app
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env.development` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
PORT=5000
API_V=/api/v1
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env.development` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api/v1
```
Start the application:
```bash
npm run dev
```

---

## 🧪 Testing
The backend includes a comprehensive test suite. To run the tests:
```bash
cd backend
npm test
```

---

## 🔮 Future Enhancements
- [ ] **Collaborative Tasks:** Share task lists with other users.
- [ ] **Push Notifications:** Reminders for upcoming due dates.
- [ ] **Drag & Drop:** Reorder tasks using a visual Kanban board.
- [ ] **Dark Mode:** System-wide theme toggle.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors
- **Sayan Chandra** - *Full-Stack Development* - [GitHub](https://github.com/schandra2609)
