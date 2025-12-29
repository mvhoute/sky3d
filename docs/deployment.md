# Deployment Guide - Raspberry Pi 5

This guide will walk you through deploying the Sky3D website on a Raspberry Pi 5 with nginx proxy manager.

## Prerequisites

- Raspberry Pi 5 with Raspberry Pi OS installed
- nginx proxy manager already installed and configured
- SSH access to your Raspberry Pi
- Domain name pointed to your Raspberry Pi's IP address

## Step 1: Install Node.js

```bash
# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should be v18.x.x
npm --version
```

## Step 2: Install PostgreSQL

```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE sky3d;
CREATE USER sky3duser WITH ENCRYPTED PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE sky3d TO sky3duser;
\q
```

## Step 3: Install PM2 Process Manager

```bash
sudo npm install -g pm2

# Setup PM2 to start on boot
pm2 startup
# Run the command that PM2 outputs
```

## Step 4: Clone and Setup Project

```bash
# Create application directory
sudo mkdir -p /var/www/sky3d
sudo chown -R $USER:$USER /var/www/sky3d

# Clone your repository (or upload files)
cd /var/www/sky3d
# git clone <your-repo> .
# Or use scp/rsync to upload files

# Setup backend
cd /var/www/sky3d/backend

# Create production .env file
cat > .env << 'EOF'
HOST=0.0.0.0
PORT=1337
APP_KEYS=generate-random-key-here-1,generate-random-key-here-2
API_TOKEN_SALT=generate-random-salt-here
ADMIN_JWT_SECRET=generate-random-secret-here
TRANSFER_TOKEN_SALT=generate-random-salt-here
JWT_SECRET=generate-random-secret-here

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=sky3d
DATABASE_USERNAME=sky3duser
DATABASE_PASSWORD=your-secure-password
DATABASE_SSL=false

NODE_ENV=production
EOF

# Generate secure keys (run these and update .env)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Install dependencies
npm install --production

# Build Strapi
NODE_ENV=production npm run build

# Setup frontend
cd /var/www/sky3d/frontend

# Create production .env
echo "VITE_API_URL=https://api.yourdomain.com" > .env

# Install dependencies and build
npm install
npm run build
```

## Step 5: Start Backend with PM2

```bash
cd /var/www/sky3d/backend

# Start Strapi with PM2
pm2 start npm --name "sky3d-backend" -- start

# Save PM2 configuration
pm2 save

# Check status
pm2 status
pm2 logs sky3d-backend
```

## Step 6: Setup nginx for Frontend

```bash
# Install nginx (if not already installed)
sudo apt-get install -y nginx

# Create nginx configuration for frontend
sudo nano /etc/nginx/sites-available/sky3d-frontend

# Add this configuration:
```

```nginx
server {
    listen 3000;
    server_name localhost;

    root /var/www/sky3d/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/sky3d-frontend /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## Step 7: Configure nginx Proxy Manager

Access your nginx proxy manager admin panel (usually at `http://your-pi-ip:81`)

### Proxy Host 1: Frontend
1. Click "Proxy Hosts" → "Add Proxy Host"
2. **Details Tab:**
   - Domain Names: `yourdomain.com`, `www.yourdomain.com`
   - Scheme: `http`
   - Forward Hostname/IP: `localhost`
   - Forward Port: `3000`
   - Cache Assets: ✓
   - Block Common Exploits: ✓
   - Websockets Support: ✓

