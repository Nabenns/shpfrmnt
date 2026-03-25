# PRD — Shopee Multi-Store Management Dashboard
**Version:** 1.1
**Status:** Draft
**Last Updated:** 2026-03-25

---

## 1. Overview

### 1.1 Problem Statement
Mengelola 10–20 toko Shopee secara manual sangat memakan waktu: balesin chat satu per satu, monitor stok, cek harga kompetitor, proses order, dan manage campaign harus dilakukan terpisah di masing-masing akun Shopee. Tidak ada visibilitas terpusat.

### 1.2 Solution
Web dashboard terpusat yang mengintegrasikan semua toko Shopee via Shopee Open Platform API, dilengkapi AI assistant berbasis Claude API untuk otomasi chat, analisis, dan pengambilan keputusan.

### 1.3 Target User
Pemilik toko (1 user, private dashboard) — akses dari mana saja via browser.

### 1.4 Success Metrics
- Response time customer chat < 30 detik (dari sebelumnya manual)
- Waktu proses order berkurang > 70%
- Zero missed orders
- Stok tidak pernah oversell

---

## 2. Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **UI:** Tailwind CSS + shadcn/ui
- **State:** Zustand
- **Charts:** Recharts
- **Realtime:** Socket.io client

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Queue:** BullMQ + Redis
- **Realtime:** Socket.io
- **Scheduler:** node-cron

### Database
- **Primary:** PostgreSQL (data toko, produk, order, chat history)
- **Cache:** Redis (token store, rate limiting, queue)

### AI & Integrations
- **AI Model:** Claude API (Anthropic) — claude-sonnet-4-6
- **Shopee:** Shopee Open Platform API (OAuth 2.0 per toko)
- **Notifikasi:** Telegram Bot API
- **Email:** Nodemailer (SMTP)

### Infrastructure
- **Server:** VPS (Ubuntu 22.04)
- **Reverse Proxy:** Nginx
- **SSL:** Let's Encrypt (Certbot)
- **Process Manager:** PM2
- **Domain:** Custom domain milik user

### Struktur Repository
```
shopee-dashboard/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Express backend
├── packages/
│   └── shared/       # Types & utilities bersama
├── docker-compose.yml
└── PRD.md
```

---

## 3. Arsitektur Sistem

```
Browser (User)
    │
    ▼
Nginx (Reverse Proxy + SSL)
    ├── /           → Next.js App (port 3000)
    └── /api        → Express API (port 4000)
                        │
              ┌─────────┼──────────┐
              ▼         ▼          ▼
          PostgreSQL  Redis     BullMQ Workers
                                   │
                         ┌─────────┼──────────┐
                         ▼         ▼          ▼
                    Shopee API  Claude API  Telegram
```

### Shopee OAuth Flow (per toko)
1. User klik "Connect Toko" di dashboard
2. Redirect ke halaman auth Shopee
3. Shopee redirect balik dengan `authorization_code`
4. Backend tukar code → `access_token` + `refresh_token`
5. Token disimpan di DB, di-refresh otomatis setiap 4 jam

---

## 4. Modules

---

### MODULE 1 — AI Chat Assistant

**Tujuan:** Auto-reply chat customer 24/7 menggunakan AI

#### Fitur
- Auto-reply berdasarkan knowledge base per toko (FAQ, info produk, kebijakan)
- Deteksi intent:
  - Tanya stok → cek DB, jawab real-time
  - Tanya resi → ambil dari order API
  - Komplain → eskalasi ke manusia
  - Nego harga → AI jawab sesuai rule yang di-set
- Deteksi bahasa otomatis (Indonesia / English)
- Eskalasi: tandai "perlu dibalas manual" + notif Telegram
- History chat tersimpan & bisa dilihat di dashboard

#### Alur Teknis
```
Shopee Webhook (pesan masuk)
    → Queue: chat_incoming
    → Worker: analisis intent dengan Claude
    → Jika bisa dijawab AI → kirim reply via Shopee API
    → Jika perlu eskalasi → notif Telegram + tandai di dashboard
```

#### Knowledge Base
- Per toko, diisi manual oleh user lewat dashboard
- Format: FAQ (pertanyaan → jawaban), info produk, kebijakan toko
- Disimpan di DB, di-inject ke system prompt Claude

#### Database Tables
```sql
chat_sessions (id, shop_id, buyer_id, last_message_at, status, needs_human)
chat_messages (id, session_id, sender, content, intent, ai_handled, created_at)
knowledge_base (id, shop_id, category, question, answer, active)
```

