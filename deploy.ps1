# TruthLens - Tek Tikla Deploy Script
# Bu scripti PowerShell'de calistirin: .\deploy.ps1

param(
    [string]$BackendUrl = "",
    [switch]$BackendOnly,
    [switch]$FrontendOnly
)

$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TruthLens - Web Yayinlama" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Backend URL yoksa Render sayfasini ac
if ([string]::IsNullOrWhiteSpace($BackendUrl) -and -not $FrontendOnly) {
    Write-Host "Backend once yayinlanmali!" -ForegroundColor Yellow
    Write-Host "Render deploy sayfasi aciliyor..." -ForegroundColor Yellow
    Start-Process "https://render.com/deploy?repo=https://github.com/Akdemir211/TruthLens"
    Write-Host ""
    Write-Host "1. Render'da GitHub ile giris yapin" -ForegroundColor White
    Write-Host "2. 'Apply' ile backend'i olusturun" -ForegroundColor White
    Write-Host "3. Environment Variables ekleyin: GEMINI_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY" -ForegroundColor White
    Write-Host "4. Deploy tamamlaninca backend URL'ini kopyalayin" -ForegroundColor White
    Write-Host ""
    $BackendUrl = Read-Host "Backend URL'inizi yapistirin (veya Enter ile atlayip sonra Vercel'de ekleyin)"
}

if ([string]::IsNullOrWhiteSpace($BackendUrl)) {
    $BackendUrl = "https://truthlens-api.onrender.com"
}

# Vercel deploy
if (-not $BackendOnly) {
    Write-Host "[1/2] Vercel kontrol ediliyor..." -ForegroundColor Yellow
    npx vercel whoami 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Vercel giris gerekli - tarayici acilacak" -ForegroundColor Yellow
        npx vercel login
    }

    Write-Host "[2/2] Frontend Vercel'e yukleniyor..." -ForegroundColor Yellow
    Push-Location "$ProjectRoot\frontend"
    $env:NEXT_PUBLIC_API_URL = $BackendUrl
    npx vercel --prod --yes
    Pop-Location
    Write-Host "Frontend yayinlandi! Vercel URL: https://truthlens-*.vercel.app" -ForegroundColor Green
}

Write-Host ""
Write-Host "Tamamlandi!" -ForegroundColor Green
