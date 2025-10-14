#!/bin/bash
set -e

# --- Load environment variables from ../.env ---
ENV_FILE="$(dirname "$0")/../.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ .env file not found at $ENV_FILE"
  exit 1
fi

# Export all non-commented vars
export $(grep -v '^#' "$ENV_FILE" | xargs)

# --- Verify required variables ---
for var in DATABASE_NAME DATABASE_USERNAME DATABASE_PASSWORD DATABASE_HOST \
           REMOTE_DATABASE_NAME REMOTE_DATABASE_USERNAME REMOTE_DATABASE_PASSWORD REMOTE_DATABASE_HOST; do
  if [ -z "${!var}" ]; then
    echo "❌ Missing variable: $var"
    exit 1
  fi
done

# --- Config ---
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DUMP_FILE="dump_${DATABASE_NAME}_${TIMESTAMP}.sql"

echo "🔹 Dumping local database: $DATABASE_NAME ..."
mysqldump -h "$DATABASE_HOST" -u "$DATABASE_USERNAME" -p"$DATABASE_PASSWORD" \
  --single-transaction --quick --lock-tables=false "$DATABASE_NAME" > "$DUMP_FILE"

echo "🔹 Importing into remote database: $REMOTE_DATABASE_NAME ..."
mysql -h "$REMOTE_DATABASE_HOST" -u "$REMOTE_DATABASE_USERNAME" -p"$REMOTE_DATABASE_PASSWORD" \
  "$REMOTE_DATABASE_NAME" < "$DUMP_FILE"

echo "✅ Sync complete!"
echo "📄 Dump file: $(realpath "$DUMP_FILE")"

# remove dump file after import
rm "$DUMP_FILE"
