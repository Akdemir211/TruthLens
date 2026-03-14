# Vercel Deploy - Bu dosyayi cift tiklayarak veya PowerShell'de calistirin
Set-Location $PSScriptRoot\frontend
Write-Host "Vercel giris kontrolu..." -ForegroundColor Yellow
npx vercel whoami 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Giris gerekli - tarayici acilacak" -ForegroundColor Yellow
    npx vercel login
}
$env:NEXT_PUBLIC_API_URL = "https://truthlens-api.onrender.com"
Write-Host "Frontend yukleniyor..." -ForegroundColor Yellow
npx vercel --prod --yes
Write-Host "Tamamlandi! Vercel dashboard'dan URL'inizi alin." -ForegroundColor Green
Read-Host "Cikmak icin Enter'a basin"
