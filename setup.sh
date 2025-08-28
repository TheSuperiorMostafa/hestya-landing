#!/bin/bash

echo "🚀 Setting up Hestya Community OS..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo "📦 Installing dependencies..."

# Install dependencies
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Setup complete! To start the development server:"
    echo "   npm run dev"
    echo ""
    echo "🌐 Then open http://localhost:3000 in your browser"
else
    echo "❌ Failed to install dependencies. Please try again."
    exit 1
fi
