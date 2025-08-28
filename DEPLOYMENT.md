# KNWOUT Deployment Guide

## Live Application
🌐 **Live Demo**: [KNWOUT Weather App](https://ankvit26.github.io/KNWOUT/)

## Deployment Options

### 1. GitHub Pages (Recommended) ✅

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch.

**Setup Steps:**
1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The workflow will automatically deploy on every push to main

**Automatic Deployment:**
- ✅ Configured via `.github/workflows/deploy.yml`
- ✅ Deploys automatically on push to main branch
- ✅ Zero configuration needed

### 2. Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ANKVIT26/KNWOUT)

**Manual Deployment:**
1. Create account on [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Set build settings:
   - Build command: (leave empty)
   - Publish directory: `KNWOUT`
4. Deploy!

### 3. Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ANKVIT26/KNWOUT)

**Manual Deployment:**
1. Create account on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `KNWOUT`
4. Deploy!

### 4. Firebase Hosting

Since the app already uses Firebase for authentication, you can also deploy to Firebase Hosting:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select KNWOUT as your public directory
firebase deploy
```

## Local Development

### Prerequisites
- Any modern web browser
- Python 3 (for local server) or any HTTP server

### Running Locally

**Option 1: Python HTTP Server**
```bash
cd KNWOUT
python3 -m http.server 8000
# Visit http://localhost:8000
```

**Option 2: Node.js HTTP Server**
```bash
cd KNWOUT
npx http-server -p 8000
# Visit http://localhost:8000
```

**Option 3: PHP Server**
```bash
cd KNWOUT
php -S localhost:8000
# Visit http://localhost:8000
```

## Environment Configuration

### Required API Keys
The application requires the following API keys (already configured in the code):

1. **Weather API Key**: `9b30ffc7236248fb922170638251902`
   - Service: WeatherAPI.com
   - Used for: Weather data, forecasts, and historical data

2. **Firebase Configuration**: 
   - Already configured in `login.html`
   - Used for: User authentication and data storage

### Features Available
- ✅ Weather search for any global location
- ✅ Current weather conditions
- ✅ 3-day weather forecast
- ✅ 14-day weather history
- ✅ User authentication (Firebase)
- ✅ Responsive design
- ✅ Interactive 3D landing page

## File Structure
```
KNWOUT/
├── Landing.html          # 3D animated landing page
├── login.html           # User authentication
├── index.html           # Main weather dashboard  
├── forecast.html        # Weather forecast page
├── History.html         # Weather history page
├── script.js           # Main JavaScript functionality
├── forecast.js         # Forecast page functionality
├── History.js          # History page functionality
└── img/                # Application images
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure to serve the files via HTTP server, not by opening HTML files directly
2. **API Limits**: The weather API has rate limits, try again if you hit them
3. **Firebase Auth**: Make sure Firebase configuration is correct in `login.html`

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

---
**Note**: This is a client-side application with no server-side dependencies, making it easy to deploy on any static hosting platform.