# Deployment Guide

This guide covers deploying the Book Store Service to various environments.

## Local Development

### Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
python run.py
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL=sqlite:///./bookstore.db
DEBUG=True
HOST=0.0.0.0
PORT=8000
```

## Docker Deployment

### Using Docker Compose

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Docker Build

```bash
# Build image
docker build -t book-store-service .

# Run container
docker run -p 8000:8000 book-store-service

# Run with environment variables
docker run -p 8000:8000 \
  -e DATABASE_URL=postgresql://user:pass@host/db \
  book-store-service
```

## Production Deployment

### Prerequisites

- Production server (Ubuntu 20.04+ recommended)
- PostgreSQL database
- Nginx (reverse proxy)
- SSL certificate
- Domain name

### Server Setup

1. **Update system**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Python and dependencies**
   ```bash
   sudo apt install python3 python3-pip python3-venv nginx
   ```

3. **Install PostgreSQL**
   ```bash
   sudo apt install postgresql postgresql-contrib
   ```

### Application Deployment

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/book_store_service_python_fastapi_sql.git
   cd book_store_service_python_fastapi_sql
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   pip install gunicorn
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

4. **Create systemd service**
   ```bash
   sudo nano /etc/systemd/system/bookstore.service
   ```

   ```ini
   [Unit]
   Description=Book Store Service
   After=network.target

   [Service]
   User=www-data
   Group=www-data
   WorkingDirectory=/path/to/book_store_service_python_fastapi_sql
   Environment="PATH=/path/to/book_store_service_python_fastapi_sql/venv/bin"
   ExecStart=/path/to/book_store_service_python_fastapi_sql/venv/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 127.0.0.1:8000
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

5. **Start service**
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable bookstore
   sudo systemctl start bookstore
   ```

### Nginx Configuration

1. **Create Nginx site**
   ```bash
   sudo nano /etc/nginx/sites-available/bookstore
   ```

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

2. **Enable site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/bookstore /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### SSL Configuration

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain SSL certificate**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **Auto-renewal**
   ```bash
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

## Cloud Deployment

### Heroku

1. **Create Procfile**
   ```
   web: gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:$PORT
   ```

2. **Deploy**
   ```bash
   heroku create your-app-name
   heroku addons:create heroku-postgresql:hobby-dev
   git push heroku main
   ```

### AWS

1. **EC2 Setup**
   - Launch EC2 instance
   - Configure security groups
   - Follow production deployment steps

2. **RDS Database**
   - Create PostgreSQL RDS instance
   - Update DATABASE_URL
   - Configure security groups

3. **Load Balancer**
   - Create Application Load Balancer
   - Configure target groups
   - Set up auto-scaling

### Google Cloud Platform

1. **App Engine**
   ```yaml
   # app.yaml
   runtime: python39
   entrypoint: gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app

   env_variables:
     DATABASE_URL: "your-database-url"
   ```

2. **Deploy**
   ```bash
   gcloud app deploy
   ```

## Monitoring and Logging

### Application Logs

```bash
# View application logs
sudo journalctl -u bookstore -f

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Health Checks

```bash
# Check application health
curl http://localhost:8000/health

# Check service status
sudo systemctl status bookstore
```

### Performance Monitoring

Consider using:
- Prometheus + Grafana
- New Relic
- DataDog
- AWS CloudWatch

## Backup and Recovery

### Database Backup

```bash
# PostgreSQL backup
pg_dump -h localhost -U username -d bookstore > backup.sql

# Restore
psql -h localhost -U username -d bookstore < backup.sql
```

### Application Backup

```bash
# Backup application files
tar -czf bookstore-backup.tar.gz /path/to/book_store_service_python_fastapi_sql

# Backup configuration
cp /etc/systemd/system/bookstore.service /backup/
cp /etc/nginx/sites-available/bookstore /backup/
```

## Security Considerations

1. **Environment Variables**: Never commit secrets to version control
2. **Database Security**: Use strong passwords and limit access
3. **Firewall**: Configure firewall rules
4. **Updates**: Keep system and dependencies updated
5. **SSL**: Always use HTTPS in production
6. **Rate Limiting**: Implement rate limiting for API endpoints

## Troubleshooting

### Common Issues

1. **Service won't start**
   ```bash
   sudo systemctl status bookstore
   sudo journalctl -u bookstore -n 50
   ```

2. **Database connection issues**
   - Check DATABASE_URL
   - Verify database is running
   - Check network connectivity

3. **Nginx errors**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

### Performance Issues

1. **High CPU usage**
   - Check number of workers
   - Monitor database queries
   - Consider caching

2. **Memory issues**
   - Monitor memory usage
   - Optimize database queries
   - Consider connection pooling 