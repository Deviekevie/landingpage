# Creative Interior Design Solutions

A modern, full-stack landing page for interior design services with real-time reviews, project galleries, and admin management capabilities.

![Project Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-vercel-blue)
![Backend](https://img.shields.io/badge/backend-render-orange)

## 🎯 Features

- **Real-time Reviews & Ratings** - Customers can submit reviews with 1-5 star ratings
- **Project Gallery** - Dynamic portfolio display with category filtering
- **Admin Panel** - Secure admin authentication and project image upload
- **Responsive Design** - Professional UI optimized for desktop and mobile
- **API Integration** - RESTful backend with JWT authentication
- **Production Ready** - Deployed on Vercel (frontend) and Render (backend)

## 🛠 Tech Stack

### Frontend
- HTML5, CSS3 (Bootstrap)
- Vanilla JavaScript (ES6+)
- Font Awesome icons
- Owl Carousel for carousels

### Backend
- Node.js & Express.js
- MongoDB (Mongoose)
- JWT authentication
- Cloudinary integration (image upload)
- CORS configured for Vercel

## 📁 Project Structure

```
landingpage/
├── backend/              # Node.js/Express API
│   ├── middleware/      # Auth, error handling, logging
│   ├── models/          # Mongoose models (Review, Project)
│   ├── routes/          # API routes (reviews, projects, auth, upload)
│   ├── server.js        # Main server file
│   └── package.json     # Backend dependencies
├── js/                  # Frontend JavaScript
│   ├── config.js        # API configuration
│   ├── api.js           # API client
│   ├── reviews.js       # Review management
│   ├── projects.js      # Projects management
│   ├── admin.js         # Admin panel
│   └── main.js          # Main UI logic
├── css/                 # Stylesheets
│   └── style.css        # Main styles
├── img/                 # Image assets
├── index.html           # Main landing page
├── contact.html         # Contact page
├── vercel.json          # Vercel deployment config
├── render.yaml          # Render deployment config
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ (for backend)
- MongoDB Atlas account (or local MongoDB)
- Vercel account (for frontend deployment)
- Render account (for backend deployment)

### Local Development

#### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/landingpage
FRONTEND_URL=http://localhost:5500
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme123
```

Start backend:
```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:3000`

#### Frontend Setup
Simply open `index.html` in a browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000
```

Frontend will be available at `http://localhost:8000`

## 🌐 Deployment

### Frontend (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Other
     - **Root Directory**: ./
     - **Build Command**: (leave empty)
     - **Output Directory**: (leave empty)

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add: `API_BASE_URL` = `https://your-render-backend.onrender.com`
   - Select: Production, Preview, Development

4. **Update vercel.json**
   - Remove the placeholder in `rewrites.destination`
   - Or leave it - API calls use environment variable directly

### Backend (Render)

1. **Create MongoDB Atlas Cluster** (if not using local MongoDB)
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/landingpage`

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `landingpage-backend`
     - **Environment**: Node
     - **Root Directory**: `backend`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000 (Render sets this automatically)
   MONGODB_URI=mongodb+srv://...
   FRONTEND_URL=https://your-app.vercel.app
   JWT_SECRET=your-secure-random-string
   JWT_EXPIRE=7d
   ADMIN_EMAIL=your-admin@email.com
   ADMIN_PASSWORD=your-secure-password
   ```

4. **Optional: Cloudinary** (for image uploads)
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

## 📚 API Endpoints

### Reviews
- `GET /api/reviews` - Get all approved reviews
- `POST /api/reviews` - Create a new review
- `GET /api/reviews/stats` - Get review statistics

### Projects
- `GET /api/projects` - Get all active projects
- `POST /api/projects` - Create project (admin only)

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/validate` - Validate token (protected)

### Upload
- `POST /api/upload/image` - Upload image (admin only)

### Health
- `GET /health` - Health check endpoint

## 🔧 Configuration

### Environment Variables

**Frontend (Vercel)**
- `API_BASE_URL` - Backend API URL (required)

**Backend (Render)**
- `MONGODB_URI` - MongoDB connection string (required)
- `FRONTEND_URL` - Frontend URL for CORS (required)
- `JWT_SECRET` - Secret key for JWT (required)
- `ADMIN_EMAIL` - Admin login email (required)
- `ADMIN_PASSWORD` - Admin login password (required)
- `CLOUDINARY_*` - Cloudinary credentials (optional)

See `backend/.env.example` for complete list.

## 🐛 Troubleshooting

### "Failed to connect to API" Error
1. Check `API_BASE_URL` is set in Vercel environment variables
2. Verify backend is running on Render
3. Check CORS configuration in backend (`FRONTEND_URL`)
4. Review browser console for specific error messages

### CORS Errors
1. Ensure `FRONTEND_URL` in backend matches your Vercel URL exactly
2. Check backend logs on Render for CORS rejection messages
3. Verify backend CORS configuration includes Vercel patterns

### Reviews Not Loading
1. Check backend is running and accessible
2. Verify MongoDB connection is working
3. Check browser console for API errors
4. Ensure `/api/reviews` endpoint is reachable

## 📝 License

This project is proprietary software. All rights reserved.

## 👥 Author

Creative Interior Design Solutions

---

**Made with ❤️ for beautiful interior design solutions**
