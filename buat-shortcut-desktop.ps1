$batPath    = "D:\HAMDANI\PROJECT_DONE 📌\APLIKASI\WEB\trapda\Buka Trapda.bat"
$iconPath   = "D:\HAMDANI\PROJECT_DONE 📌\APLIKASI\WEB\trapda\logoutama.png"
$shortcutPath = [System.IO.Path]::Combine([System.Environment]::GetFolderPath("Desktop"), "Trapda.lnk")

$WshShell   = New-Object -ComObject WScript.Shell
$shortcut   = $WshShell.CreateShortcut($shortcutPath)
$shortcut.TargetPath       = $batPath
$shortcut.WorkingDirectory = "D:\HAMDANI\PROJECT_DONE 📌\APLIKASI\WEB\trapda"
$shortcut.Description      = "Trapda - Manajemen Lamaran Kamu"
$shortcut.WindowStyle      = 1   # Normal window

# Gunakan icon dari shell32 (roket) sebagai fallback karena .png tidak didukung langsung
$shortcut.IconLocation = "%SystemRoot%\System32\shell32.dll,137"

$shortcut.Save()

Write-Host ""
Write-Host "✅ Shortcut 'Trapda' berhasil dibuat di Desktop!" -ForegroundColor Green
Write-Host "   Path: $shortcutPath" -ForegroundColor Cyan
Write-Host ""
