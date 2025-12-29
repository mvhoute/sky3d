#!/bin/bash

# Sky3D Database Backup Script
# This script backs up the PostgreSQL database and uploads folder

# Configuration
BACKUP_DIR="/var/backups/sky3d"
DB_NAME="sky3d"
DB_USER="sky3duser"
UPLOADS_DIR="/var/www/sky3d/backend/public/uploads"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Backup database
echo "Backing up database..."
pg_dump -U $DB_USER $DB_NAME | gzip > "$BACKUP_DIR/db_backup_$TIMESTAMP.sql.gz"

# Backup uploads folder
echo "Backing up uploads..."
tar -czf "$BACKUP_DIR/uploads_backup_$TIMESTAMP.tar.gz" -C "$(dirname $UPLOADS_DIR)" "$(basename $UPLOADS_DIR)"

# Remove old backups (older than RETENTION_DAYS)
echo "Cleaning up old backups..."
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
find $BACKUP_DIR -name "uploads_backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup completed successfully!"
echo "Database backup: $BACKUP_DIR/db_backup_$TIMESTAMP.sql.gz"
echo "Uploads backup: $BACKUP_DIR/uploads_backup_$TIMESTAMP.tar.gz"

# Optional: Send backup to remote location
# rsync -avz $BACKUP_DIR/ user@remote-server:/backups/sky3d/

