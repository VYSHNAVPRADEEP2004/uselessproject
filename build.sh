#!/bin/bash

# UselessOS Build Script
# This script builds the application for all platforms

echo "🚀 Building UselessOS - The Most Useless Operating System Simulator"
echo "==============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create dist directory if it doesn't exist
mkdir -p dist

echo "🔨 Building for all platforms..."

# Build for Windows
echo "🪟 Building for Windows..."
npm run build-win
if [ $? -eq 0 ]; then
    echo "✅ Windows build completed"
else
    echo "⚠️ Windows build failed"
fi

# Build for macOS
echo "🍎 Building for macOS..."
npm run build-mac
if [ $? -eq 0 ]; then
    echo "✅ macOS build completed"
else
    echo "⚠️ macOS build failed"
fi

# Build for Linux
echo "🐧 Building for Linux..."
npm run build-linux
if [ $? -eq 0 ]; then
    echo "✅ Linux build completed"
else
    echo "⚠️ Linux build failed"
fi

echo ""
echo "🎉 Build process completed!"
echo "📁 Check the 'dist' folder for your built applications"
echo ""
echo "To run in development mode: npm start"
echo "To build for specific platform:"
echo "  - Windows: npm run build-win"
echo "  - macOS: npm run build-mac"
echo "  - Linux: npm run build-linux"
echo ""
echo "Enjoy your completely useless operating system! 😄"
