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
for var in DATABASE_NAME DATABASE_USERNAME DATABASE_HOST \
           REMOTE_DATABASE_NAME REMOTE_DATABASE_USERNAME REMOTE_DATABASE_PASSWORD REMOTE_DATABASE_HOST; do
  if [ -z "${!var}" ]; then
    echo "❌ Missing variable: $var"
    exit 1
  fi
done

# --- Config ---
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DUMP_FILE="dump_${DATABASE_NAME}_${TIMESTAMP}.sql"
MYSQL="/opt/homebrew/opt/mysql-client@8.0/bin/mysql"
# MYSQLDUMP="/opt/homebrew/opt/mysql-client@8.0/bin/mysqldump"
MYSQLDUMP="mysqldump"
echo "🔹 Dumping local database: $DATABASE_NAME ..."
$MYSQLDUMP -h "$DATABASE_HOST" -u "$DATABASE_USERNAME" -p"$DATABASE_PASSWORD" \
  --add-drop-table \
  --add-locks \
  --disable-keys \
  --single-transaction \
  --quick \
  --routines \
  --triggers \
  --events \
  --no-tablespaces \
  --set-gtid-purged=OFF \
  "$DATABASE_NAME" > "$DUMP_FILE"

echo "🔹 Cleaning collation for MySQL 5.x compatibility ..."
# Remove problematic MySQL 8 collation (utf8mb4_0900_ai_ci)
sed -i '' 's/COLLATE=utf8mb4_0900_ai_ci//g' "$DUMP_FILE"

echo "🔹 Testing remote connection ..."
$MYSQL -h "$REMOTE_DATABASE_HOST" -u "$REMOTE_DATABASE_USERNAME" -p"$REMOTE_DATABASE_PASSWORD" \
  --ssl-mode=DISABLED -e "SELECT NOW();" "$REMOTE_DATABASE_NAME" || {
  echo "❌ Cannot connect to remote DB. Check firewall / credentials."
  exit 1
}

echo "🔹 Cleaning remote database before import (disabling foreign key checks)..."
$MYSQL -h "$REMOTE_DATABASE_HOST" \
      -u "$REMOTE_DATABASE_USERNAME" \
      -p"$REMOTE_DATABASE_PASSWORD" \
      --ssl-mode=DISABLED \
      --verbose \
      --batch --skip-column-names -e "
      SET FOREIGN_KEY_CHECKS=0;
      SET GROUP_CONCAT_MAX_LEN=32768;
      SET @tables = (
        SELECT GROUP_CONCAT(CONCAT('\`', table_name, '\`'))
        FROM information_schema.tables
        WHERE table_schema = '${REMOTE_DATABASE_NAME}'
      );
      SET @drop_stmt = IFNULL(CONCAT('DROP TABLE IF EXISTS ', @tables), NULL);
      PREPARE stmt FROM @drop_stmt;
      EXECUTE stmt;
      DEALLOCATE PREPARE stmt;
      SET FOREIGN_KEY_CHECKS=1;
" "$REMOTE_DATABASE_NAME"
echo "🔹 Importing into remote database: $REMOTE_DATABASE_NAME ..."
# Add --ssl-mode=DISABLED if SSL is false
SSL_MODE="--ssl-mode=DISABLED"
if [ "$REMOTE_DATABASE_SSL" = "true" ]; then
  SSL_MODE=""
fi
# Import
pv "$DUMP_FILE" | $MYSQL \
  --default-auth=mysql_native_password \
  -h "$REMOTE_DATABASE_HOST" -u "$REMOTE_DATABASE_USERNAME" -p"$REMOTE_DATABASE_PASSWORD" \
  --ssl-mode=DISABLED \
  --compress \
  --quick \
  --force \
  --max_allowed_packet=512M \
  --verbose \
  "$REMOTE_DATABASE_NAME" < "$DUMP_FILE"
echo "✅ Sync complete!"
echo "📄 Dump file: $(realpath "$DUMP_FILE")"

# remove dump file after import
rm "$DUMP_FILE"
