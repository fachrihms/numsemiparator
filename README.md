# Num Separator

Dashboard utilitas untuk memproses nomor PO (purchase order) dan bikin template pesan, dengan navigasi sidebar (bukan scroll panjang). Semua jalan di browser (statis, tanpa backend), cocok di-host di GitHub Pages.

## Fitur

1. **Format titik koma** — tempel angka (satu per baris, atau dipisah spasi/koma), hasil otomatis digabung jadi `angka;angka;angka`.
2. **Format kutip koma (quoted)** — hasil otomatis jadi `'angka', 'angka', 'angka'`.
3. **Bandingkan dua daftar** — tempel *Listed PO via Ticket* dan *Actual PO (PO sudah ada di DB)*, lalu otomatis dipisah jadi:
   - PO sudah ada di DB (match di kedua daftar)
   - Belum ada di DB, cuma ada di tiket
   - Ada di DB tapi tidak ada di tiket
4. **Template pesan** — ketik isi/resolvean saja, pembuka (default "Yth Bapak/Ibu", bisa diedit) dan penutup (pilih salah satu dari 3 tombol: "Atas perhatian & kerja sama", "Demikian kami sampaikan", "Terima kasih") otomatis ditempel jadi satu pesan lengkap.

Semua bagian punya tombol **Copy to clipboard** sendiri-sendiri, dan bagian input angka juga ada badge penanda jumlah angka yang terbaca.

## Cara deploy ke GitHub Pages

1. Buat repository baru di GitHub (misalnya `po-tools`).
2. Upload 3 file ini ke repo: `index.html`, `style.css`, `script.js`.
   - Bisa lewat web: klik **Add file > Upload files** di halaman repo, lalu drag ketiga file.
   - Atau lewat terminal:
     ```
     git init
     git add index.html style.css script.js README.md
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/USERNAME/po-tools.git
     git push -u origin main
     ```
3. Di repo, buka **Settings > Pages**.
4. Di bagian **Build and deployment**, pilih Source: **Deploy from a branch**.
5. Pilih Branch: **main**, folder: **/ (root)**, lalu klik **Save**.
6. Tunggu 1-2 menit, website akan tersedia di:
   ```
   https://USERNAME.github.io/po-tools/
   ```

## Update selanjutnya

Kalau mau update fitur, cukup replace file `index.html`, `style.css`, dan/atau `script.js` di repo yang sama — GitHub Pages otomatis re-deploy tiap ada perubahan di branch `main`.
