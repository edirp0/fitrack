# ═══════════════════════════════════════════════════════════
# ProGuard rules — FitTrack AI
# QUESTO FILE va in: android/app/proguard-rules.pro
# ═══════════════════════════════════════════════════════════

# Capacitor
-keep class com.getcapacitor.** { *; }
-keep class com.codetrixstudio.capacitor.** { *; }
-keepclassmembers class com.getcapacitor.** { *; }

# Firebase
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }
-keepattributes Signature
-keepattributes *Annotation*

# Google Sign-In
-keep class com.google.android.gms.auth.** { *; }
-keep class com.google.android.gms.common.** { *; }
-keepnames class com.google.android.gms.auth.api.signin.** { *; }

# Firestore
-keep class com.google.firebase.firestore.** { *; }
-keepclassmembers class com.google.firebase.firestore.** { *; }

# Evita warning su classi opzionali
-dontwarn com.google.firebase.**
-dontwarn com.google.android.gms.**

# Mantieni i nomi delle classi per i crash report
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
