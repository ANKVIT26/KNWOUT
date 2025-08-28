#!/bin/bash

# KNWOUT Deployment Verification Script
echo "🔍 Verifying KNWOUT deployment setup..."

# Check if required files exist
echo "📁 Checking required files..."

REQUIRED_FILES=(
    "KNWOUT/Landing.html"
    "KNWOUT/index.html" 
    "KNWOUT/login.html"
    "KNWOUT/forecast.html"
    "KNWOUT/History.html"
    "KNWOUT/script.js"
    ".github/workflows/deploy.yml"
    "netlify.toml"
    "vercel.json"
    "firebase.json"
    "DEPLOYMENT.md"
)

missing_files=0
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        missing_files=$((missing_files + 1))
    fi
done

echo ""
echo "📊 Summary:"
echo "   Required files: ${#REQUIRED_FILES[@]}"
echo "   Found: $((${#REQUIRED_FILES[@]} - missing_files))"
echo "   Missing: $missing_files"

if [ $missing_files -eq 0 ]; then
    echo ""
    echo "🎉 All deployment files are present!"
    echo "🚀 Ready to deploy on:"
    echo "   • GitHub Pages (auto-deploy on push)"
    echo "   • Netlify"
    echo "   • Vercel" 
    echo "   • Firebase Hosting"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
else
    echo ""
    echo "⚠️  Some files are missing. Please check the setup."
    exit 1
fi