@echo off
echo 🚀 Building UselessOS - The Most Useless Operating System Simulator
echo ===============================================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js and npm first.
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    exit /b 1
)

echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create dist directory if it doesn't exist
if not exist dist mkdir dist

echo 🔨 Building for all platforms...

REM Build for Windows
echo 🪟 Building for Windows...
npm run build-win
if %errorlevel% equ 0 (
    echo ✅ Windows build completed
) else (
    echo ⚠️ Windows build failed
)

REM Build for macOS
echo 🍎 Building for macOS...
npm run build-mac
if %errorlevel% equ 0 (
    echo ✅ macOS build completed
) else (
    echo ⚠️ macOS build failed
)

REM Build for Linux
echo 🐧 Building for Linux...
npm run build-linux
if %errorlevel% equ 0 (
    echo ✅ Linux build completed
) else (
    echo ⚠️ Linux build failed
)

echo.
echo 🎉 Build process completed!
echo 📁 Check the 'dist' folder for your built applications
echo.
echo To run in development mode: npm start
echo To build for specific platform:
echo   - Windows: npm run build-win
echo   - macOS: npm run build-mac
echo   - Linux: npm run build-linux
echo.
echo Enjoy your completely useless operating system! 😄
pause
