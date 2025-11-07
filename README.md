# Kuesioner UTS – Strategi Kewirausahaan Global (GIMB)

Versi **GitHub Pages-ready** dengan 4 file:
- `index.html` – struktur form
- `style.css` – tampilan/tema
- `script.js` – logika (autosave, unduh JSON, cetak, reset)
- `README.md` – panduan

## Fitur
- Mobile-friendly, tema biru gradient
- Auto-save ke `localStorage`
- Tombol **Unduh JSON** (ekspor jawaban)
- Tombol **Cetak / Simpan PDF**
- Tanpa build tools (murni HTML/CSS/JS) – cocok untuk GitHub Pages

## Cara Deploy ke GitHub Pages
1. Buat repo baru, contoh: `gimb-kuesioner`.
2. Upload ke root repo keempat file ini (`index.html`, `style.css`, `script.js`, `README.md`).
3. Buka **Settings → Pages**.
4. **Source**: pilih **Deploy from a branch**. **Branch**: `main` (root). **Save**.
5. Akses: `https://<username>.github.io/gimb-kuesioner/`

## Kustomisasi
- Ubah warna di `style.css` (variabel `:root`).
- Tambahkan logo di `index.html` dalam `<header>` jika diperlukan.
- Validasi tambahan dapat ditambahkan di `script.js`.

## Ekspor ke Google Sheets (opsional)
Tambahkan endpoint Apps Script, lalu kirim `fetch` POST dari `script.js` dengan `JSON.stringify(snapshot())`.
