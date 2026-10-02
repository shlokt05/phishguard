Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\Shlok Tripathi\.gemini\antigravity-ide\brain\b20b53cc-7ae4-41ba-839a-c04aad10fcb6\phishguard_app_icon_1790917231565.jpg"
$frontendDir = "c:\Users\Shlok Tripathi\.gemini\antigravity\scratch\phishguard\frontend"

if (-not (Test-Path $sourcePath)) {
    Write-Error "Source image not found at $sourcePath"
    exit 1
}

$srcImg = [System.Drawing.Image]::FromFile($sourcePath)

function Save-ResizedImage {
    param(
        [System.Drawing.Image]$image,
        [int]$width,
        [int]$height,
        [string]$destPath,
        [bool]$isRound = $false
    )
    $dir = [System.IO.Path]::GetDirectoryName($destPath)
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    if ($isRound) {
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddEllipse(0, 0, $width, $height)
        $g.SetClip($path)
    }

    $g.DrawImage($image, 0, 0, $width, $height)
    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created $destPath (${width}x${height})"
}

# 1. Web & Capacitor assets
Save-ResizedImage $srcImg 512 512 "$frontendDir\src\assets\icon.png"
Save-ResizedImage $srcImg 512 512 "$frontendDir\public\icon.png"
Save-ResizedImage $srcImg 512 512 "$frontendDir\src\assets\splash.png"
Save-ResizedImage $srcImg 192 192 "$frontendDir\public\icon-192.png"
Save-ResizedImage $srcImg 512 512 "$frontendDir\public\icon-512.png"

# 2. Android mipmaps
$androidRes = "$frontendDir\android\app\src\main\res"

$densities = @(
    @{ folder = "mipmap-mdpi"; launcher = 48; fg = 108 },
    @{ folder = "mipmap-hdpi"; launcher = 72; fg = 162 },
    @{ folder = "mipmap-xhdpi"; launcher = 96; fg = 216 },
    @{ folder = "mipmap-xxhdpi"; launcher = 144; fg = 324 },
    @{ folder = "mipmap-xxxhdpi"; launcher = 192; fg = 432 }
)

foreach ($d in $densities) {
    $folder = Join-Path $androidRes $d.folder
    Save-ResizedImage $srcImg $d.launcher $d.launcher (Join-Path $folder "ic_launcher.png")
    Save-ResizedImage $srcImg $d.launcher $d.launcher (Join-Path $folder "ic_launcher_round.png") -isRound $true
    Save-ResizedImage $srcImg $d.fg $d.fg (Join-Path $folder "ic_launcher_foreground.png")
}

# 3. Android splash
Save-ResizedImage $srcImg 480 800 "$androidRes\drawable\splash.png"

$splashDensities = @(
    @{ folder = "drawable-land-mdpi"; w = 800; h = 480 },
    @{ folder = "drawable-land-hdpi"; w = 1200; h = 720 },
    @{ folder = "drawable-land-xhdpi"; w = 1600; h = 960 },
    @{ folder = "drawable-land-xxhdpi"; w = 2400; h = 1440 },
    @{ folder = "drawable-land-xxxhdpi"; w = 3200; h = 1920 },
    @{ folder = "drawable-port-mdpi"; w = 480; h = 800 },
    @{ folder = "drawable-port-hdpi"; w = 720; h = 1200 },
    @{ folder = "drawable-port-xhdpi"; w = 960; h = 1600 },
    @{ folder = "drawable-port-xxhdpi"; w = 1440; h = 2400 },
    @{ folder = "drawable-port-xxxhdpi"; w = 1920; h = 3200 }
)

foreach ($sd in $splashDensities) {
    $folder = Join-Path $androidRes $sd.folder
    Save-ResizedImage $srcImg $sd.w $sd.h (Join-Path $folder "splash.png")
}

$srcImg.Dispose()
Write-Host "All icons and splash screens successfully generated!"
