# 🚀 Deployment Guide - Book Store Application

This guide will help you deploy the complete Book Store application (backend + frontend) to production.

## 📋 Prerequisites

1. **GitHub Account**: For hosting the repository and GitHub Pages
2. **Backend Hosting Service**: Choose one of the following:
   - [Render](https://render.com/) (Recommended - Free tier available)
   - [Railway](https://railway.app/) (Free tier available)
   - [Heroku](https://heroku.com/) (Paid)
   - [Vercel](https://vercel.com/) (Free tier available)

## 🎯 Deployment Strategy

### Backend (FastAPI)
- Deploy to a cloud hosting service
- Configure environment variables
- Set up database (PostgreSQL recommended for production)

### Frontend (React)
- Deploy to GitHub Pages
- Connect to deployed backend API
- Configure environment variables

---

## 🔧 Step 1: Deploy Backend API

### Option A: Deploy to Render (Recommended)

1. **Sign up for Render**:
   - Go to [render.com](https://render.com/)
   - Create an account

2. **Connect your GitHub repository**:
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select your repository

3. **Configure the service**:
   ```
   Name: book-store-api
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

4. **Set Environment Variables**:
   ```
   DATABASE_URL: Your PostgreSQL connection string
   DEBUG: False
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your service URL (e.g., `https://your-app.onrender.com`)

### Option B: Deploy to Railway

1. **Sign up for Railway**:
   - Go to [railway.app](https://railway.app/)
   - Create an account

2. **Deploy from GitHub**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Python and deploy

3. **Configure Environment Variables**:
   - Go to your project settings
   - Add the same environment variables as above

### Option C: Deploy to Heroku

1. **Install Heroku CLI**:
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login and create app**:
   ```bash
   heroku login
   heroku create your-book-store-api
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set DATABASE_URL=your_postgresql_url
   heroku config:set DEBUG=False
   ```

---

## 🌐 Step 2: Deploy Frontend to GitHub Pages

### 1. Configure GitHub Secrets

1. **Go to your GitHub repository**
2. **Navigate to Settings → Secrets and variables → Actions**
3. **Add the following secret**:
   - Name: `REACT_APP_API_URL`
   - Value: Your deployed backend URL (e.g., `https://your-app.onrender.com`)

### 2. Enable GitHub Pages

1. **Go to repository Settings → Pages**
2. **Configure**:
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically)
   - Folder: `/ (root)`
3. **Click Save**

### 3. Deploy Frontend

#### Option A: Manual Deployment
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

#### Option B: Automatic Deployment (Recommended)
1. **Push your changes to the main branch**
2. **GitHub Actions will automatically deploy** (if you have the workflow configured)
3. **Check the Actions tab** to monitor deployment progress

### 4. Verify Deployment

1. **Wait a few minutes** for GitHub Pages to build and deploy
2. **Visit your site**: `https://yourusername.github.io/book_store_service_python_fastapi_sql`
3. **Test the functionality**:
   - Check if the frontend loads
   - Test API connectivity
   - Verify CRUD operations work

---

## 🔧 Step 3: Configuration

### Environment Variables

#### Backend (Set in your hosting service)
```bash
DATABASE_URL=postgresql://username:password@host:port/database
DEBUG=False
HOST=0.0.0.0
PORT=8000
```

#### Frontend (Set in GitHub Secrets)
```bash
REACT_APP_API_URL=https://your-backend-url.com
```

### CORS Configuration

The backend is already configured to allow requests from:
- `https://gouravjain.github.io`
- `https://*.github.io`
- `http://localhost:3000` (for development)

---

## 🧪 Step 4: Testing

### Test Backend API
```bash
# Health check
curl https://your-backend-url.com/health

# Test books endpoint
curl https://your-backend-url.com/books/

# Test API documentation
# Visit: https://your-backend-url.com/docs
```

### Test Frontend
1. **Visit your GitHub Pages URL**
2. **Test all functionality**:
   - Dashboard loads correctly
   - Books list and CRUD operations
   - Authors list and CRUD operations
   - Categories list and CRUD operations
   - Search functionality
   - Responsive design on mobile

---

## 🚨 Troubleshooting

### Common Issues

#### Frontend can't connect to backend
- **Check CORS configuration** in backend
- **Verify API URL** in GitHub secrets
- **Check browser console** for errors

#### Backend deployment fails
- **Check build logs** in your hosting service
- **Verify requirements.txt** is up to date
- **Check environment variables** are set correctly

#### GitHub Pages not updating
- **Check GitHub Actions** for deployment status
- **Verify gh-pages branch** was created
- **Wait 5-10 minutes** for changes to propagate

### Debug Commands

```bash
# Test backend locally
uvicorn app.main:app --reload

# Test frontend locally
cd frontend
npm start

# Build frontend locally
cd frontend
npm run build
```

---

## 📊 Monitoring

### Backend Monitoring
- **Render/Railway/Heroku dashboards** for uptime and logs
- **API health checks** at `/health` endpoint
- **Error logging** in hosting service logs

### Frontend Monitoring
- **GitHub Pages** status in repository settings
- **Browser console** for JavaScript errors
- **Network tab** for API request failures

---

## 🔄 Updates and Maintenance

### Updating Backend
1. **Push changes** to main branch
2. **Hosting service** will auto-deploy (if configured)
3. **Monitor deployment** logs

### Updating Frontend
1. **Push changes** to main branch
2. **GitHub Actions** will auto-deploy
3. **Check deployment** in Actions tab

---

## 🎉 Success!

Your Book Store application is now deployed and accessible at:
- **Frontend**: `https://yourusername.github.io/book_store_service_python_fastapi_sql`
- **Backend API**: `https://your-backend-url.com`
- **API Documentation**: `https://your-backend-url.com/docs`

### Next Steps
1. **Share your application** with others
2. **Monitor performance** and uptime
3. **Add more features** and improvements
4. **Set up custom domain** (optional)

---

**Happy Deploying! 🚀** 