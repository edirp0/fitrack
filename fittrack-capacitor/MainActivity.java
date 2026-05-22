// QUESTO FILE va in:
// android/app/src/main/java/com/paride/fittrack/MainActivity.java
//
// Crea le cartelle se non esistono:
// android/app/src/main/java/com/paride/fittrack/

package com.paride.fittrack;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Registra il plugin GoogleAuth PRIMA di super.onCreate
        registerPlugin(GoogleAuth.class);
        super.onCreate(savedInstanceState);
    }
}
