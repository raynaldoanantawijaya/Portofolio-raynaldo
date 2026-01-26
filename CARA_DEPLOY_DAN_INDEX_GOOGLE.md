# Panduan Deployment ke Vercel & Indexing Google

Panduan ini akan membantu Anda mengonlinekan portofolio Anda menggunakan Vercel dan memastikannya muncul di Google.

## 1. Persiapan GitHub
Pastikan kode terbaru sudah di-push ke GitHub repository Anda.
Jika belum:
```bash
git add .
git commit -m "Siap deploy ke Vercel dengan Optimasi SEO"
git push origin main
```

## 2. Deploy ke Vercel
1.  Buka [Vercel Dashboard](https://vercel.com/dashboard).
2.  Klik **"Add New..."** -> **"Project"**.
3.  Pilih repository `Portofolio-raynaldo` (atau nama repo baru Anda).
4.  Di bagian **Build & Development Settings**, Vercel biasanya otomatis mendeteksi **Astro**.
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
    *   **Install Command**: `npm install`
5.  Klik **Deploy**. Tunggu hingga selesai (hijau).

## 3. Menghubungkan Domain
1.  Setelah deploy sukses, masuk ke **Settings** -> **Domains**.
2.  Masukkan domain Anda: `raynaldoanantawijaya.my.id`.
3.  Vercel akan memberikan petunjuk DNS (biasanya CNAME atau A Record). Ikuti petunjuk tersebut di panel domain provider Anda (e.g., di mana Anda beli domain).
4.  Tunggu hingga status domain menjadi **Valid** (bisa memakan waktu 1-24 jam propagasi DNS).

## 4. Google Search Console (Agar Muncul di Google)
Ini langkah paling penting untuk indexing.

1.  Buka [Google Search Console](https://search.google.com/search-console).
2.  Klik **Start Now** dan Login akun Google.
3.  **Add Property**. Pilih tipe **Domain** (rekomendasi) atau **URL prefix**.
    *   **Tipe Domain**: Masukkan `raynaldoanantawijaya.my.id`. Google akan meminta Anda menambah TXT Record di DNS domain Anda (sama seperti saat connect ke Vercel). Ini cara paling kuat.
    *   **Tipe URL Prefix**: Masukkan `https://raynaldoanantawijaya.my.id`. Anda bisa verifikasi dengan cara "HTML Tag". Vercel support ini, tapi cara DNS lebih baik.
4.  Setelah terverifikasi, masuk ke menu **Sitemaps** di sidebar kiri.
5.  Di kolom "Add a new sitemap", ketik: `sitemap-index.xml`.
6.  Klik **Submit**.
    *   Status harus **"Success"**. Jika error, tunggu 1-2 hari setelah deploy agar Google bisa akses.

## 5. Tips Tambahan
*   **Update Konten**: Google suka konten yang sering update.
*   **Share ke Sosmed**: Bagikan link portfolio Anda di LinkedIn, Instagram, dll. Traffic dari sosmed membantu Google "memperhatikan" website baru.
*   **Cek Berkala**: Login ke Google Search Console seminggu sekali untuk melihat performa kata kunci ("raynaldo", "robotik", dll) yang orang ketik untuk menemukan Anda.
