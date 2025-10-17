#!/bin/bash
set -e

# --- Load environment variables ---
ENV_FILE="$(dirname "$0")/../.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ .env file not found at $ENV_FILE"
  exit 1
fi

export $(grep -v '^#' "$ENV_FILE" | xargs)

# --- Verify required vars ---
for var in DATABASE_NAME DATABASE_USERNAME DATABASE_HOST \
           REMOTE_DATABASE_NAME REMOTE_DATABASE_USERNAME REMOTE_DATABASE_PASSWORD REMOTE_DATABASE_HOST; do
  if [ -z "${!var}" ]; then
    echo "❌ Missing variable: $var"
    exit 1
  fi
done

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
MYSQL_DUMP="dump_${DATABASE_NAME}_${TIMESTAMP}.sql"

PG_URI="postgresql://${REMOTE_DATABASE_USERNAME}:${REMOTE_DATABASE_PASSWORD}@${REMOTE_DATABASE_HOST}:${REMOTE_DATABASE_PORT}/${REMOTE_DATABASE_NAME}?sslmode=require"

echo "🔹 Dumping MySQL database: ${DATABASE_NAME} ..."
mysqldump --no-tablespaces --skip-lock-tables --extended-insert=FALSE \
  --default-character-set=utf8mb4 "$DATABASE_NAME" > "$MYSQL_DUMP"

# Replace unsupported collations if needed
sed -i '' 's/COLLATE=utf8mb4_0900_ai_ci//g' "$MYSQL_DUMP"

# --- Create temporary pgloader command file ---
PGLOADER_CMD="pgloader_${TIMESTAMP}.load"

cat <<EOF > "$PGLOADER_CMD"
LOAD DATABASE
     FROM mysql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}
     INTO $PG_URI
 WITH include no drop, create tables, create indexes, reset sequences,
      data only,
      on error stop
 SET work_mem to '128MB',
     maintenance_work_mem to '512 MB';
EOF

echo "🔹 Importing dump into PostgreSQL via pgloader (file mode)..."
pgloader "$PGLOADER_CMD"

echo "✅ Sync complete!"
rm "$MYSQL_DUMP" "$PGLOADER_CMD"
