@echo off
title 🚀 Trapda - Manajemen Lamaran Kamu
color 0B

echo.
echo  =============================================
echo    TRAPDA - Manajemen Lamaran Kamu
echo    v.1.12.0
echo  =============================================
echo.
echo  [1/3] Memulai server Laravel...
echo.

cd /d "D:\HAMDANI\PROJECT_DONE 📌\APLIKASI\WEB\trapda"

:: Jalankan Laravel dan Vite di background
start "Trapda-Laravel" cmd /c "php artisan serve"
start "Trapda-Vite"    cmd /c "npm run dev"

:: Tunggu Laravel siap (cek port 8000)
echo  [2/3] Menunggu server siap...
:waitloop
timeout /t 1 /nobreak >nul
powershell -command "try { $r = Invoke-WebRequest http://localhost:8000 -UseBasicParsing -TimeoutSec 1; exit 0 } catch { exit 1 }" >nul 2>&1
if errorlevel 1 goto waitloop

:: Buka browser
echo  [3/3] Membuka browser...
start "" "http://localhost:8000"

echo.
echo  ✅ Trapda berhasil berjalan di http://localhost:8000
echo.
echo  Tekan tombol apapun untuk MENUTUP jendela ini
echo  (server tetap berjalan di background)
pause >nul
