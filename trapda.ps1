Write-Host "🚀 Starting Trapda Application (Laravel + Vite)..." -ForegroundColor Cyan
npx concurrently --kill-others -n "Laravel,Vite" -c "cyan,magenta" "php artisan serve" "npm run dev"
