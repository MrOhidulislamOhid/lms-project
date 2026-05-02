# 📚 Learning Management System (LMS)

A modern, full-stack Learning Management System built with **Django REST Framework** and **React** with a beautiful **Tailwind CSS** design. The system supports role-based access control for Students, Instructors, and Admins.

---

## ✨ Features

### 🎓 Core Features
- **User Authentication** - Secure login and registration system
- **Role-Based Access Control** - Three user roles with specific permissions:
  - **Student**: Browse courses, enroll, view enrolled courses
  - **Instructor**: Create, edit, and manage courses
  - **Admin**: System-wide management and analytics

### 📖 Course Management
- Create and publish courses
- Edit course information
- Delete courses (Instructor/Admin only)
- Browse all available courses
- View course details

### 👥 User Management
- User registration with role selection
- Profile management
- Enrollment tracking
- Dashboard views per role

### 📊 Analytics Dashboard
- **Admin Dashboard**: View system statistics (users, students, instructors, courses, enrollments)
- **Student Dashboard**: Enrollment stats and course progress
- **Instructor Dashboard**: Course management and performance tracking

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Django REST Framework
- **Database**: SQLite (Development)
- **Authentication**: JWT (Token-based)
- **API**: RESTful API endpoints

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4.2
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios

### Additional Tools
- ESLint for code quality
- React Router for navigation
- Responsive design for all devices

---

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd lms-project
```

### 2. Backend Setup (Django)

Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Apply migrations:
```bash
python manage.py migrate
```

Create a superuser account:
```bash
python manage.py createsuperuser
```

Run the backend server:
```bash
python manage.py runserver
```

The backend will be available at: **http://localhost:8000**

### 3. Frontend Setup (React)

In a new terminal, navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will be available at: **http://localhost:5173** (or next available port)

---

## 📁 Project Structure

```
lms-project/
├── backend/
│   ├── manage.py
│   ├── db.sqlite3
│   ├── accounts/               # User authentication & profiles
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── migrations/
│   ├── lms/                    # Course management
│   │   ├── models.py           # Course, Enrollment models
│   │   ├── views.py            # Course viewsets
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── migrations/
│   ├── core/                   # Project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── db.sqlite3
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navigation.jsx  # Main navigation bar
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── CreateCourse.jsx
│   │   │   ├── EditCourse.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── InstructorDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── MyCourses.jsx
│   │   ├── routes/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── api/
│   │   │   └── axios.js        # Axios configuration
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── tailwind.config.js (generated)
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user

### Courses
- `GET /api/lms/courses/` - Get all courses
- `POST /api/lms/courses/` - Create course (Instructor)
- `GET /api/lms/courses/{id}/` - Get course detail
- `PUT /api/lms/courses/{id}/` - Update course (Instructor)
- `DELETE /api/lms/courses/{id}/` - Delete course (Instructor/Admin)

### Enrollments
- `GET /api/lms/enrollments/my_courses/` - Get user's enrolled courses
- `POST /api/lms/enrollments/` - Enroll in a course

### Admin
- `GET /api/lms/admin-dashboard/` - Get admin dashboard stats

---

## 📖 User Roles & Permissions

### 🎓 Student
- ✅ View all courses
- ✅ View course details
- ✅ Enroll in courses
- ✅ View enrolled courses
- ❌ Create/Edit/Delete courses

### 👨‍🏫 Instructor
- ✅ View all courses
- ✅ Create new courses
- ✅ Edit own courses
- ✅ Delete own courses
- ✅ View instructor dashboard

### 👑 Admin
- ✅ All permissions
- ✅ View system analytics
- ✅ Manage all courses and users

---

## 📱 Main Pages

| Page | Route | Accessible By |
|------|-------|--------------|
| Login | `/login` | Public |
| Register | `/register` | Public |
| Courses | `/courses` | All (Authenticated) |
| Course Detail | `/courses/:id` | All (Authenticated) |
| Create Course | `/create-course` | Instructor, Admin |
| Edit Course | `/edit-course/:id` | Instructor, Admin |
| Student Dashboard | `/student-dashboard` | Student |
| Instructor Dashboard | `/instructor-dashboard` | Instructor |
| Admin Dashboard | `/admin-dashboard` | Admin |
| My Courses | `/my-courses` | Student |

---

## 🔐 Environment Variables

### Backend (.env in backend/)
```env
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

### Frontend (.env in frontend/)
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach works on all devices
- **Gradient Headers**: Beautiful blue-to-indigo gradients
- **Card-Based Layout**: Clean, modern card components
- **Interactive Elements**: Smooth transitions and hover effects
- **Loading States**: Animated spinners for async operations
- **Error Handling**: User-friendly error messages
- **Accessibility**: Proper form labels and semantic HTML

---

## 📝 Scripts

### Frontend Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Commands
```bash
python manage.py runserver      # Start dev server
python manage.py migrate        # Apply migrations
python manage.py createsuperuser # Create admin user
python manage.py test           # Run tests
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🆘 Support

For issues, questions, or suggestions, please:
- Open an issue on GitHub
- Contact the development team
- Check existing documentation

---

## 🎯 Future Enhancements

- [ ] Video lessons and content uploads
- [ ] Quiz and assessment features
- [ ] Certificate generation
- [ ] Discussion forums
- [ ] Real-time notifications
- [ ] Email notifications
- [ ] Course ratings and reviews
- [ ] Payment integration
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Docker support
- [ ] Deployment guides (AWS, Heroku, DigitalOcean)

---


**Made with ❤️ by the LMS Development Team**
