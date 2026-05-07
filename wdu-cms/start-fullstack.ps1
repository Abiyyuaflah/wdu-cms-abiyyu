# start-fullstack.ps1
# Auto full stack WDU CMS

# === Konfigurasi Path ===
$backendPath = "C:\Users\Infinix Ryzen 5\Documents\abiyyu Magang\wdu-cms\backend"
$frontendPath = "C:\Users\Infinix Ryzen 5\Documents\abiyyu Magang\wdu-cms\frontend"
$backendPort = 3001
$frontendPort = 5173

# === Fungsi: stop port kalau kepakai ===
function Stop-Port($port) {
    $proc = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($proc) {
        Write-Host "Port $port sedang dipakai, menghentikan process ID $($proc.OwningProcess)..."
        Stop-Process -Id $proc.OwningProcess -Force
    }
}

Stop-Port $backendPort
Stop-Port $frontendPort

# === Start Backend ===
Write-Host "`n=== Starting Backend ==="
Set-Location $backendPath

# Hapus Prisma Client lama supaya generate ulang aman
if (Test-Path ".\node_modules\.prisma") {
    Remove-Item ".\node_modules\.prisma" -Recurse -Force
}

# Generate Prisma Client
Write-Host "Generating Prisma Client..."
npx prisma generate

# Jalankan backend di tab PowerShell baru
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$backendPath`"; npm run dev"

# === Start Frontend ===
Write-Host "`n=== Starting Frontend ==="
# Ganti path Antigravity sesuai di PC kamu
$antigravityExe = "C:\Path\To\Antigravity.exe"

Start-Process $antigravityExe -ArgumentList "-new-tab", "-C", "cd `"$frontendPath` && npm run dev`""

Write-Host "`n✅ Semua server sudah dijalankan!"