---

### MODULE 2 — Order Management

**Tujuan:** Dashboard terpusat semua order dari semua toko

#### Fitur
- List semua order real-time (sync via webhook + polling fallback)
- Filter: status, toko, tanggal, keyword
- Detail order: info pembeli, produk, status pengiriman
- Bulk action: proses sekaligus banyak order
- Auto-generate label pengiriman (PDF)
- Notifikasi order baru via Telegram
- Export order ke CSV/Excel

#### Status Order
```
UNPAID → READY_TO_SHIP → PROCESSED → SHIPPED → COMPLETED
                                              ↘ CANCELLED / RETURNED
```

#### Database Tables
```sql
orders (id, shop_id, shopee_order_id, status, buyer_name, buyer_phone,
        total_amount, created_at, updated_at)
order_items (id, order_id, product_id, product_name, quantity, price, variation)
order_logistics (id, order_id, tracking_number, courier, status, updated_at)
```

---

### MODULE 3 — Inventory & Product Management

**Tujuan:** Monitor & kelola stok semua produk dari semua toko

#### Fitur
- List produk semua toko dengan stok terkini
- Alert stok menipis (threshold bisa di-set per produk)
- Bulk edit harga & stok
- Auto-sync stok setelah ada penjualan (via webhook)
- History perubahan stok
- Filter: toko, kategori, stok kritis

#### Database Tables
```sql
products (id, shop_id, shopee_item_id, name, category, status, created_at)
product_variants (id, product_id, shopee_model_id, name, price, stock, sku)
stock_alerts (id, product_id, variant_id, threshold, active)
stock_history (id, product_id, variant_id, old_stock, new_stock, reason, created_at)
```

---

### MODULE 4 — Dynamic Pricing

**Tujuan:** Monitor harga kompetitor & auto-adjust harga berdasarkan rule

#### Fitur
- Input URL produk kompetitor untuk dimonitor
- Jadwal pengecekan harga berkala (tiap 6 jam)
- Rule pricing otomatis. Contoh:
  - "Jika kompetitor lebih murah, match harga tapi min. margin 20%"
  - "Jaga harga di antara X dan Y"
  - "Jangan turun di bawah HPP"
- Log setiap perubahan harga + alasannya
- Approval manual sebelum harga diubah (opsional, bisa toggle)

> ⚠️ **Catatan:** Scraping harga kompetitor berada di grey area ToS Shopee.
> Implementasi menggunakan **Scrapling** (github.com/D4Vinci/Scrapling) — Python library
> dengan anti-detection built-in. Jalankan di background worker terpisah dengan rate limit
> konservatif (max 1 req/menit per kompetitor, random delay, rotate user-agent).

#### Database Tables
```sql
pricing_rules (id, shop_id, product_id, rule_type, min_margin, min_price,
               max_price, auto_apply, active)
competitor_products (id, product_id, url, platform, last_price, last_checked_at)
price_history (id, product_id, old_price, new_price, reason, applied_at)
```

---

### MODULE 5 — Analytics & Report

**Tujuan:** Visibilitas performa bisnis secara keseluruhan

#### Fitur
- Revenue harian / mingguan / bulanan (per toko & total)
- Produk terlaris (by revenue & by volume)
- Conversion rate chat → order
- Average response time chat
- Customer satisfaction (berdasarkan rating)
- Tren stok menipis
- Export laporan PDF / Excel

#### Dashboard Widgets
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ Total Rev   │ Total Order │ Avg Rating  │ Chat Respon │
│ Hari ini    │ Hari ini    │ Semua Toko  │ Time        │
└─────────────┴─────────────┴─────────────┴─────────────┘
┌───────────────────────────┬─────────────────────────────┐
│ Grafik Revenue 30 hari    │ Top 10 Produk Terlaris      │
│                           │                             │
└───────────────────────────┴─────────────────────────────┘
┌───────────────────────────┬─────────────────────────────┐
│ Order by Status           │ Stok Kritis (perlu restock) │
│                           │                             │
└───────────────────────────┴─────────────────────────────┘
```

#### Database Tables
```sql
daily_snapshots (id, shop_id, date, revenue, order_count,
                 avg_rating, chat_count, ai_handled_count)
