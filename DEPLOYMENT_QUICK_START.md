# Lexova Platform - Quick Start Deployment Guide

## 🚀 Quick Setup (5 Minutes)

### Prerequisites
- Ubuntu 22.04+ or similar Linux distribution
- Root or sudo access
- Internet connection

### 1. Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python 3.11 and pip
sudo apt install -y python3.11 python3.11-pip python3.11-venv

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. Setup Database
```bash
# Navigate to project directory
cd lexova_platform/backend/lexova_backend

# Create Python virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Seed database
python seed_database.py
```

### 3. Start Backend
```bash
# In backend directory with venv activated
python src/main.py
# Backend will run on http://localhost:5000
```

### 4. Start Frontend
```bash
# Open new terminal
cd lexova_platform/frontend/lexova_frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
# Frontend will run on http://localhost:5173 or 5174
```

### 5. Access the Platform
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Login**: ethan@lexova.com / LexovaAdmin2024!
- **Client Login**: client1@example.com / ClientPass123!
- **Lawyer Login**: lawyer1@example.com / LawyerPass123!

## 🔧 Production Deployment

### Using Docker (Recommended)
```bash
# Clone and navigate to project
cd lexova_platform

# Build and start all services
docker-compose up -d

# Access at https://yourdomain.com
```

### Manual Production Setup
```bash
# Install Nginx
sudo apt install -y nginx

# Install SSL certificate (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com

# Build frontend for production
cd frontend/lexova_frontend
npm run build

# Copy built files to web directory
sudo cp -r dist/* /var/www/html/

# Configure Nginx (see full documentation for config)
sudo systemctl restart nginx

# Start backend with Gunicorn
cd ../../backend/lexova_backend
pip install gunicorn
gunicorn --bind 0.0.0.0:5000 src.main:app
```

## 📋 Default Credentials

### Admin Account
- **Email**: ethan@lexova.com
- **Password**: LexovaAdmin2024!
- **Access**: Full admin panel access

### Test Client Account
- **Email**: client1@example.com
- **Password**: ClientPass123!
- **Access**: Client dashboard

### Test Lawyer Account
- **Email**: lawyer1@example.com
- **Password**: LawyerPass123!
- **Access**: Lawyer dashboard

## 🛠️ Troubleshooting

### Common Issues

**Frontend not loading**
```bash
# Check if all dependencies are installed
npm install --legacy-peer-deps

# Clear cache and restart
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

**Backend connection errors**
```bash
# Check MongoDB is running
sudo systemctl status mongod

# Check Python dependencies
pip install -r requirements.txt

# Verify database seeding
python seed_database.py
```

**Port conflicts**
- Frontend default: 5173 (Vite will auto-increment if busy)
- Backend default: 5000
- MongoDB default: 27017

## 📞 Support

For issues or questions:
1. Check the comprehensive documentation: `LEXOVA_PLATFORM_DOCUMENTATION.md`
2. Review the issues log: `issues_found.md`
3. Check the todo list: `todo.md`

## 🎯 Next Steps

1. **Customize branding** in frontend components
2. **Configure payment gateway** (Stripe/PayPal)
3. **Set up email service** (SMTP configuration)
4. **Configure SSL certificates** for production
5. **Set up monitoring** and backup procedures

---

**Platform Status**: 85% Production Ready
**Last Updated**: December 19, 2024
**Version**: 1.0

