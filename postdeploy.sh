#!/bin/bash
# postdeploy.sh

# Jalankan migrate & seed tanpa menghentikan deployment
echo "Menjalankan migration..."
npx prisma migrate deploy || echo "Migration gagal, lanjut deployment"

echo "Menjalankan seed..."
npm run seed || echo "Seeding gagal, lanjut deployment"
