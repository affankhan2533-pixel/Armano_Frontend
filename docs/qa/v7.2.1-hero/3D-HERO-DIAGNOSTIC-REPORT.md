# ARMANO — 3D Hero Canvas Diagnostic & Resolution Report

**Audit Date:** November 15, 2026  
**Status:** Diagnosed, Tested & Resolved  

---

## 1. Executive Summary & Root Cause

The visual issue shown in your screenshot (where `localhost:3000` displayed the headline and buttons but a blank vanilla canvas on the right side) was caused by two specific factors:

```mermaid
flowchart TD
    A["User Browser: localhost:3000"] --> B["Stale Node Process (PID 10096)"]
    B --> C["Running from OneDrive Workspace"]
    C --> D["Serving Outdated Build from Nov 8th"]
    D --> E["Old Nav & Obsolete Sub-bullets"]
    D --> F["Unmounted 3D Canvas / Stale Chunks"]
    
    A --> G["Brave Browser Shields (Active)"]
    G --> H["Fingerprinting / WebGL Farbling Blocks Canvas"]

    I["Active Production Build: localhost:3099"] --> J["Clean Build in C:\Dev\ARMANO_BUILD"]
    J --> K["Verified Three.js Procedural Pouch"]
    K --> L["5x4 Cushions, Gold Zipper, Swatches"]
```

### Forensic Proof:
1. **Outdated Server Process (PID 10096)**:
   - Port 3000 was held by process PID `10096` running from `C:\Users\AFFAN KHAN\OneDrive\Desktop\ARMANO`.
   - Because OneDrive file-sync locks frequently block `.next` rebuilds (`EPERM: operation not permitted`), this server was serving an obsolete build from November 8th.
   - **Visual Proof**: Notice the text in your screenshot:
     - Navigation items: `"MASTER CATALOGUE"`, `"ABOUT FACTORY"`, `"CONTACT DESK"`, `"Request Factory Quote"`.
     - Sub-bullets: `"✓ Sion-Dharavi Facility   ✓ Physical Counter-Samples   ✓ 10k / 20k / 50k Tiers"`.
     - In the updated codebase, these old elements were replaced days ago by the streamlined luxury header (`CATALOGUE`, `ABOUT`, `CONTACT`, `Request a Quote`).

2. **Brave Shields WebGL Fingerprinting Protection**:
   - The screenshot shows the **Brave Browser** with the orange lion icon (Brave Shields) active in the address bar.
   - Brave Shields includes WebGL Farbling (anti-fingerprinting protection). When Shields are UP, Brave can block or degrade WebGL canvas initialization and `getImageData` canvas readbacks on `localhost`.

---

## 2. Visual Verification: Before vs Now Live

![Diagnostic Comparison](file:///C:/Users/AFFAN%20KHAN/OneDrive/Desktop/ARMANO/docs/qa/v7.2.1-hero/PORT-3000-VS-PORT-3099-COMPARISON.jpg)

| Feature | `localhost:3000` (Your Screenshot) | `localhost:3099` (Now Live) |
| :--- | :--- | :--- |
| **Server Source** | `OneDrive\Desktop\ARMANO` (PID 10096) | `C:\Dev\ARMANO_BUILD` (Fresh Build) |
| **Version Date** | November 8, 2026 (Stale Cache) | November 15, 2026 (V7.2.1 Latest) |
| **3D Cosmetic Pouch** | **Missing (Blank Canvas)** | **100% Rendered & Visible** |
| **Pouch Geometry** | None | Authentic AR-009 wedge silhouette |
| **Quilted Cushions** | None | 5×4 down-filled pillowed cushions |
| **Hardware** | None | Gold zipper track + left-anchored puller |
| **Swatch Controller** | Missing | Vanilla Cream, Forest Green, Rose Blush, Noir Charcoal |
| **Ground Shadow** | Missing | Seamless soft contact shadow |

---

## 3. How to View the Updated 3D Pouch Right Now

### Instant Method: Open `localhost:3099`
The production server is currently running live on port `3099`.

1. Open your browser and navigate to:
   **http://localhost:3099**
2. In Brave Browser:
   - Click the **orange Lion icon** (Brave Shields) next to the URL.
   - Toggle **Shields to DOWN** (turned off for `localhost:3099`).
   - If WebGL is still not displaying, verify that **Hardware Acceleration** is enabled in `brave://settings/system` (*"Use graphics acceleration when available"*).
3. The full 3D quilted pouch, gold zipper, ground shadow, and interactive color swatches will appear immediately.

### Alternative: Switch `localhost:3000` to the Latest Build
If you prefer using port 3000 instead of 3099:
1. Open PowerShell and terminate the old OneDrive server:
   ```powershell
   Stop-Process -Id 10096 -Force
   ```
2. Start the verified production build on port 3000:
   ```powershell
   node C:\Dev\ARMANO_BUILD\node_modules\next\dist\bin\next start C:\Dev\ARMANO_BUILD -p 3000
   ```
3. In your browser, perform a **Hard Refresh** (`Ctrl + Shift + R` or `Ctrl + F5`) to clear old cached scripts.
