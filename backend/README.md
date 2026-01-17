# Backend API Documentation

Node.js/Express backend API for the landing page application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`

4. Start server:
```bash
# Development
npm run dev

# Production
npm start
```

## Environment Variables

See `.env.example` for all required variables.

## API Documentation

### Base URL
```
Production: https://your-app.onrender.com
Development: http://localhost:3000
```

### Health Check
```
GET /health
```
Returns server status and uptime.

### Reviews

#### Get All Reviews
```
GET /api/reviews
```

Response:
```json
{
  "success": true,
  "count": 10,
  "data": [...],
  "stats": {
    "averageRating": 4.5,
    "totalReviews": 10
  }
}
```

#### Create Review
```
POST /api/reviews
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5,
  "comment": "Great service!"
}
```

### Projects

#### Get All Projects
```
GET /api/projects
```

#### Create Project (Admin Only)
```
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Project Name",
  "description": "Project description",
  "imageUrl": "https://...",
  "category": "first"
}
```

### Authentication

#### Admin Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Image Upload (Admin Only)

```
POST /api/upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form data:
- image: <file>
```

## Deployment (Render)

1. Create a new Web Service on Render
2. Connect GitHub repository
3. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`
4. Add environment variables
5. Deploy!

## Database

Uses MongoDB (MongoDB Atlas recommended for production).

## Error Handling

All errors return consistent JSON format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error
