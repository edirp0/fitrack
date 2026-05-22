#!/bin/bash
# ═══════════════════════════════════════════════════════════
# FitTrack AI — Setup automatico Capacitor
# Lancia questo script dalla cartella fittrack-capacitor/
# con: bash setup.sh
# ═══════════════════════════════════════════════════════════

set -e  # Ferma lo script al primo errore

echo ""
echo "══════════════════════════════════════"
echo "  FitTrack AI — Setup Capacitor"
echo "══════════════════════════════════════"
echo ""

# Verifica Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js non trovato. Installa da: https://nodejs.org"
    exit 1
fi
echo "✅ Node.js: $(node --version)"

# Verifica npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm non trovato. Reinstalla Node.js"
    exit 1
fi
echo "✅ npm: $(npm --version)"

# Verifica ANDROID_HOME
if [ -z "$ANDROID_HOME" ] && [ -z "$ANDROID_SDK_ROOT" ]; then
    echo "⚠️  ANDROID_HOME non impostato."
    echo "   Imposta la variabile d'ambiente ANDROID_HOME"
    echo "   puntando alla cartella Android SDK."
    echo "   Continuo comunque..."
fi

echo ""
echo "📦 Installazione dipendenze npm..."
npm install

echo ""
echo "📱 Aggiunta piattaforma Android..."
if [ ! -d "android" ]; then
    npx cap add android
else
    echo "   Cartella android/ già esistente — skip"
fi

echo ""
echo "🔄 Sync Capacitor..."
npx cap sync android

echo ""
echo "📋 Applicazione file di configurazione..."

# Copia strings.xml nella posizione corretta
STRINGS_DIR="android/app/src/main/res/values"
if [ -d "$STRINGS_DIR" ]; then
    cp strings.xml "$STRINGS_DIR/strings.xml"
    echo "✅ strings.xml copiato in $STRINGS_DIR/"
else
    echo "⚠️  Cartella $STRINGS_DIR non trovata — copia strings.xml manualmente"
fi

# Copia AndroidManifest.xml
MANIFEST_DIR="android/app/src/main"
if [ -d "$MANIFEST_DIR" ]; then
    cp AndroidManifest.xml "$MANIFEST_DIR/AndroidManifest.xml"
    echo "✅ AndroidManifest.xml copiato"
else
    echo "⚠️  Cartella $MANIFEST_DIR non trovata"
fi

# Copia MainActivity.java
JAVA_DIR="android/app/src/main/java/com/paride/fittrack"
mkdir -p "$JAVA_DIR"
cp MainActivity.java "$JAVA_DIR/MainActivity.java"
echo "✅ MainActivity.java copiato"

# Copia build.gradle app
cp build_gradle_app.gradle android/app/build.gradle
echo "✅ android/app/build.gradle aggiornato"

# Copia build.gradle root
cp build_gradle_root.gradle android/build.gradle
echo "✅ android/build.gradle aggiornato"

echo ""
echo "══════════════════════════════════════"
echo "⚠️  PASSI MANUALI ANCORA DA FARE:"
echo "══════════════════════════════════════"
echo ""
echo "1. Vai su console.firebase.google.com → fittrack-fb939"
echo "   → Impostazioni progetto → App Android"
echo "   → Aggiungi app con package: com.paride.fittrack"
echo "   → Scarica google-services.json"
echo "   → Copialo in: android/app/google-services.json"
echo ""
echo "2. Apri Android Studio e trova il tuo SHA-1:"
echo "   Gradle panel → :app → Tasks → android → signingReport"
echo "   Copia SHA-1 e aggiungilo su Firebase Console"
echo ""
echo "3. Trova il serverClientId:"
echo "   console.cloud.google.com → API → Credenziali"
echo "   → 'Web client (auto created by Google Service)'"
echo "   → Copia e incolla in strings.xml e capacitor.config.json"
echo ""
echo "4. Lancia: npx cap open android"
echo "   Poi premi Play per testare"
echo ""
echo "══════════════════════════════════════"
echo "✅ Setup completato!"
echo "══════════════════════════════════════"