```

---

### MODULE 6 — Promotion Manager

**Tujuan:** Kelola & jadwalkan promosi toko

#### Fitur
- List semua campaign aktif & akan datang per toko
- Jadwal flash sale otomatis (set via dashboard, eksekusi via API)
- Kelola voucher toko
- Reminder H-1 sebelum promo habis (via Telegram)
- Histori campaign + performa (berapa order yang masuk selama promo)

#### Database Tables
```sql
promotions (id, shop_id, shopee_promo_id, type, name,
            start_time, end_time, status, created_at)
vouchers (id, shop_id, shopee_voucher_id, code, discount_type,
          discount_value, usage_count, max_usage, valid_until)
```

---

### MODULE 7 — Review Manager

**Tujuan:** Monitor & respon review/rating dari semua toko

#### Fitur
- List semua review masuk (semua toko, real-time)
- Filter: rating (1–5 bintang), toko, produk, belum dibalas
- Alert Telegram untuk review bintang 1 atau 2
- Auto-reply review menggunakan template AI
- Template reply bisa di-kustomisasi per toko
- Statistik rating keseluruhan

#### Database Tables
```sql
reviews (id, shop_id, shopee_review_id, order_id, product_id,
         rating, comment, replied, reply_content, created_at)
review_templates (id, shop_id, rating_range, template, active)
```

---

## 5. Authentication & Security

- **Login:** Single user, username + password (bcrypt hash)
- **Session:** JWT (access token 15 menit + refresh token 7 hari)
- **HTTPS:** Wajib via Let's Encrypt
- **Rate Limiting:** 100 req/menit per IP
- **Shopee Token:** Disimpan terenkripsi di DB (AES-256)
- **Environment Variables:** Semua secret di `.env`, tidak di-commit ke git

---

## 6. Notifikasi

| Event | Channel |
|-------|---------|
| Order baru masuk | Telegram |
| Stok kritis | Telegram |
| Review bintang 1-2 | Telegram |
| Chat perlu eskalasi | Telegram |
| Promo akan habis (H-1) | Telegram |
| Error sistem | Telegram |

---

## 7. Shopee API Endpoints yang Digunakan

| Module | Endpoint |
|--------|----------|
| Auth | `auth/token/get`, `auth/access_token/get` |
| Order | `order/get_order_list`, `order/get_order_detail`, `logistics/init_shipment` |
| Product | `product/get_item_list`, `product/update_stock`, `product/update_price` |
| Chat | `message/get_conversation_list`, `message/send_message` |
| Promo | `discount/get_discount_list`, `voucher/get_voucher_list` |
| Review | `product/get_rating_list`, `product/reply_rating` |
| Logistics | `logistics/get_tracking_number` |
| Shop | `shop/get_shop_info`, `shop/get_shop_performance` |

---

## 8. Development Phases

### Phase 1 — Foundation (Minggu 1–4)
- [ ] Setup monorepo + boilerplate Next.js & Express
- [ ] Setup PostgreSQL + Redis + Docker Compose
- [ ] Shopee OAuth: connect & simpan token semua toko
- [ ] Module 2: Order Management (MVP)
- [ ] Module 3: Inventory sync (MVP)
- [ ] Deploy ke VPS + domain + SSL

### Phase 2 — AI Layer (Minggu 5–8)
- [ ] Module 1: AI Chat Assistant
- [ ] Module 7: Review Manager
- [ ] Notifikasi Telegram
- [ ] Polling & Webhook handler

### Phase 3 — Intelligence (Minggu 9–14)
- [ ] Module 5: Analytics & Report
- [ ] Module 6: Promotion Manager
- [ ] Module 4: Dynamic Pricing
- [ ] Performance optimization & monitoring

---

## 9. Out of Scope (v1.0)
- Mobile app
- Multi-user / team collaboration
- Support marketplace lain (Tokopedia, Lazada, dll)
- Live chat dengan buyer langsung dari dashboard (hanya auto-reply)
- Integrasi akuntansi / ERP

---

## 10. Decisions Log

| # | Pertanyaan | Keputusan |
|---|-----------|-----------|
| 1 | Dynamic pricing: scraping atau manual? | **Scraping** menggunakan library Scrapling (Python), dijalankan di worker terpisah |
| 2 | Threshold stok kritis: per produk atau global? | **Per produk**, bisa di-set individual dari halaman inventory |
| 3 | VPS provider? | **Sudah punya VPS** — tinggal deploy |
| 4 | Shopee API belum approved — bagaimana? | **Build dengan mock data** dulu, swap ke real API saat sudah approved |

## 11. Open Questions
- [ ] OS VPS apa? (Ubuntu 22.04 direkomendasikan)
- [ ] Python tersedia di VPS untuk worker Scrapling?
