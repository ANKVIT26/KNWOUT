#!/bin/bash

# KNWOUT Local Development Server
# This script starts a local HTTP server for development

echo "🌤️  Starting KNWOUT Weather App..."
echo "📂 Serving files from ./KNWOUT directory"

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "🐍 Using Python 3 HTTP server"
    cd KNWOUT
    echo "🚀 Server starting at http://localhost:8000"
    echo "⌨️  Press Ctrl+C to stop the server"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🐍 Using Python HTTP server"
    cd KNWOUT
    echo "🚀 Server starting at http://localhost:8000"
    echo "⌨️  Press Ctrl+C to stop the server"
    python -m http.server 8000
elif command -v node &> /dev/null; then
    echo "📦 Using Node.js HTTP server"
    if ! command -v npx &> /dev/null; then
        echo "❌ npx not found. Please install Node.js properly or use Python."
        exit 1
    fi
    cd KNWOUT
    echo "🚀 Server starting at http://localhost:8000"
    echo "⌨️  Press Ctrl+C to stop the server"
    npx http-server -p 8000
elif command -v php &> /dev/null; then
    echo "🐘 Using PHP built-in server"
    cd KNWOUT
    echo "🚀 Server starting at http://localhost:8000"
    echo "⌨️  Press Ctrl+C to stop the server"
    php -S localhost:8000
else
    echo "❌ No suitable HTTP server found!"
    echo "Please install one of the following:"
    echo "  - Python 3: https://python.org"
    echo "  - Node.js: https://nodejs.org"
    echo "  - PHP: https://php.net"
    exit 1
fi