3. **SSL Tab:**
   - SSL Certificate: Request a new SSL Certificate (Let's Encrypt)
   - Force SSL: ✓
   - HTTP/2 Support: ✓
   - HSTS Enabled: ✓

### Proxy Host 2: Backend API
1. Add another Proxy Host
2. **Details Tab:**
   - Domain Names: `api.yourdomain.com`
   - Scheme: `http`
   - Forward Hostname/IP: `localhost`
   - Forward Port: `1337`
   - Block Common Exploits: ✓
   - Websockets Support: ✓

3. **SSL Tab:**
   - SSL Certificate: Request a new SSL Certificate
   - Force SSL: ✓
   - HTTP/2 Support: ✓

## Step 8: Configure Firewall

```bash
# Allow HTTP, HTTPS, and SSH
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Block direct access to application ports (optional)
sudo ufw deny 1337/tcp
sudo ufw deny 3000/tcp

# Enable firewall
sudo ufw enable
sudo ufw status
```

## Step 9: Setup Strapi Admin

1. Navigate to `https://api.yourdomain.com/admin`
2. Create your admin account
3. Go to Content-Type Builder and create:
   - **Product** content type (title, description, price, featured, inStock, images)
   - **Order** content type (customerName, customerEmail, customerPhone, customerMessage, product, status)
4. Go to Settings → Users & Permissions → Roles → Public
5. Enable permissions:
   - Product: `find`, `findOne`
   - Order: `create`
6. Add your first products!

## Step 10: Verify Deployment

1. Visit `https://yourdomain.com` - Should see the frontend
2. Visit `https://api.yourdomain.com/admin` - Should see Strapi admin
3. Test creating a product in Strapi admin
4. Verify product appears on the frontend

## Maintenance Commands

### View Logs
```bash
# Backend logs
pm2 logs sky3d-backend

# nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Restart Services
```bash
# Restart backend
pm2 restart sky3d-backend

# Restart nginx
sudo systemctl restart nginx
```

### Update Application
```bash
# Backend
cd /var/www/sky3d/backend
git pull  # or upload new files
npm install --production
NODE_ENV=production npm run build
pm2 restart sky3d-backend

# Frontend
cd /var/www/sky3d/frontend
git pull  # or upload new files
npm install
npm run build
# nginx will automatically serve new files
```

### Database Backup
```bash
# Create backup script (see scripts/backup.sh)
# Run manually:
pg_dump -U sky3duser sky3d > backup-$(date +%Y%m%d).sql

# Setup automated backups with cron:
crontab -e
# Add: 0 2 * * * /var/www/sky3d/scripts/backup.sh
```

## Performance Tuning for Raspberry Pi 5

### Optimize PM2
```bash
# Use cluster mode for better performance
pm2 delete sky3d-backend
pm2 start npm --name "sky3d-backend" -i 2 -- start
pm2 save
```

### Optimize PostgreSQL
Edit `/etc/postgresql/*/main/postgresql.conf`:
```
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
```

```bash
sudo systemctl restart postgresql
```

## Troubleshooting

### Backend won't start
```bash
pm2 logs sky3d-backend
# Check for database connection issues
# Verify .env configuration
```

### Frontend shows blank page
```bash
# Check if build was successful
ls -la /var/www/sky3d/frontend/dist/

# Check nginx logs
sudo tail -f /var/log/nginx/error.log

# Verify nginx is serving correct directory
sudo nginx -t
```

### Database connection errors
```bash
# Test PostgreSQL connection
psql -U sky3duser -d sky3d -h localhost

# Check PostgreSQL is running
sudo systemctl status postgresql
```

### SSL Certificate issues
- Ensure ports 80 and 443 are open
- Verify domain DNS is pointing to your Pi
- Check nginx proxy manager logs

## Security Best Practices

1. **Change default passwords** - Update all default credentials
2. **Keep system updated** - `sudo apt-get update && sudo apt-get upgrade`
3. **Enable automatic security updates**
4. **Use strong admin password** for Strapi
5. **Regular backups** - Automate database and uploads backups
6. **Monitor logs** - Regularly check for suspicious activity
7. **Rate limiting** - Configure in nginx proxy manager
8. **Disable root SSH** - Use sudo user instead

## Monitoring

```bash
# System resources
htop

# PM2 monitoring
pm2 monit

# Disk space
df -h

# Database size
sudo -u postgres psql -c "SELECT pg_size_pretty(pg_database_size('sky3d'));"
```

## Support

If you encounter issues:
1. Check logs: `pm2 logs`, nginx logs
2. Verify all services are running
3. Check firewall rules
4. Ensure DNS is properly configured

For more help, refer to:
- [Strapi Documentation](https://docs.strapi.io)
- [nginx Documentation](https://nginx.org/en/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)

