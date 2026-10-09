# CityPulse AI — Smart City Exploration, Safety & Urban Intelligence Platform

> **Explore Smarter. Travel Safer. Experience More.**  
> Initial Demo City: **Pune, Maharashtra, India**

CityPulse AI is a lightweight, responsive, and deployment-ready web application built with clean, standards-compliant HTML5, CSS3, and modern JavaScript. It combines rich cultural discovery with transparent safety intelligence, crowdsourced civic hazard radar, and real-time urban telemetry.

---

## 📁 Project Folder Structure

The project uses a simple, clean, and transparent folder structure without complex build steps or heavy node modules:

```text
CityPulse-AI/
├── index.html       # Main website structure, navigation, layout & modals
├── style.css        # Clean styling, responsive layout, animations & themes
├── app.js           # Interactive application logic, routing, AI modules & Leaflet engine
├── data.js          # Pune places dataset, VibeMatch, CrowdSignal & CityQuest data
├── hero.png         # High-resolution local hero banner visual of Pune skyline
├── README.md        # Project guide, architecture, local launch & deployment
└── .nojekyll        # Disables Jekyll processing for GitHub Pages hosting
```

---

## 🌟 Key Application Modules

1. **VibeMatch AI (`#vibematch`)**
   - Interactive mood and travel style matcher.
   - Tailors recommendations across *Heritage & History*, *Chill Irani Chai & Cafes*, *Breezy Tekdi & Nature*, *Bustling Street Bazaars*, and *Authentic Maharashtrian Foodie*.

2. **PocketGuard Safety Guardian & INR Budget Calculator (`#pocketguard`)**
   - **Budget Calculator in Indian Rupees (₹)**: Tier breakdown presets for ₹500 (Budget Explorer), ₹1,200 (Day Tripper), ₹2,500 (Weekend Treat), and ₹5,000 (Luxury) with automated percentage allocation (Food 45%, Transit 25%, Tickets 15%, Buffer 15%) and filtered recommended Pune venues.
   - Situational awareness assistant with a neighborhood streetlighting confidence index.
   - Proximity hazard radar scanning community reports within 2 km.
   - Direct emergency SOS speed-dial directory for **Pune Police (112)** and **Women Safety (1091)**.

3. **City Twin: Digital Urban Pulse & Outing Plans (`#citytwin`)**
   - **Outing Plans Comparison**: Side-by-side simulation of 3 curated Pune journeys:
     - *Plan A*: Deccan & Peshwa Heritage Trail (₹650, 4.8 km)
     - *Plan B*: Koregaon Park & Eastern Pune Retreat (₹1,400, 11.2 km)
     - *Plan C*: Sahyadri Mountain Bastion Trek (₹450, 32.0 km)
   - Real-time urban telemetry aggregating live weather from the **Open-Meteo API**.
   - Live Air Quality Index (AQI), telemetry freshness timestamp, and major transit corridor speed monitoring (JM Road, FC Road, SB Road, Swargate).

4. **CrowdSignal Civic Reporting (`#crowdsignal`)**
   - Crowdsourced civic hazard reporting system for potholes, defective streetlighting, waterlogging, and theft risks.
   - Client-side persistent storage via `localStorage` ensures user submissions survive page reloads in demo mode.

5. **CityQuest Gamified Exploration (`#cityquest`)**
   - Multi-stop heritage and culinary exploration challenges:
     - *Peshwa Legacy Quest (+180 XP)*
     - *Old Pune Food Odyssey (+200 XP)*
     - *Sahyadri Summit & Nature Quest (+250 XP)*
   - Tracks quest checkpoints and awards XP to the User Profile in real time.

6. **Best vs. Best Place Comparison Engine (`#compare`)**
   - Side-by-side matrix comparing up to 3 selected Pune venues.
   - Dynamic user-customizable decision weights: Safety (35%), Affordability (25%), Ratings (20%), Accessibility (10%), and Cleanliness (10%).

7. **Interactive Leaflet City Map (`#map`)**
   - Powered by **OpenStreetMap** with categorical pin color-coding and safety incident markers.

8. **PulseAI Concierge (`#assistant`)**
   - Natural language assistant recommending budget days under ₹500, wheelchair accessible spots, and historical itineraries.

9. **Lower-Right Floating User Profile Widget**
   - Located in the bottom-right corner.
   - Displays live user identity, Level badge, total City XP, saved places count, submitted civic signals, home locality base selector, and emergency helplines.

---

## 💻 Instructions to Run Locally

Because the project is built with zero-dependency native web standards, you can run it immediately without installing Node.js, npm, or build tools:

### Method 1: Direct File Launch (Easiest)
1. Navigate to the project folder `CityPulse-AI`.
2. Double-click **`index.html`** or double-click **`start.bat`**.
3. The platform immediately opens in your default browser (Chrome, Edge, Firefox, Brave, Safari).

### Method 2: Local HTTP Server (PowerShell)
If you prefer running through a local web server:
1. Open PowerShell in the project directory.
2. Run:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\server.ps1
   ```
3. Open `http://localhost:5173` in your browser.

---

## 🌐 External Data Sources & Attribution

- **Interactive Map Tiles**: &copy; [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
- **Map Library**: [Leaflet.js](https://leafletjs.com/) (v1.9.4).
- **Weather & Climate Telemetry**: [Open-Meteo API](https://open-meteo.com/) (Free public weather forecast API, Lat: 18.5204 N, Lng: 73.8567 E).
- **Icons**: [Lucide Icons](https://lucide.dev/).
- **Hero Image (`hero.png`)**: High-resolution digital artwork depicting the Pune cityscape, Shaniwar Wada fort, and sunset lighting.

---

## ⚠️ Transparent Limitations & Disclaimers

1. **Demo Prototype Data**: Incident reports displayed in CrowdSignal and PocketGuard are clearly identified as **DEMO DATA** for demonstration purposes. No crime records are fabricated.
2. **Safety Disclaimer**: A lack of recorded incident reports in an area must never be interpreted as proof that a location is safe. Users must always remain aware of their surroundings.
3. **Local Storage**: User profile updates, submitted CrowdSignals, and bookmarked places are stored in browser `localStorage`. They persist across tab reloads on the same machine.

---

## 🚀 Free Public Deployment Instructions

The static architecture allows 100% free hosting in under 60 seconds:

### Option A: Drag & Drop directly to GitHub & Publish via GitHub Pages
1. Create a new repository on [github.com](https://github.com) named `CityPulse-AI` (choose Public).
2. On the repository page, click **"uploading an existing file"** (or click **Add file** > **Upload files**).
3. Drag and drop all the files from your `CityPulse-AI` folder directly into the browser upload box:
   - `index.html`
   - `style.css`
   - `app.js`
   - `data.js`
   - `hero.png`
   - `README.md`
   - `.nojekyll`
4. Click **Commit changes**.
5. Go to repository **Settings** > **Pages** (in the left sidebar).
6. Under **Branch**, select **`main`** (or `master`) and directory **`/ (root)`**, then click **Save**.
7. In about 30 seconds, your site is live at:  
   `https://<your-username>.github.io/CityPulse-AI/`

### Option B: Drag & Drop via Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) in your web browser.
2. Drag and drop the `CityPulse-AI` folder onto the page.
3. Netlify will deploy the site and provide a free public HTTPS URL instantly.

### Option C: Vercel
1. Import the repository in [vercel.com](https://vercel.com).
2. Framework preset: **Other** (Root directory: `./`).
3. Click **Deploy**.
