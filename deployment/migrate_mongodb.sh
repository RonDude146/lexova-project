#!/bin/bash

# Lexova Platform - MongoDB Migration Script
# This script migrates MongoDB data from a local or free-tier instance to a managed cloud instance

set -e

# Configuration
SOURCE_MONGO_URI="mongodb://localhost:27017/lexova_db"
TARGET_MONGO_URI=""  # To be provided by user
BACKUP_DIR="/tmp/lexova_db_backup"
COLLECTIONS=("users" "lawyers" "clients" "cases" "reviews" "payments" "cms_content" "settings")

# Check if MongoDB tools are installed
if ! command -v mongodump &> /dev/null || ! command -v mongorestore &> /dev/null; then
    echo "MongoDB tools are not installed. Installing..."
    sudo apt-get update
    sudo apt-get install -y mongodb-org-tools
fi

# Create backup directory
echo "Creating backup directory..."
mkdir -p "$BACKUP_DIR"

# Get target MongoDB URI if not provided
if [ -z "$TARGET_MONGO_URI" ]; then
    read -p "Enter target MongoDB URI (e.g., mongodb+srv://username:password@cluster.mongodb.net/lexova_db): " TARGET_MONGO_URI
fi

# Validate MongoDB URIs
echo "Validating MongoDB URIs..."
if ! mongosh "$SOURCE_MONGO_URI" --eval "db.adminCommand('ping')" > /dev/null; then
    echo "Error: Could not connect to source MongoDB instance."
    exit 1
fi

if ! mongosh "$TARGET_MONGO_URI" --eval "db.adminCommand('ping')" > /dev/null; then
    echo "Error: Could not connect to target MongoDB instance."
    exit 1
fi

# Extract database names from URIs
SOURCE_DB=$(echo "$SOURCE_MONGO_URI" | sed -n 's/.*\/\([^?]*\).*/\1/p')
TARGET_DB=$(echo "$TARGET_MONGO_URI" | sed -n 's/.*\/\([^?]*\).*/\1/p')

echo "Source database: $SOURCE_DB"
echo "Target database: $TARGET_DB"

# Backup source database
echo "Backing up source database..."
mongodump --uri="$SOURCE_MONGO_URI" --out="$BACKUP_DIR"

# Count documents in source database
echo "Counting documents in source database..."
for collection in "${COLLECTIONS[@]}"; do
    COUNT=$(mongosh "$SOURCE_MONGO_URI" --quiet --eval "db.$collection.countDocuments({})")
    echo "Collection $collection: $COUNT documents"
done

# Restore to target database
echo "Restoring to target database..."
mongorestore --uri="$TARGET_MONGO_URI" --nsFrom="$SOURCE_DB.*" --nsTo="$TARGET_DB.*" "$BACKUP_DIR/$SOURCE_DB"

# Verify restoration
echo "Verifying restoration..."
for collection in "${COLLECTIONS[@]}"; do
    SOURCE_COUNT=$(mongosh "$SOURCE_MONGO_URI" --quiet --eval "db.$collection.countDocuments({})")
    TARGET_COUNT=$(mongosh "$TARGET_MONGO_URI" --quiet --eval "db.$collection.countDocuments({})")
    
    echo "Collection $collection: Source=$SOURCE_COUNT, Target=$TARGET_COUNT"
    
    if [ "$SOURCE_COUNT" -ne "$TARGET_COUNT" ]; then
        echo "Warning: Document count mismatch for collection $collection"
    fi
done

# Create indexes in target database
echo "Creating indexes in target database..."
mongosh "$TARGET_MONGO_URI" --eval '
    db.users.createIndex({ "email": 1 }, { unique: true });
    db.users.createIndex({ "role": 1 });
    
    db.lawyers.createIndex({ "user_id": 1 }, { unique: true });
    db.lawyers.createIndex({ "specializations": 1 });
    db.lawyers.createIndex({ "location": 1 });
    db.lawyers.createIndex({ "rating": 1 });
    
    db.clients.createIndex({ "user_id": 1 }, { unique: true });
    
    db.cases.createIndex({ "client_id": 1 });
    db.cases.createIndex({ "lawyer_id": 1 });
    db.cases.createIndex({ "status": 1 });
    db.cases.createIndex({ "created_at": 1 });
    
    db.reviews.createIndex({ "lawyer_id": 1 });
    db.reviews.createIndex({ "client_id": 1 });
    db.reviews.createIndex({ "case_id": 1 }, { unique: true });
    
    db.payments.createIndex({ "client_id": 1 });
    db.payments.createIndex({ "lawyer_id": 1 });
    db.payments.createIndex({ "case_id": 1 });
    db.payments.createIndex({ "status": 1 });
    db.payments.createIndex({ "created_at": 1 });
    
    db.cms_content.createIndex({ "slug": 1 }, { unique: true });
    db.cms_content.createIndex({ "type": 1 });
'

echo "Migration completed successfully!"
echo "Source database: $SOURCE_MONGO_URI"
echo "Target database: $TARGET_MONGO_URI"

# Clean up
echo "Cleaning up..."
rm -rf "$BACKUP_DIR"

exit 0

