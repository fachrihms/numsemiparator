# Gabung Angka jadi Satu Baris

Website sederhana: tempel angka (satu per baris, atau dipisah spasi/koma), hasilnya otomatis digabung jadi satu baris dipisah titik koma (`;`), lalu bisa langsung disalin dengan tombol **Copy to clipboard**.

## Cara deploy ke GitHub Pages

1. Buat repository baru di GitHub (misalnya `gabung-angka`).
2. Upload 3 file ini ke repo: `index.html`, `style.css`, `script.js`.
   - Bisa lewat web: klik **Add file > Upload files** di halaman repo, lalu drag ketiga file.
   - Atau lewat terminal:
     ```
     git init
     git add index.html style.css script.js README.md
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/USERNAME/gabung-angka.git
     git push -u origin main
     ```
3. Di repo, buka **Settings > Pages**.
4. Di bagian **Build and deployment**, pilih Source: **Deploy from a branch**.
5. Pilih Branch: **main**, folder: **/ (root)**, lalu klik **Save**.
6. Tunggu 1-2 menit, website akan tersedia di:
   ```
   https://USERNAME.github.io/gabung-angka/
   ```

Selesai — tinggal buka link tersebut kapan saja.
