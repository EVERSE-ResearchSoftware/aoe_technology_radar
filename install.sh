#!/bin/bash

echo "🎯 EVERSE Technology Radar - Enhanced Edition"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js version 18 or higher is required. You have: $(node -v)"
    echo "   Please upgrade Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "Next steps:"
    echo "  1. Add your radar data to data/radar/YYYY-MM-DD/"
    echo "  2. Configure config.json to your needs"
    echo "  3. Run 'npm run dev' to start development server"
    echo "  4. Visit http://localhost:3000/TechRadar"
    echo ""
    echo "For production build:"
    echo "  npm run build"
    echo "  npm run export"
    echo ""
else
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
