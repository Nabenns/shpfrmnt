# Setup Guide

## 1. Local Development

### Prerequisites
- Node.js >= 20
- Docker + Docker Compose
- Python 3.12 (untuk scraper, opsional di awal)

### Steps

```bash
# 1. Clone & masuk folder
cd shopee-dashboard

# 2. Copy env file dan isi nilainya
cp .env.example .env

# 3. Start PostgreSQL + Redis (Docker)
docker compose -f docker-compose.dev.yml up -d

# 4. Install dependencies
npm install

# 5. Jalankan migration database
npm run db:migrate

# 6. Jalankan dev server (API + Web bersamaan)
npm run dev
```

Dashboard buka di: http://localhost:3000
API buka di: http://localhost:4000/api/health

---

## 2. Production (VPS Ubuntu)

### Prerequisites di VPS
```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Nginx
sudo apt install nginx certbot python3-certbot-nginx -y
```

### Deploy Steps

```bash
# 1. Upload code ke VPS
git clone <repo-url> /opt/shopee-dashboard
cd /opt/shopee-dashboard

# 2. Isi .env
cp .env.example .env
nano .env  # isi semua nilai

# 3. Build & start semua service
docker compose up -d --build

# 4. Jalankan migration
docker compose exec api node dist/db/migrate.js

# 5. Setup Nginx
sudo cp nginx.conf /etc/nginx/sites-available/shopee-dashboard
sudo ln -s /etc/nginx/sites-available/shopee-dashboard /etc/nginx/sites-enabled/
# Edit nginx.conf: ganti yourdomain.com dengan domain kamu
sudo nano /etc/nginx/sites-available/shopee-dashboard
sudo nginx -t && sudo systemctl reload nginx

# 6. SSL dengan Let's Encrypt
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 3. Struktur Folder

```
shopee-dashboard/
├── apps/
│   ├── web/              ← Next.js 14 (frontend dashboard)
│   └── api/              ← Express.js (backend REST API)
│       └── src/
│           ├── config/   ← Environment config + validation
│           ├── db/       ← PostgreSQL + migrations
│           ├── redis/    ← Redis client
│           ├── routes/   ← API routes (per module)
│           └── middleware/
├── packages/
│   └── shared/           ← TypeScript types bersama
├── workers/
│   └── scraper/          ← Python + Scrapling (pricing)
├── docker-compose.yml    ← Production (semua service)
├── docker-compose.dev.yml ← Development (DB & Redis saja)
├── nginx.conf            ← Nginx reverse proxy config
└── PRD.md               ← Product Requirements Document
```

---

## 4. Environment Variables Penting

| Variable | Keterangan |
|----------|-----------|
| `DATABASE_URL` | Connection string PostgreSQL |
| `REDIS_URL` | Connection string Redis |
| `JWT_SECRET` | Secret untuk signing JWT (min 32 char) |
| `ANTHROPIC_API_KEY` | API key Claude (dari console.anthropic.com) |
| `SHOPEE_PARTNER_ID` | Dari Shopee Open Platform (nanti) |
| `SHOPEE_PARTNER_KEY` | Dari Shopee Open Platform (nanti) |
| `TELEGRAM_BOT_TOKEN` | Dari @BotFather di Telegram |
| `ADMIN_PASSWORD` | Password login dashboard |
