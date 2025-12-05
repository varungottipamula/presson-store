# PowerShell script to create a zip of public folders for deployment
# This ensures all subdirectories are included

$publicPath = "C:\Projects\presson-store\public"
$outputZip = "C:\Projects\presson-store\public-images.zip"

Write-Host "Creating zip file of public folder..." -ForegroundColor Green

# Remove old zip if exists
if (Test-Path $outputZip) {
    Remove-Item $outputZip
}

# Create the zip file with all contents
Compress-Archive -Path "$publicPath\*" -DestinationPath $outputZip -Force

Write-Host "✓ Zip created successfully: $outputZip" -ForegroundColor Green
Write-Host ""
Write-Host "Folder contents included:" -ForegroundColor Yellow

# List what's in the public folder
Get-ChildItem $publicPath -Directory | ForEach-Object {
    $fileCount = (Get-ChildItem $_.FullName -File).Count
    Write-Host "  - $($_.Name)/ ($fileCount files)" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Upload '$outputZip' to your server" -ForegroundColor White
Write-Host "2. Extract it to your app's public folder" -ForegroundColor White
Write-Host "3. Restart your application" -ForegroundColor White
Write-Host ""
Write-Host "Or use SCP to upload directly:" -ForegroundColor Yellow
Write-Host "scp '$outputZip' user@147.79.66.79:/path/to/app/" -ForegroundColor Cyan
