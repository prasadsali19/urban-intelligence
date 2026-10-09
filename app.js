// CityPulse AI - Comprehensive Application Controller (app.js)
// Implements: VibeMatch, PocketGuard, City Twin, CrowdSignal, CityQuest,
// Leaflet Map, Best vs. Worst Comparison, PulseAI Concierge, and User Profile Widget.

(function () {
  'use strict';

  // ==========================================
  // 1. STATE & STORAGE MANAGEMENT
  // ==========================================
  const state = {
    currentView: 'home',
    places: window.PLACES_DATA || [],
    safetyReports: loadStoredReports(),
    savedPlaceIds: loadStoredSaved(),
    comparePlaceIds: loadStoredCompare(),
    completedQuestIds: loadStoredQuests(),
    activeVibeId: 'vibe-heritage',
    userLocality: loadStoredLocality(),
    pocketguardTier: 'tier-1200',
    userCoords: { lat: 18.5314, lng: 73.8446 }, // Default Shivajinagar
    activeCategory: 'all',
    activePriceFilter: 'all',
    accessibilityOnly: false,
    searchQuery: '',
    sortBy: 'featured',
    isGridView: true,
    comparisonWeights: {
      safety: 35,
      affordability: 25,
      ratings: 20,
      accessibility: 10,
      cleanliness: 10
    },
    userProfile: {
      name: localStorage.getItem('citypulse_username') || 'Ganesh Patil',
      email: localStorage.getItem('citypulse_useremail') || 'ganesh.patil@citypulse.ai',
      wheelchairPriority: localStorage.getItem('citypulse_pref_wheelchair') === 'true',
      hazardAlerts: localStorage.getItem('citypulse_pref_hazards') !== 'false'
    },
    maps: {
      main: null,
      mainMarkersLayer: null
    },
    liveWeather: {
      temp: 28,
      condition: 'Sunny',
      code: 0,
      lastUpdated: 'Live Demo'
    }
  };

  function loadStoredReports() {
    try {
      const stored = localStorage.getItem('citypulse_reports');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return window.CROWDSIGNAL_REPORTS || window.DEMO_SAFETY_REPORTS || [];
  }

  function saveStoredReports() {
    try {
      localStorage.setItem('citypulse_reports', JSON.stringify(state.safetyReports));
    } catch (e) {}
  }

  function loadStoredSaved() {
    try {
      const stored = localStorage.getItem('citypulse_saved_places');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return ['pune-01', 'pune-07'];
  }

  function saveStoredSaved() {
    try {
      localStorage.setItem('citypulse_saved_places', JSON.stringify(state.savedPlaceIds));
    } catch (e) {}
  }

  function loadStoredCompare() {
    try {
      const stored = localStorage.getItem('citypulse_compare_places');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return ['pune-01', 'pune-02'];
  }

  function saveStoredCompare() {
    try {
      localStorage.setItem('citypulse_compare_places', JSON.stringify(state.comparePlaceIds));
    } catch (e) {}
  }

  function loadStoredQuests() {
    try {
      const stored = localStorage.getItem('citypulse_completed_quests');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return ['quest-1']; // 1 initial completed quest for rich profile
  }

  function saveStoredQuests() {
    try {
      localStorage.setItem('citypulse_completed_quests', JSON.stringify(state.completedQuestIds));
    } catch (e) {}
  }

  function loadStoredLocality() {
    try {
      const stored = localStorage.getItem('citypulse_locality');
      if (stored) return stored;
    } catch (e) {}
    return 'shivajinagar';
  }

  // ==========================================
  // 2. DISTANCE UTILITY (HAVERSINE FORMULA)
  // ==========================================
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  }

  function getDistanceForPlace(place) {
    if (!state.userCoords) return '1.5 km';
    const dist = calculateDistance(state.userCoords.lat, state.userCoords.lng, place.lat, place.lng);
    return `${dist} km`;
  }

  // ==========================================
  // 3. INITIALIZATION & ROUTING
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    initLocalitiesDropdown();
    setupNavigationRouting();
    setupEventListeners();
    fetchLiveWeather();

    renderHomeView();
    renderExploreView();
    renderVibeMatchView();
    renderPocketGuardView();
    renderCityTwinView();
    renderCrowdSignalFeed();
    renderCityQuestView();
    renderHeritageView();

    updateComparisonDock();
    updateSavedCounters();
    initUserProfile();

    handleHashChange();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  function setupNavigationRouting() {
    window.addEventListener('hashchange', handleHashChange);
  }

  function handleHashChange() {
    const rawHash = window.location.hash.replace('#', '') || 'home';
    const validViews = [
      'home', 'explore', 'map', 'vibematch', 'pocketguard',
      'citytwin', 'crowdsignal', 'cityquest', 'compare',
      'heritage', 'assistant', 'saved'
    ];
    const targetView = validViews.includes(rawHash) ? rawHash : 'home';
    switchView(targetView);
  }

  function switchView(viewName) {
    state.currentView = viewName;

    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.add('hidden');
    });

    const activePanel = document.getElementById(`view-${viewName}`);
    if (activePanel) {
      activePanel.classList.remove('hidden');
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
      if (btn.getAttribute('data-view') === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (viewName === 'map') {
      setTimeout(() => initMainLeafletMap(), 150);
    } else if (viewName === 'compare') {
      renderCompareMatrix();
    } else if (viewName === 'saved') {
      renderSavedPlaces();
    } else if (viewName === 'pocketguard') {
      renderPocketGuardView();
    } else if (viewName === 'citytwin') {
      renderCityTwinView();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function initLocalitiesDropdown() {
    const select = document.getElementById('user-locality-select');
    if (!select || !window.PUNE_LOCALITIES) return;

    select.innerHTML = window.PUNE_LOCALITIES.map(loc => `
      <option value="${loc.id}" ${loc.id === state.userLocality ? 'selected' : ''}>
        📍 ${loc.name}
      </option>
    `).join('');

    const match = window.PUNE_LOCALITIES.find(l => l.id === state.userLocality);
    if (match) {
      state.userCoords = { lat: match.lat, lng: match.lng };
    }

    select.addEventListener('change', (e) => {
      state.userLocality = e.target.value;
      localStorage.setItem('citypulse_locality', state.userLocality);
      const chosen = window.PUNE_LOCALITIES.find(l => l.id === state.userLocality);
      if (chosen) {
        state.userCoords = { lat: chosen.lat, lng: chosen.lng };
      }
      renderExploreView();
      renderPocketGuardView();
      updateUserProfileStats();
      if (state.maps.main) {
        state.maps.main.setView([state.userCoords.lat, state.userCoords.lng], 13);
      }
    });
  }

  // ==========================================
  // 4. LIVE WEATHER (OPEN-METEO API)
  // ==========================================
  async function fetchLiveWeather() {
    const tickerBtn = document.getElementById('weather-temp-text');
    const homeWeather = document.getElementById('home-stat-weather');
    const twinWeatherTemp = document.getElementById('twin-weather-temp');
    const twinWeatherDesc = document.getElementById('twin-weather-desc');

    try {
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current_weather=true';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather API error');
      
      const data = await res.json();
      const current = data.current_weather;
      
      if (current) {
        state.liveWeather.temp = Math.round(current.temperature);
        state.liveWeather.code = current.weathercode;
        state.liveWeather.lastUpdated = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let condition = 'Sunny & Clear';
        if (current.weathercode <= 3) condition = 'Partly Cloudy';
        else if (current.weathercode >= 51) condition = 'Passing Showers';

        state.liveWeather.condition = condition;

        if (tickerBtn) tickerBtn.textContent = `Pune: ${state.liveWeather.temp}°C • ${condition}`;
        if (homeWeather) homeWeather.textContent = `${state.liveWeather.temp}°C`;
        if (twinWeatherTemp) twinWeatherTemp.textContent = `${state.liveWeather.temp}°C`;
        if (twinWeatherDesc) twinWeatherDesc.textContent = condition;
      }
    } catch (err) {
      if (tickerBtn) tickerBtn.textContent = 'Pune: 28°C • Sunny (Baseline)';
      if (homeWeather) homeWeather.textContent = '28°C';
      if (twinWeatherTemp) twinWeatherTemp.textContent = '28°C';
      if (twinWeatherDesc) twinWeatherDesc.textContent = 'Pleasant & Sunny';
    }
  }

  // ==========================================
  // 5. HOME VIEW RENDERING
  // ==========================================
  function renderHomeView() {
    const featuredContainer = document.getElementById('home-featured-grid');
    if (!featuredContainer) return;

    const featuredPlaces = state.places.filter(p => p.featured).slice(0, 6);

    featuredContainer.innerHTML = featuredPlaces.map(place => {
      const isSaved = state.savedPlaceIds.includes(place.id);
      const isComparing = state.comparePlaceIds.includes(place.id);
      const distance = getDistanceForPlace(place);

      return `
        <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group interactive-card">
          <div class="relative h-44 w-full bg-slate-100 overflow-hidden">
            <img 
              src="${place.image}" 
              alt="${place.name}" 
              class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              loading="lazy"
              onerror="this.src='hero.png'"
            >
            <div class="absolute top-3 left-3 flex items-center gap-1.5">
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/95 text-slate-800 backdrop-blur shadow-sm">
                ${place.categoryName}
              </span>
            </div>
            <button 
              class="btn-save-toggle absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-slate-700 hover:text-amber-500 flex items-center justify-center transition shadow-sm"
              data-id="${place.id}"
              title="Bookmark place"
            >
              <i data-lucide="bookmark" class="w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-500' : ''}"></i>
            </button>
            <div class="absolute bottom-2.5 left-3 text-white text-[11px] font-semibold bg-black/60 backdrop-blur px-2 py-0.5 rounded-md flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3 h-3 text-teal-300"></i>
              <span>${distance} away</span>
            </div>
          </div>

          <div class="p-4 flex-1 flex flex-col justify-between gap-3">
            <div>
              <div class="flex items-center justify-between gap-2 mb-1">
                <h3 class="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition leading-snug line-clamp-1">
                  ${place.name}
                </h3>
                <div class="flex items-center gap-1 text-xs font-bold text-amber-600 shrink-0">
                  <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
                  <span>${place.rating}</span>
                </div>
              </div>
              <p class="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                ${place.tagline || place.description}
              </p>
            </div>

            <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span class="text-[11px] font-medium text-slate-600">
                ${place.priceText}
              </span>

              <div class="flex items-center gap-1.5">
                <button 
                  class="btn-quick-compare text-xs px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1 ${isComparing ? 'bg-blue-50 border-blue-300 text-blue-700' : ''}"
                  data-id="${place.id}"
                >
                  <i data-lucide="scale" class="w-3 h-3"></i>
                  <span>${isComparing ? 'Added' : 'Compare'}</span>
                </button>
                <button 
                  class="btn-open-details text-xs px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                  data-id="${place.id}"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    bindPlaceCardButtons(featuredContainer);
  }

  // ==========================================
  // 6. EXPLORE VIEW
  // ==========================================
  function renderExploreView() {
    const container = document.getElementById('places-container');
    const countBadge = document.getElementById('explore-results-count');
    if (!container) return;

    let filtered = state.places.filter(place => {
      if (state.activeCategory !== 'all' && place.category !== state.activeCategory) return false;
      if (state.activePriceFilter !== 'all' && place.priceTier !== state.activePriceFilter) return false;
      if (state.accessibilityOnly && (!place.accessibility || !place.accessibility.wheelchairAccessible)) return false;
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        const matchesName = place.name.toLowerCase().includes(query);
        const matchesCategory = place.categoryName.toLowerCase().includes(query);
        const matchesLocality = place.locality.toLowerCase().includes(query);
        const matchesDesc = place.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesLocality && !matchesDesc) return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      if (state.sortBy === 'rating') return b.rating - a.rating;
      if (state.sortBy === 'distance') return parseFloat(getDistanceForPlace(a)) - parseFloat(getDistanceForPlace(b));
      if (state.sortBy === 'reviews') return (b.reviewCount || 0) - (a.reviewCount || 0);
      if (state.sortBy === 'cleanliness') return (b.cleanlinessRating || 0) - (a.cleanlinessRating || 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

    if (countBadge) {
      countBadge.textContent = `Showing ${filtered.length} of ${state.places.length} places`;
    }

    container.className = state.isGridView
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
      : 'flex flex-col gap-4';

    container.innerHTML = filtered.map(place => {
      const isSaved = state.savedPlaceIds.includes(place.id);
      const isComparing = state.comparePlaceIds.includes(place.id);
      const distance = getDistanceForPlace(place);
      const isWheelchair = place.accessibility && place.accessibility.wheelchairAccessible;

      return `
        <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group interactive-card">
          <div class="relative h-44 w-full bg-slate-100 overflow-hidden">
            <img 
              src="${place.image}" 
              alt="${place.name}" 
              class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              loading="lazy"
              onerror="this.src='hero.png'"
            >
            <div class="absolute top-3 left-3 flex items-center gap-1.5">
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/95 text-slate-800 backdrop-blur shadow-sm">
                ${place.categoryName}
              </span>
              ${isWheelchair ? `
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-800 flex items-center gap-1 shadow-sm" title="Wheelchair Accessible">
                  <i data-lucide="accessibility" class="w-3 h-3"></i>
                </span>
              ` : ''}
            </div>
            <button 
              class="btn-save-toggle absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-slate-700 hover:text-amber-500 flex items-center justify-center transition shadow-sm"
              data-id="${place.id}"
              title="Bookmark place"
            >
              <i data-lucide="bookmark" class="w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-500' : ''}"></i>
            </button>
            <div class="absolute bottom-2.5 left-3 text-white text-[11px] font-semibold bg-black/60 backdrop-blur px-2 py-0.5 rounded-md flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3 h-3 text-teal-300"></i>
              <span>${distance} away</span>
            </div>
          </div>

          <div class="p-4 flex-1 flex flex-col justify-between gap-3">
            <div>
              <div class="flex items-center justify-between gap-2 mb-1">
                <h3 class="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition leading-snug line-clamp-1">
                  ${place.name}
                </h3>
                <div class="flex items-center gap-1 text-xs font-bold text-amber-600 shrink-0">
                  <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
                  <span>${place.rating}</span>
                </div>
              </div>
              <p class="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                ${place.tagline || place.description}
              </p>
            </div>

            <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-700">${place.priceText}</span>

              <div class="flex items-center gap-1.5">
                <button 
                  class="btn-quick-compare text-xs px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1 ${isComparing ? 'bg-blue-50 border-blue-300 text-blue-700' : ''}"
                  data-id="${place.id}"
                >
                  <i data-lucide="scale" class="w-3 h-3"></i>
                  <span>${isComparing ? 'Added' : 'Compare'}</span>
                </button>
                <button 
                  class="btn-open-details text-xs px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                  data-id="${place.id}"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    bindPlaceCardButtons(container);
  }

  function bindPlaceCardButtons(container) {
    if (!container) return;

    container.querySelectorAll('.btn-open-details').forEach(btn => {
      btn.addEventListener('click', () => openPlaceDetailModal(btn.getAttribute('data-id')));
    });

    container.querySelectorAll('.btn-save-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSavePlace(btn.getAttribute('data-id'));
      });
    });

    container.querySelectorAll('.btn-quick-compare').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleComparePlace(btn.getAttribute('data-id'));
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // 7. VIBEMATCH MODULE
  // ==========================================
  function renderVibeMatchView() {
    const cardsContainer = document.getElementById('vibe-cards-container');
    const resultsGrid = document.getElementById('vibe-results-grid');
    const matchTitle = document.getElementById('vibe-match-title');
    const matchCount = document.getElementById('vibe-match-count');

    if (!cardsContainer || !window.VIBEMATCH_PROFILES) return;

    // 1. Render Vibe selection buttons
    cardsContainer.innerHTML = window.VIBEMATCH_PROFILES.map(vibe => {
      const isActive = vibe.id === state.activeVibeId;
      return `
        <button 
          class="vibe-profile-card p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
            isActive 
              ? 'bg-purple-50 border-purple-400 shadow-md ring-2 ring-purple-500/20' 
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
          }"
          data-vibe="${vibe.id}"
        >
          <div class="flex items-center justify-between">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-tr ${vibe.color} text-white flex items-center justify-center shadow-xs">
              <i data-lucide="${vibe.icon}" class="w-4 h-4"></i>
            </div>
            ${isActive ? '<span class="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">Active</span>' : ''}
          </div>
          <div>
            <h4 class="font-bold text-xs text-slate-900 leading-snug">${vibe.name}</h4>
            <p class="text-[11px] text-slate-500 mt-0.5 line-clamp-2">${vibe.description}</p>
          </div>
        </button>
      `;
    }).join('');

    // Bind click handlers to vibe selection
    cardsContainer.querySelectorAll('.vibe-profile-card').forEach(card => {
      card.addEventListener('click', () => {
        state.activeVibeId = card.getAttribute('data-vibe');
        renderVibeMatchView();
      });
    });

    // 2. Render Matched places
    const activeProfile = window.VIBEMATCH_PROFILES.find(v => v.id === state.activeVibeId);
    if (!activeProfile || !resultsGrid) return;

    if (matchTitle) matchTitle.textContent = `Matched for: "${activeProfile.name}"`;

    const matchedPlaces = state.places.filter(p => activeProfile.matches.includes(p.id));
    if (matchCount) matchCount.textContent = `${matchedPlaces.length} places matched`;

    resultsGrid.innerHTML = matchedPlaces.map(place => {
      return `
        <div class="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between p-3.5 interactive-card">
          <div class="flex items-start gap-3">
            <img src="${place.image}" alt="${place.name}" class="w-20 h-20 rounded-xl object-cover shrink-0" onerror="this.src='hero.png'">
            <div class="min-w-0">
              <span class="text-[9px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                ${place.categoryName}
              </span>
              <h4 class="font-bold text-xs text-slate-900 mt-1 truncate">${place.name}</h4>
              <p class="text-[11px] text-slate-500 mt-0.5 line-clamp-2">${place.tagline || place.description}</p>
            </div>
          </div>
          <div class="pt-2 mt-2 border-t border-slate-200 flex items-center justify-between text-xs">
            <span class="font-bold text-amber-600">★ ${place.rating}</span>
            <button class="btn-open-details text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition" data-id="${place.id}">
              View Details
            </button>
          </div>
        </div>
      `;
    }).join('');

    resultsGrid.querySelectorAll('.btn-open-details').forEach(btn => {
      btn.addEventListener('click', () => openPlaceDetailModal(btn.getAttribute('data-id')));
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // 8. POCKETGUARD SAFETY GUARDIAN
  // ==========================================
  function renderPocketGuardView() {
    const radarFeed = document.getElementById('pocketguard-radar-feed');
    const lightingScore = document.getElementById('pocketguard-lighting-score');
    const lightingStatus = document.getElementById('pocketguard-lighting-status');

    if (lightingScore && window.CITY_TWIN_DATA) {
      const match = window.CITY_TWIN_DATA.neighborhoodLighting.find(l => l.name.toLowerCase().includes(state.userLocality))
                    || window.CITY_TWIN_DATA.neighborhoodLighting[0];
      lightingScore.textContent = `${match.index}%`;
      if (lightingStatus) lightingStatus.textContent = match.status;
    }

    // PocketGuard Budget Calculator (INR ₹)
    const budgetSelectedText = document.getElementById('pocketguard-selected-budget-text');
    const foodVal = document.getElementById('budget-food-val');
    const transitVal = document.getElementById('budget-transit-val');
    const ticketsVal = document.getElementById('budget-tickets-val');
    const bufferVal = document.getElementById('budget-buffer-val');
    const budgetPlacesContainer = document.getElementById('pocketguard-budget-places');

    if (window.POCKETGUARD_BUDGET_TIERS) {
      const currentTier = window.POCKETGUARD_BUDGET_TIERS.find(t => t.id === state.pocketguardTier)
                          || window.POCKETGUARD_BUDGET_TIERS[1];

      if (budgetSelectedText) {
        budgetSelectedText.textContent = `Selected: ₹${currentTier.totalBudget.toLocaleString('en-IN')}`;
      }
      if (foodVal) foodVal.textContent = `₹${currentTier.breakdown.food.toLocaleString('en-IN')}`;
      if (transitVal) transitVal.textContent = `₹${currentTier.breakdown.transport.toLocaleString('en-IN')}`;
      if (ticketsVal) ticketsVal.textContent = `₹${currentTier.breakdown.tickets.toLocaleString('en-IN')}`;
      if (bufferVal) bufferVal.textContent = `₹${currentTier.breakdown.buffer.toLocaleString('en-IN')}`;

      // Update preset buttons styling
      document.querySelectorAll('.pocketguard-preset-btn').forEach(btn => {
        const isSelected = btn.getAttribute('data-tier') === currentTier.id;
        if (isSelected) {
          btn.className = 'pocketguard-preset-btn px-3 py-1.5 rounded-xl border border-emerald-400 text-xs font-semibold text-emerald-800 bg-emerald-50 shadow-xs transition active-preset';
        } else {
          btn.className = 'pocketguard-preset-btn px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition';
        }
      });

      // Render recommended places for this budget tier
      if (budgetPlacesContainer) {
        const recommended = (currentTier.recommendedPlaces || [])
          .map(id => state.places.find(p => p.id === id))
          .filter(Boolean);

        if (recommended.length > 0) {
          budgetPlacesContainer.innerHTML = recommended.map(place => `
            <div class="bg-slate-50 hover:bg-white border border-slate-200 rounded-xl p-2.5 flex items-center gap-3 transition cursor-pointer hover:shadow-xs group" onclick="CityPulse.openDetails('${place.id}')">
              <img src="${place.image}" alt="${place.name}" class="w-12 h-12 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition" onerror="this.src='hero.png'">
              <div class="min-w-0 flex-1">
                <h4 class="font-bold text-xs text-slate-900 truncate group-hover:text-blue-600 transition">${place.name}</h4>
                <div class="text-[10px] text-slate-500 truncate">${place.locality} • ${place.priceText}</div>
                <div class="text-[10px] font-semibold text-emerald-700 mt-0.5">⭐ ${place.rating} • ${place.categoryName}</div>
              </div>
            </div>
          `).join('');
        } else {
          budgetPlacesContainer.innerHTML = `<div class="text-xs text-slate-400 col-span-full py-2">Select a budget tier to view recommended spots.</div>`;
        }
      }
    }

    if (radarFeed) {
      radarFeed.innerHTML = state.safetyReports.map(rep => {
        return `
          <div class="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between gap-3 interactive-card">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  rep.statusType === 'verified' ? 'bg-emerald-100 text-emerald-800' :
                  rep.statusType === 'pending' ? 'bg-amber-100 text-amber-800' :
                  'bg-blue-100 text-blue-800'
                }">
                  ${rep.status}
                </span>
                <span class="text-[10px] font-mono text-slate-400">
                  ${rep.timeAgo || 'Recently'}
                </span>
              </div>

              <h3 class="font-bold text-slate-900 text-sm leading-snug">${rep.title}</h3>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">${rep.description}</p>
            </div>

            <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span class="flex items-center gap-1 font-medium text-slate-700">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-rose-500"></i>
                <span>${rep.locationName}</span>
              </span>
              <span class="text-[11px] font-semibold text-slate-600">${rep.upvotes || 0} confirmations</span>
            </div>
          </div>
        `;
      }).join('');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // 9. CITY TWIN DIGITAL URBAN PULSE
  // ==========================================
  function renderCityTwinView() {
    const corridorsList = document.getElementById('citytwin-corridors-list');
    const timeEl = document.getElementById('twin-telemetry-time');
    const plansContainer = document.getElementById('citytwin-plans-container');

    if (timeEl) {
      timeEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    if (corridorsList && window.CITY_TWIN_DATA) {
      corridorsList.innerHTML = window.CITY_TWIN_DATA.trafficCorridors.map(c => `
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <h4 class="font-bold text-xs text-slate-900">${c.name}</h4>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${c.color}">
              ${c.status}
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs font-mono font-bold text-slate-800">${c.speed}</span>
            <div class="text-[10px] text-slate-400">Avg Speed</div>
          </div>
        </div>
      `).join('');
    }

    if (plansContainer && window.CITY_TWIN_OUTING_PLANS) {
      plansContainer.innerHTML = window.CITY_TWIN_OUTING_PLANS.map(plan => `
        <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between gap-4">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                ${plan.costText} / person
              </span>
              <span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${plan.safetyIndex >= 85 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                Safety: ${plan.safetyIndex}%
              </span>
            </div>

            <h3 class="font-extrabold text-slate-900 text-base brand-font mb-1">${plan.name}</h3>
            <p class="text-xs text-slate-600 mb-3">${plan.subtitle}</p>

            <div class="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3 font-medium text-slate-700">
              <div>📍 Dist: <span class="font-bold text-slate-900">${plan.distanceKm} km</span></div>
              <div>⏱ Transit: <span class="font-bold text-slate-900">${plan.transitTime}</span></div>
              <div>☀️ Sun: <span class="font-bold text-slate-900">${plan.sunExposure}</span></div>
              <div>👥 Crowds: <span class="font-bold text-slate-900">${plan.crowdLevel}</span></div>
            </div>

            <div class="mb-3">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Stops & Key Milestones</span>
              <div class="flex flex-wrap gap-1.5">
                ${plan.stops.map(stop => `<span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60">${stop}</span>`).join('')}
              </div>
            </div>

            <p class="text-[11px] text-slate-500 italic">💡 ${plan.highlights}</p>
          </div>

          <button class="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm" onclick="window.location.hash='#vibematch'">
            <i data-lucide="compass" class="w-3.5 h-3.5"></i>
            <span>Adopt This Outing Plan</span>
          </button>
        </div>
      `).join('');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // 10. CROWDSIGNAL CIVIC REPORTING
  // ==========================================
  function renderCrowdSignalFeed() {
    const container = document.getElementById('crowdsignal-feed-container');
    if (!container) return;

    container.innerHTML = state.safetyReports.map(rep => `
      <div class="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between gap-3 interactive-card">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              rep.statusType === 'verified' ? 'bg-emerald-100 text-emerald-800' :
              rep.statusType === 'pending' ? 'bg-amber-100 text-amber-800' :
              'bg-blue-100 text-blue-800'
            }">
              ${rep.status}
            </span>
            <span class="text-[10px] text-slate-400 font-mono">
              ${rep.timeAgo || 'Recently'}
            </span>
          </div>

          <h3 class="font-bold text-slate-900 text-sm leading-snug">${rep.title}</h3>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed">${rep.description}</p>
        </div>

        <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span class="flex items-center gap-1 font-medium text-slate-700">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-rose-500"></i>
            <span>${rep.locationName}</span>
          </span>
          <button class="btn-upvote-signal text-[11px] font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1" data-id="${rep.id}">
            <i data-lucide="thumbs-up" class="w-3.5 h-3.5"></i>
            <span>${rep.upvotes || 0} Confirmations</span>
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.btn-upvote-signal').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const report = state.safetyReports.find(r => r.id === id);
        if (report) {
          report.upvotes = (report.upvotes || 0) + 1;
          saveStoredReports();
          renderCrowdSignalFeed();
          renderPocketGuardView();
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function handleCrowdSignalSubmit(e) {
    e.preventDefault();

    const category = document.getElementById('report-category-select').value;
    const title = document.getElementById('report-title-input').value.trim();
    const location = document.getElementById('report-location-input').value.trim();
    const description = document.getElementById('report-description-input').value.trim();
    const severity = document.getElementById('report-severity-select').value;
    const isAnonymous = document.getElementById('report-anonymous-toggle').checked;

    if (!title || !location || !description) {
      alert('Please fill out all required fields.');
      return;
    }

    const newReport = {
      id: `sig-${Date.now()}`,
      category: category,
      categoryLabel: category === 'lighting' ? 'Poor Streetlighting' :
                     category === 'hazard' ? 'Road Construction' :
                     category === 'accident' ? 'Accident-Prone Zone' :
                     category === 'theft' ? 'Theft Caution' : 'Harassment Alert',
      severity: severity,
      status: 'Pending review',
      statusType: 'pending',
      title: title,
      description: description,
      locationName: location,
      locality: 'Pune Central',
      lat: 18.5204 + (Math.random() - 0.5) * 0.03,
      lng: 73.8567 + (Math.random() - 0.5) * 0.03,
      reportedAt: new Date().toISOString(),
      timeAgo: 'Just now',
      upvotes: 1,
      source: isAnonymous ? 'Anonymous Punekar' : 'Citizen Signal'
    };

    state.safetyReports.unshift(newReport);
    saveStoredReports();

    document.getElementById('citizen-report-modal').classList.add('hidden');
    document.getElementById('citizen-report-modal').classList.remove('flex');
    document.getElementById('citizen-report-form').reset();

    renderCrowdSignalFeed();
    renderPocketGuardView();
    updateUserProfileStats();

    alert('CrowdSignal recorded! Marked as "Pending Review" in local demo session.');
  }

  // ==========================================
  // 11. CITYQUEST GAMIFIED TRAILS
  // ==========================================
  function renderCityQuestView() {
    const container = document.getElementById('cityquest-cards-container');
    if (!container || !window.CITYQUEST_TRAILS) return;

    container.innerHTML = window.CITYQUEST_TRAILS.map(quest => {
      const isCompleted = state.completedQuestIds.includes(quest.id);

      return `
        <div class="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between gap-4 interactive-card">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
              }">
                ${isCompleted ? '✓ Quest Completed' : `+${quest.xpReward} XP`}
              </span>
              <span class="text-xs font-semibold text-slate-500">${quest.duration}</span>
            </div>

            <h3 class="font-bold text-slate-900 text-base leading-snug">${quest.title}</h3>
            
            <div class="mt-2 flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 p-2 rounded-xl">
              <i data-lucide="${quest.badgeIcon}" class="w-4 h-4"></i>
              <span>Badge Reward: <strong>${quest.badgeName}</strong></span>
            </div>

            <div class="mt-3 flex flex-col gap-1.5 text-xs text-slate-600">
              <span class="font-bold text-[10px] uppercase text-slate-400">Quest Checkpoints:</span>
              ${quest.stops.map(s => `
                <div class="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                  <div>
                    <span class="font-bold text-slate-800">${s.name}</span>
                    <p class="text-[10px] text-slate-400">${s.desc}</p>
                  </div>
                  <button class="text-xs text-blue-600 font-semibold hover:underline" onclick="window.CityPulse.openDetails('${s.placeId}')">
                    Inspect
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100">
            <button 
              class="btn-complete-quest w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                isCompleted 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
              }"
              data-id="${quest.id}"
            >
              <i data-lucide="${isCompleted ? 'check' : 'award'}" class="w-4 h-4"></i>
              <span>${isCompleted ? 'Completed (XP Claimed)' : 'Complete Quest & Claim XP'}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.btn-complete-quest').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-id');
        if (!state.completedQuestIds.includes(qid)) {
          state.completedQuestIds.push(qid);
          saveStoredQuests();
          renderCityQuestView();
          updateUserProfileStats();
          alert('Congratulations! Quest completed. XP awarded to your user profile!');
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // 12. CULTURE & HERITAGE
  // ==========================================
  function renderHeritageView() {
    const placesContainer = document.getElementById('heritage-places-container');
    if (!placesContainer) return;

    const heritagePlaces = state.places.filter(p => p.category === 'historical' || p.category === 'cultural');
    placesContainer.innerHTML = heritagePlaces.map(place => `
      <div class="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row gap-4 interactive-card">
        <div class="w-full sm:w-44 h-36 rounded-xl overflow-hidden shrink-0 bg-slate-100">
          <img src="${place.image}" alt="${place.name}" class="w-full h-full object-cover" onerror="this.src='hero.png'">
        </div>
        <div class="flex-1 flex flex-col justify-between gap-2">
          <div>
            <div class="flex items-start justify-between gap-1">
              <h3 class="font-bold text-slate-900 text-base leading-snug">${place.name}</h3>
              <span class="text-xs font-bold text-amber-600">★ ${place.rating}</span>
            </div>
            <p class="text-slate-500 text-xs mt-1 line-clamp-2">${place.tagline}</p>
            <div class="mt-2 text-[11px] text-indigo-950 bg-indigo-50/60 p-2 rounded-lg line-clamp-2">
              <strong>History:</strong> ${place.history}
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span class="text-slate-500 font-medium">Timings: ${place.openingHours}</span>
            <button class="btn-open-details text-xs font-semibold text-blue-600 hover:underline" data-id="${place.id}">
              Read Full History →
            </button>
          </div>
        </div>
      </div>
    `).join('');

    placesContainer.querySelectorAll('.btn-open-details').forEach(btn => {
      btn.addEventListener('click', () => openPlaceDetailModal(btn.getAttribute('data-id')));
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // 13. BEST VS. WORST PLACE COMPARISON ENGINE
  // ==========================================
  function calculateCompositeScore(place) {
    const w = state.comparisonWeights;
    const totalWeight = w.safety + w.affordability + w.ratings + w.accessibility + w.cleanliness;

    let safetyScore = 80;
    if (place.safetyIndicator && place.safetyIndicator.includes('High')) safetyScore = 95;
    else if (place.safetyIndicator && place.safetyIndicator.includes('Moderate')) safetyScore = 70;

    let affScore = 75;
    if (place.priceTier === 'budget') affScore = 95;
    else if (place.priceTier === 'premium') affScore = 50;

    const ratingScore = Math.min(100, (place.rating / 5) * 100);
    const accessScore = place.accessibility && place.accessibility.wheelchairAccessible ? 95 : 45;
    const cleanScore = Math.min(100, ((place.cleanlinessRating || 4.2) / 5) * 100);

    const composite = (
      (safetyScore * w.safety) +
      (affScore * w.affordability) +
      (ratingScore * w.ratings) +
      (accessScore * w.accessibility) +
      (cleanScore * w.cleanliness)
    ) / (totalWeight || 1);

    return Math.round(composite);
  }

  function renderCompareMatrix() {
    const container = document.getElementById('compare-matrix-view');
    if (!container) return;

    if (state.comparePlaceIds.length === 0) {
      container.innerHTML = `
        <div class="bg-white rounded-2xl p-12 border border-slate-200 text-center flex flex-col items-center">
          <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <i data-lucide="scale" class="w-7 h-7"></i>
          </div>
          <h3 class="font-bold text-slate-900 text-base">No places currently selected for comparison</h3>
          <p class="text-xs text-slate-500 max-w-sm mt-1">
            Browse places in the Explore catalog and click <strong>"Add to Compare"</strong> to analyze ratings, accessibility, safety, and costs side by side.
          </p>
          <a href="#explore" class="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold">
            Explore Places to Compare
          </a>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const selectedPlaces = state.places.filter(p => state.comparePlaceIds.includes(p.id));
    const scores = selectedPlaces.map(p => ({ place: p, score: calculateCompositeScore(p) }));
    scores.sort((a, b) => b.score - a.score);
    const topPick = scores[0];

    container.innerHTML = `
      <div class="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center shrink-0">
            <i data-lucide="award" class="w-6 h-6"></i>
          </div>
          <div>
            <div class="text-[10px] uppercase font-bold tracking-wider text-teal-300">Algorithmic Best Fit</div>
            <h4 class="font-bold text-base leading-tight">
              ${topPick.place.name} is your top recommendation (${topPick.score}% match)
            </h4>
            <p class="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Based on your custom weights (${state.comparisonWeights.safety}% Safety, ${state.comparisonWeights.affordability}% Affordability).
            </p>
          </div>
        </div>

        <button class="btn-open-details px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shrink-0 shadow-md transition" data-id="${topPick.place.id}">
          View Top Recommendation
        </button>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <table class="w-full text-xs text-left text-slate-700">
          <thead class="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase text-[10px]">
            <tr>
              <th class="p-4 w-44">Comparison Metric</th>
              ${selectedPlaces.map(p => `
                <th class="p-4 min-w-[200px]">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-bold text-slate-900 line-clamp-1">${p.name}</span>
                    <button class="btn-remove-compare text-slate-400 hover:text-rose-600" data-id="${p.id}" title="Remove">✕</button>
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr class="bg-blue-50/40 font-bold">
              <td class="p-4 text-blue-900">Composite Match Score</td>
              ${selectedPlaces.map(p => {
                const s = calculateCompositeScore(p);
                return `
                  <td class="p-4">
                    <div class="flex items-center gap-2">
                      <span class="text-base text-blue-700">${s}%</span>
                      <div class="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div class="bg-blue-600 h-full rounded-full" style="width: ${s}%"></div>
                      </div>
                    </div>
                  </td>
                `;
              }).join('')}
            </tr>

            <tr>
              <td class="p-4 font-semibold text-slate-500">Destination Overview</td>
              ${selectedPlaces.map(p => `
                <td class="p-4">
                  <img src="${p.image}" class="w-full h-24 object-cover rounded-xl mb-2" alt="${p.name}" onerror="this.src='hero.png'">
                  <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">${p.categoryName}</span>
                </td>
              `).join('')}
            </tr>

            <tr>
              <td class="p-4 font-semibold text-slate-500">Rating & Reviews</td>
              ${selectedPlaces.map(p => `
                <td class="p-4">
                  <div class="font-bold text-amber-600 flex items-center gap-1">★ ${p.rating} / 5.0</div>
                  <div class="text-[10px] text-slate-500 mt-0.5">${(p.reviewCount || 10000).toLocaleString()} reviews</div>
                </td>
              `).join('')}
            </tr>

            <tr>
              <td class="p-4 font-semibold text-slate-500">Affordability</td>
              ${selectedPlaces.map(p => `
                <td class="p-4">
                  <div class="font-bold text-slate-900">${p.priceText}</div>
                  <div class="text-[10px] text-slate-500 mt-0.5">Est. ₹${p.costForTwo || '300'} for two</div>
                </td>
              `).join('')}
            </tr>

            <tr>
              <td class="p-4 font-semibold text-slate-500">Accessibility Profile</td>
              ${selectedPlaces.map(p => `
                <td class="p-4">
                  ${p.accessibility && p.accessibility.wheelchairAccessible
                    ? '<span class="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">✓ Accessible</span>'
                    : '<span class="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded text-[10px]">⚠️ Stone Steps</span>'}
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    container.querySelectorAll('.btn-remove-compare').forEach(btn => {
      btn.addEventListener('click', () => toggleComparePlace(btn.getAttribute('data-id')));
    });

    container.querySelectorAll('.btn-open-details').forEach(btn => {
      btn.addEventListener('click', () => openPlaceDetailModal(btn.getAttribute('data-id')));
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // 14. LEAFLET INTERACTIVE MAP
  // ==========================================
  function initMainLeafletMap() {
    const mapElement = document.getElementById('leaflet-map');
    if (!mapElement) return;

    if (!state.maps.main) {
      state.maps.main = L.map('leaflet-map', {
        center: [window.PUNE_CENTER.lat, window.PUNE_CENTER.lng],
        zoom: 13,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors • CityPulse AI'
      }).addTo(state.maps.main);

      state.maps.mainMarkersLayer = L.layerGroup().addTo(state.maps.main);
    }

    renderMapMarkers('all');
    state.maps.main.invalidateSize();
  }

  function renderMapMarkers(filterLayer) {
    if (!state.maps.main || !state.maps.mainMarkersLayer) return;
    state.maps.mainMarkersLayer.clearLayers();

    state.places.forEach(place => {
      if (filterLayer !== 'all' && filterLayer !== 'safety' && place.category !== filterLayer) return;
      if (filterLayer === 'safety') return;

      const pinClass = `pin-${place.category}`;
      let pinIconHtml = '📍';
      if (place.category === 'historical') pinIconHtml = '🏛️';
      else if (place.category === 'food' || place.category === 'streetfood') pinIconHtml = '🍛';
      else if (place.category === 'nature') pinIconHtml = '🌳';
      else if (place.category === 'hotel') pinIconHtml = '🏨';
      else if (place.category === 'shopping') pinIconHtml = '🛍️';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `<div class="custom-pin ${pinClass} w-8 h-8">${pinIconHtml}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([place.lat, place.lng], { icon: customIcon });
      const popupHtml = `
        <div class="p-3 w-64 text-slate-800">
          <div class="h-28 -mx-3 -mt-3 mb-2 overflow-hidden bg-slate-100">
            <img src="${place.image}" alt="${place.name}" class="w-full h-full object-cover" onerror="this.src='hero.png'">
          </div>
          <div class="text-[10px] uppercase font-bold text-blue-600 mb-0.5">${place.categoryName}</div>
          <h4 class="font-bold text-sm text-slate-900 leading-tight mb-1">${place.name}</h4>
          <div class="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span class="font-bold text-amber-600">★ ${place.rating}</span>
            <span>${place.priceText}</span>
          </div>
          <button class="w-full py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition" onclick="window.CityPulse.openDetails('${place.id}')">
            View Details
          </button>
        </div>
      `;
      marker.bindPopup(popupHtml);
      state.maps.mainMarkersLayer.addLayer(marker);
    });

    if (filterLayer === 'all' || filterLayer === 'safety') {
      state.safetyReports.forEach(rep => {
        const customWarnIcon = L.divIcon({
          className: 'custom-leaflet-warn',
          html: `<div class="custom-pin pin-safety-incident w-8 h-8 font-bold">⚠️</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });

        const marker = L.marker([rep.lat, rep.lng], { icon: customWarnIcon });
        const warnPopupHtml = `
          <div class="p-3 w-64 text-slate-800">
            <div class="flex items-center justify-between gap-1 mb-1">
              <span class="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                ${rep.categoryLabel}
              </span>
              <span class="text-[9px] font-mono text-slate-400">DEMO DATA</span>
            </div>
            <h4 class="font-bold text-sm text-slate-900 leading-tight mb-1">${rep.title}</h4>
            <p class="text-xs text-slate-600 mb-2 leading-relaxed">${rep.description}</p>
          </div>
        `;
        marker.bindPopup(warnPopupHtml);
        state.maps.mainMarkersLayer.addLayer(marker);
      });
    }
  }

  // ==========================================
  // 15. PLACE DETAIL MODAL
  // ==========================================
  function openPlaceDetailModal(placeId) {
    const place = state.places.find(p => p.id === placeId);
    if (!place) return;

    const modal = document.getElementById('place-detail-modal');
    if (!modal) return;

    document.getElementById('modal-place-img').src = place.image;
    document.getElementById('modal-place-img').onerror = function() { this.src = 'hero.png'; };
    document.getElementById('modal-place-category').textContent = place.categoryName;
    document.getElementById('modal-place-price').textContent = place.priceText;
    document.getElementById('modal-place-title').textContent = place.name;
    document.getElementById('modal-place-tagline').textContent = place.tagline || place.address;

    document.getElementById('modal-metric-rating').textContent = `${place.rating}/5.0`;
    document.getElementById('modal-metric-reviews').textContent = `${(place.reviewCount || 12000).toLocaleString()} reviews`;
    document.getElementById('modal-metric-hours').textContent = place.openingHours || '09:00 AM – 06:00 PM';
    document.getElementById('modal-metric-cleanliness').textContent = `${place.cleanlinessRating || 4.5}/5.0`;
    document.getElementById('modal-metric-cost').textContent = place.costForTwo || '₹300';
    document.getElementById('modal-place-desc').textContent = place.description;

    const historySection = document.getElementById('modal-history-section');
    if (place.history) {
      historySection.classList.remove('hidden');
      document.getElementById('modal-history-text').textContent = place.history;
    } else {
      historySection.classList.add('hidden');
    }

    const isAcc = place.accessibility && place.accessibility.wheelchairAccessible;
    document.getElementById('modal-acc-wheelchair-badge').innerHTML = isAcc
      ? '<span class="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold text-[10px]">✓ Accessible</span>'
      : '<span class="text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold text-[10px]">⚠️ Stone Steps</span>';

    document.getElementById('modal-acc-ramp').textContent = place.accessibility ? place.accessibility.rampAccess : 'Standard street access';
    document.getElementById('modal-acc-notes').textContent = place.accessibility ? place.accessibility.notes : '';
    document.getElementById('modal-safety-status-text').textContent = place.safetyIndicator || 'Normal conditions recorded';

    const saveBtn = document.getElementById('modal-toggle-save-btn');
    const saveLabel = document.getElementById('modal-save-label');
    const isSaved = state.savedPlaceIds.includes(place.id);
    saveLabel.textContent = isSaved ? 'Remove from Saved' : 'Save to Favourites';

    saveBtn.onclick = () => {
      toggleSavePlace(place.id);
      const nowSaved = state.savedPlaceIds.includes(place.id);
      saveLabel.textContent = nowSaved ? 'Remove from Saved' : 'Save to Favourites';
    };

    const compareBtn = document.getElementById('modal-add-compare-btn');
    const isComparing = state.comparePlaceIds.includes(place.id);
    compareBtn.innerHTML = `<i data-lucide="scale" class="w-3.5 h-3.5"></i><span>${isComparing ? 'Remove Compare' : 'Add to Compare'}</span>`;
    compareBtn.onclick = () => {
      toggleComparePlace(place.id);
      const nowComparing = state.comparePlaceIds.includes(place.id);
      compareBtn.innerHTML = `<i data-lucide="scale" class="w-3.5 h-3.5"></i><span>${nowComparing ? 'Remove Compare' : 'Add to Compare'}</span>`;
      if (window.lucide) window.lucide.createIcons();
    };

    const mapBtn = document.getElementById('modal-view-map-btn');
    mapBtn.onclick = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      window.location.hash = '#map';
      setTimeout(() => {
        if (state.maps.main) {
          state.maps.main.setView([place.lat, place.lng], 16);
        }
      }, 200);
    };

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // 16. SAVED PLACES (FAVOURITES)
  // ==========================================
  function renderSavedPlaces() {
    const container = document.getElementById('saved-places-container');
    if (!container) return;

    const saved = state.places.filter(p => state.savedPlaceIds.includes(p.id));

    if (saved.length === 0) {
      container.className = 'col-span-3 py-16 text-center flex flex-col items-center';
      container.innerHTML = `
        <div class="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3">
          <i data-lucide="bookmark-check" class="w-7 h-7"></i>
        </div>
        <h3 class="font-bold text-slate-800 text-base">You haven't saved any places yet</h3>
        <p class="text-xs text-slate-500 max-w-sm mt-1">Tap the bookmark icon on any Pune landmark or cafe to save it.</p>
        <a href="#explore" class="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold">
          Browse Destinations
        </a>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5';
    container.innerHTML = saved.map(place => `
      <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm flex flex-col group interactive-card">
        <div class="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img src="${place.image}" alt="${place.name}" class="w-full h-full object-cover" onerror="this.src='hero.png'">
          <button class="btn-save-toggle absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-amber-500 flex items-center justify-center" data-id="${place.id}">
            <i data-lucide="bookmark" class="w-4 h-4 fill-amber-400"></i>
          </button>
        </div>
        <div class="p-4 flex-1 flex flex-col justify-between gap-3">
          <div>
            <h3 class="font-bold text-slate-900 text-sm">${place.name}</h3>
            <p class="text-xs text-slate-500 mt-0.5 line-clamp-2">${place.tagline || place.description}</p>
          </div>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-700">${place.priceText}</span>
            <button class="btn-open-details text-xs px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold" data-id="${place.id}">
              Details
            </button>
          </div>
        </div>
      </div>
    `).join('');

    bindPlaceCardButtons(container);
  }

  function toggleSavePlace(placeId) {
    if (state.savedPlaceIds.includes(placeId)) {
      state.savedPlaceIds = state.savedPlaceIds.filter(id => id !== placeId);
    } else {
      state.savedPlaceIds.push(placeId);
    }
    saveStoredSaved();
    updateSavedCounters();
    updateUserProfileStats();
    renderExploreView();
    renderHomeView();
    if (state.currentView === 'saved') renderSavedPlaces();
  }

  function updateSavedCounters() {
    const sidebarCount = document.getElementById('sidebar-saved-count');
    const badgeDot = document.getElementById('saved-badge-dot');
    const count = state.savedPlaceIds.length;
    if (sidebarCount) sidebarCount.textContent = count;
    if (badgeDot) {
      if (count > 0) badgeDot.classList.remove('hidden');
      else badgeDot.classList.add('hidden');
    }
  }

  function toggleComparePlace(placeId) {
    if (state.comparePlaceIds.includes(placeId)) {
      state.comparePlaceIds = state.comparePlaceIds.filter(id => id !== placeId);
    } else {
      if (state.comparePlaceIds.length >= 3) {
        alert('You can compare a maximum of 3 places at once.');
        return;
      }
      state.comparePlaceIds.push(placeId);
    }
    saveStoredCompare();
    updateComparisonDock();
    renderExploreView();
    renderHomeView();
    if (state.currentView === 'compare') renderCompareMatrix();
  }

  function updateComparisonDock() {
    const dock = document.getElementById('floating-compare-dock');
    const countBadge = document.getElementById('header-compare-count');
    const dockText = document.getElementById('dock-compare-text');
    const count = state.comparePlaceIds.length;

    if (countBadge) countBadge.textContent = count;
    if (dock && dockText) {
      if (count > 0) {
        dock.classList.remove('hidden');
        dock.classList.add('flex');
        dockText.textContent = `${count} ${count === 1 ? 'place' : 'places'} selected for comparison`;
      } else {
        dock.classList.add('hidden');
        dock.classList.remove('flex');
      }
    }
  }

  // ==========================================
  // 17. AI CITY CONCIERGE (PULSEAI)
  // ==========================================
  function handleSendMessage() {
    const input = document.getElementById('chat-user-input');
    const message = input.value.trim();
    if (!message) return;

    input.value = '';
    appendChatMessage('user', message);

    setTimeout(() => {
      const response = generateAIResponse(message);
      appendChatMessage('ai', response.text, response.recommendedPlaces);
    }, 400);
  }

  function appendChatMessage(sender, text, places = []) {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'flex items-start justify-end gap-3' : 'flex items-start gap-3 max-w-2xl';

    if (sender === 'user') {
      messageDiv.innerHTML = `
        <div class="bg-blue-600 text-white rounded-2xl rounded-tr-none p-3.5 text-xs leading-relaxed max-w-md shadow-sm">
          ${text}
        </div>
        <div class="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
          You
        </div>
      `;
    } else {
      let placesHtml = '';
      if (places && places.length > 0) {
        placesHtml = `
          <div class="mt-3 flex flex-col gap-2 pt-2 border-t border-slate-200">
            <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Matching Places:</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${places.map(p => `
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between gap-2 shadow-xs">
                  <div>
                    <h5 class="font-bold text-slate-900 text-xs line-clamp-1">${p.name}</h5>
                    <span class="text-[10px] text-slate-500">${p.priceText} • ★ ${p.rating}</span>
                  </div>
                  <button class="text-[10px] px-2 py-1 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition" onclick="window.CityPulse.openDetails('${p.id}')">
                    View
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      messageDiv.innerHTML = `
        <div class="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
          AI
        </div>
        <div class="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-none p-4 text-xs leading-relaxed flex flex-col gap-2">
          <div>${text}</div>
          ${placesHtml}
        </div>
      `;
    }

    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;

    if (window.lucide) window.lucide.createIcons();
  }

  function generateAIResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('budget') || q.includes('cheap') || q.includes('under') || q.includes('affordable')) {
      const budgetSpots = state.places.filter(p => p.priceTier === 'budget').slice(0, 3);
      return {
        text: `Here is an authentic, budget-friendly day in Pune for under ₹500:
        <br><br>
        1. <strong>Morning:</strong> Start with breakfast at <em>Cafe Goodluck</em> or <em>Bedekar Misal</em> (₹100 - ₹150).<br>
        2. <strong>Heritage:</strong> Explore <em>Shaniwar Wada</em> (₹25 entry) and <em>Pataleshwar Caves</em> (Free entry).<br>
        3. <strong>Sunset:</strong> Enjoy city views atop <em>Vetal Tekdi</em> or <em>Saras Baug</em> (Free).`,
        recommendedPlaces: budgetSpots
      };
    }

    if (q.includes('compare') || q.includes('vs') || q.includes('versus')) {
      let p1 = state.places.find(p => p.id === 'pune-01');
      let p2 = state.places.find(p => p.id === 'pune-02');
      return {
        text: `Structured comparison between <strong>Shaniwar Wada</strong> and <strong>Aga Khan Palace</strong>:
        <br><br>
        • <strong>Historical Era:</strong> Shaniwar Wada was the seat of 18th-century Peshwas; Aga Khan Palace commemorates Mahatma Gandhi's 1942 Quit India internment.<br>
        • <strong>Accessibility:</strong> Aga Khan Palace features smooth paved garden pathways that are 100% senior & wheelchair friendly; Shaniwar Wada has cobblestones and stone steps on upper bastions.`,
        recommendedPlaces: [p1, p2]
      };
    }

    if (q.includes('accessible') || q.includes('wheelchair') || q.includes('senior')) {
      const accessiblePlaces = state.places.filter(p => p.accessibility && p.accessibility.wheelchairAccessible).slice(0, 3);
      return {
        text: `Here are verified accessible destinations in Pune equipped with step-free entrances, ramps, or elevators:`,
        recommendedPlaces: accessiblePlaces
      };
    }

    const fallbackPlaces = state.places.slice(0, 3);
    return {
      text: `Based on your request, here are top Pune destinations matching authentic culture, culinary heritage, and top ratings:`,
      recommendedPlaces: fallbackPlaces
    };
  }

  // ==========================================
  // 18. USER PROFILE WIDGET (LOWER RIGHT CORNER)
  // ==========================================
  function initUserProfile() {
    const toggleBtn = document.getElementById('profile-toggle-btn');
    const popover = document.getElementById('user-profile-popover');
    const closeBtn = document.getElementById('profile-close-btn');
    const nameBtn = document.getElementById('profile-btn-name');
    const cardName = document.getElementById('card-user-name');
    const cardEmail = document.getElementById('card-user-email');
    const editNameBtn = document.getElementById('profile-edit-name-btn');
    const viewSavedBtn = document.getElementById('profile-view-saved-btn');
    const localitySelect = document.getElementById('profile-locality-select');
    const prefWheelchair = document.getElementById('profile-pref-wheelchair');
    const prefHazards = document.getElementById('profile-pref-hazards');
    const chevronIcon = document.getElementById('profile-chevron-icon');

    if (nameBtn) nameBtn.textContent = state.userProfile.name;
    if (cardName) cardName.textContent = state.userProfile.name;
    if (cardEmail) cardEmail.textContent = state.userProfile.email;

    if (localitySelect && window.PUNE_LOCALITIES) {
      localitySelect.innerHTML = window.PUNE_LOCALITIES.map(loc => `
        <option value="${loc.id}" ${loc.id === state.userLocality ? 'selected' : ''}>
          📍 ${loc.name}
        </option>
      `).join('');

      localitySelect.addEventListener('change', (e) => {
        state.userLocality = e.target.value;
        localStorage.setItem('citypulse_locality', state.userLocality);
        const userLocSelect = document.getElementById('user-locality-select');
        if (userLocSelect) userLocSelect.value = state.userLocality;
        const chosen = window.PUNE_LOCALITIES.find(l => l.id === state.userLocality);
        if (chosen) {
          state.userCoords = { lat: chosen.lat, lng: chosen.lng };
        }
        renderExploreView();
        renderPocketGuardView();
        if (state.maps.main) {
          state.maps.main.setView([state.userCoords.lat, state.userCoords.lng], 13);
        }
      });
    }

    if (prefWheelchair) {
      prefWheelchair.checked = state.userProfile.wheelchairPriority;
      prefWheelchair.addEventListener('change', (e) => {
        state.userProfile.wheelchairPriority = e.target.checked;
        localStorage.setItem('citypulse_pref_wheelchair', e.target.checked ? 'true' : 'false');
        state.accessibilityOnly = e.target.checked;
        const accToggle = document.getElementById('accessibility-filter-toggle');
        if (accToggle) accToggle.checked = e.target.checked;
        renderExploreView();
      });
    }

    if (prefHazards) {
      prefHazards.checked = state.userProfile.hazardAlerts;
      prefHazards.addEventListener('change', (e) => {
        state.userProfile.hazardAlerts = e.target.checked;
        localStorage.setItem('citypulse_pref_hazards', e.target.checked ? 'true' : 'false');
      });
    }

    if (toggleBtn && popover) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = popover.classList.contains('hidden');
        if (isHidden) {
          popover.classList.remove('hidden');
          updateUserProfileStats();
          if (chevronIcon) chevronIcon.classList.add('rotate-180');
        } else {
          popover.classList.add('hidden');
          if (chevronIcon) chevronIcon.classList.remove('rotate-180');
        }
      });
    }

    if (closeBtn && popover) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popover.classList.add('hidden');
        if (chevronIcon) chevronIcon.classList.remove('rotate-180');
      });
    }

    document.addEventListener('click', (e) => {
      const widget = document.getElementById('user-profile-widget');
      if (popover && widget && !widget.contains(e.target)) {
        popover.classList.add('hidden');
        if (chevronIcon) chevronIcon.classList.remove('rotate-180');
      }
    });

    if (editNameBtn) {
      editNameBtn.addEventListener('click', () => {
        const newName = prompt('Enter your name or moniker:', state.userProfile.name);
        if (newName && newName.trim()) {
          state.userProfile.name = newName.trim();
          localStorage.setItem('citypulse_username', state.userProfile.name);
          if (nameBtn) nameBtn.textContent = state.userProfile.name;
          if (cardName) cardName.textContent = state.userProfile.name;
        }
      });
    }

    if (viewSavedBtn) {
      viewSavedBtn.addEventListener('click', () => {
        if (popover) popover.classList.add('hidden');
        if (chevronIcon) chevronIcon.classList.remove('rotate-180');
        window.location.hash = '#saved';
      });
    }

    updateUserProfileStats();
  }

  function updateUserProfileStats() {
    const statReports = document.getElementById('profile-stat-reports');
    const statSaved = document.getElementById('profile-stat-saved');
    const statXp = document.getElementById('profile-stat-xp');
    const localitySelect = document.getElementById('profile-locality-select');

    if (statReports) statReports.textContent = state.safetyReports.length;
    if (statSaved) statSaved.textContent = state.savedPlaceIds.length;
    if (statXp) {
      const xp = (state.savedPlaceIds.length * 40) + (state.safetyReports.length * 60) + (state.completedQuestIds.length * 150) + 50;
      statXp.textContent = `${xp} pts`;
    }
    if (localitySelect && localitySelect.value !== state.userLocality) {
      localitySelect.value = state.userLocality;
    }
  }

  // ==========================================
  // 19. GLOBAL LISTENERS & BINDINGS
  // ==========================================
  function setupEventListeners() {
    const globalSearch = document.getElementById('global-search-input');
    if (globalSearch) {
      globalSearch.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (state.currentView !== 'explore') window.location.hash = '#explore';
        const exploreSearch = document.getElementById('filter-search-input');
        if (exploreSearch) exploreSearch.value = state.searchQuery;
        renderExploreView();
      });
    }

    const heroInput = document.getElementById('hero-search-input');
    const heroBtn = document.getElementById('hero-search-btn');
    if (heroBtn && heroInput) {
      const doHeroSearch = () => {
        state.searchQuery = heroInput.value;
        window.location.hash = '#explore';
        const exploreSearch = document.getElementById('filter-search-input');
        if (exploreSearch) exploreSearch.value = state.searchQuery;
        renderExploreView();
      };
      heroBtn.addEventListener('click', doHeroSearch);
      heroInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doHeroSearch();
      });
    }

    document.querySelectorAll('.cat-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-pill').forEach(b => {
          b.classList.remove('active', 'bg-blue-600', 'text-white');
          b.classList.add('bg-slate-100', 'text-slate-700');
        });
        btn.classList.add('active', 'bg-blue-600', 'text-white');
        btn.classList.remove('bg-slate-100', 'text-slate-700');
        state.activeCategory = btn.getAttribute('data-cat');
        renderExploreView();
      });
    });

    document.querySelectorAll('.home-cat-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const cat = chip.getAttribute('data-category');
        state.activeCategory = cat;
        window.location.hash = '#explore';
        document.querySelectorAll('.cat-pill').forEach(b => {
          const match = b.getAttribute('data-cat') === cat;
          b.classList.toggle('active', match);
          b.classList.toggle('bg-blue-600', match);
          b.classList.toggle('text-white', match);
          b.classList.toggle('bg-slate-100', !match);
          b.classList.toggle('text-slate-700', !match);
        });
        renderExploreView();
      });
    });

    const exploreSearch = document.getElementById('filter-search-input');
    if (exploreSearch) {
      exploreSearch.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderExploreView();
      });
    }

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderExploreView();
      });
    }

    document.querySelectorAll('.price-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.price-pill').forEach(p => p.classList.remove('bg-slate-900', 'text-white'));
        pill.classList.add('bg-slate-900', 'text-white');
        state.activePriceFilter = pill.getAttribute('data-price');
        renderExploreView();
      });
    });

    const accToggle = document.getElementById('accessibility-filter-toggle');
    if (accToggle) {
      accToggle.addEventListener('change', (e) => {
        state.accessibilityOnly = e.target.checked;
        renderExploreView();
      });
    }

    const gridBtn = document.getElementById('view-toggle-grid');
    const listBtn = document.getElementById('view-toggle-list');
    if (gridBtn && listBtn) {
      gridBtn.addEventListener('click', () => {
        state.isGridView = true;
        gridBtn.classList.add('bg-slate-100', 'text-blue-600');
        listBtn.classList.remove('bg-slate-100', 'text-blue-600');
        renderExploreView();
      });
      listBtn.addEventListener('click', () => {
        state.isGridView = false;
        listBtn.classList.add('bg-slate-100', 'text-blue-600');
        gridBtn.classList.remove('bg-slate-100', 'text-blue-600');
        renderExploreView();
      });
    }

    document.querySelectorAll('.map-layer-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.map-layer-pill').forEach(p => {
          p.classList.remove('active', 'bg-blue-600', 'text-white');
          p.classList.add('bg-slate-100');
        });
        pill.classList.add('active', 'bg-blue-600', 'text-white');
        pill.classList.remove('bg-slate-100');
        renderMapMarkers(pill.getAttribute('data-layer'));
      });
    });

    const recenterBtn = document.getElementById('map-recenter-btn');
    if (recenterBtn) {
      recenterBtn.addEventListener('click', () => {
        if (state.maps.main) {
          state.maps.main.setView([window.PUNE_CENTER.lat, window.PUNE_CENTER.lng], 13);
        }
      });
    }

    ['safety', 'affordability', 'ratings', 'accessibility', 'cleanliness'].forEach(key => {
      const slider = document.getElementById(`weight-slider-${key}`);
      const label = document.getElementById(`weight-label-${key}`);
      if (slider && label) {
        slider.addEventListener('input', (e) => {
          state.comparisonWeights[key] = parseInt(e.target.value, 10);
          label.textContent = `${state.comparisonWeights[key]}%`;
          renderCompareMatrix();
        });
      }
    });

    const resetWeightsBtn = document.getElementById('reset-weights-btn');
    if (resetWeightsBtn) {
      resetWeightsBtn.addEventListener('click', () => {
        state.comparisonWeights = { safety: 35, affordability: 25, ratings: 20, accessibility: 10, cleanliness: 10 };
        ['safety', 'affordability', 'ratings', 'accessibility', 'cleanliness'].forEach(key => {
          const slider = document.getElementById(`weight-slider-${key}`);
          const label = document.getElementById(`weight-label-${key}`);
          if (slider) slider.value = state.comparisonWeights[key];
          if (label) label.textContent = `${state.comparisonWeights[key]}%`;
        });
        renderCompareMatrix();
      });
    }

    const clearCompareBtn = document.getElementById('clear-compare-tray-btn');
    if (clearCompareBtn) {
      clearCompareBtn.addEventListener('click', () => {
        state.comparePlaceIds = [];
        saveStoredCompare();
        updateComparisonDock();
        renderCompareMatrix();
      });
    }

    const clearSavedBtn = document.getElementById('clear-saved-all-btn');
    if (clearSavedBtn) {
      clearSavedBtn.addEventListener('click', () => {
        state.savedPlaceIds = [];
        saveStoredSaved();
        updateSavedCounters();
        renderSavedPlaces();
      });
    }

    const closePlaceModalBtn = document.getElementById('close-place-modal-btn');
    const placeModal = document.getElementById('place-detail-modal');
    if (closePlaceModalBtn && placeModal) {
      closePlaceModalBtn.addEventListener('click', () => {
        placeModal.classList.add('hidden');
        placeModal.classList.remove('flex');
      });
      placeModal.addEventListener('click', (e) => {
        if (e.target === placeModal) {
          placeModal.classList.add('hidden');
          placeModal.classList.remove('flex');
        }
      });
    }

    const reportModal = document.getElementById('citizen-report-modal');
    const openReportModal = () => {
      if (reportModal) {
        reportModal.classList.remove('hidden');
        reportModal.classList.add('flex');
      }
    };
    const closeReportModal = () => {
      if (reportModal) {
        reportModal.classList.add('hidden');
        reportModal.classList.remove('flex');
      }
    };

    const openReportModalBtn = document.getElementById('open-report-modal-btn');
    const pocketguardReportBtn = document.getElementById('pocketguard-report-btn');
    const crowdsignalNewBtn = document.getElementById('crowdsignal-new-btn');
    const closeReportModalBtn = document.getElementById('close-report-modal-btn');
    const cancelReportBtn = document.getElementById('cancel-report-btn');

    if (openReportModalBtn) openReportModalBtn.addEventListener('click', openReportModal);
    if (pocketguardReportBtn) pocketguardReportBtn.addEventListener('click', openReportModal);
    if (crowdsignalNewBtn) crowdsignalNewBtn.addEventListener('click', openReportModal);
    if (closeReportModalBtn) closeReportModalBtn.addEventListener('click', closeReportModal);
    if (cancelReportBtn) cancelReportBtn.addEventListener('click', closeReportModal);

    const reportForm = document.getElementById('citizen-report-form');
    if (reportForm) reportForm.addEventListener('submit', handleCrowdSignalSubmit);

    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatInput = document.getElementById('chat-user-input');
    if (sendChatBtn && chatInput) {
      sendChatBtn.addEventListener('click', handleSendMessage);
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSendMessage();
      });
    }

    document.querySelectorAll('.ai-prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.replace(/^[^\w]+/, '').trim();
        if (chatInput) {
          chatInput.value = text;
          handleSendMessage();
        }
      });
    });

    const clearChatBtn = document.getElementById('clear-chat-btn');
    if (clearChatBtn) {
      clearChatBtn.addEventListener('click', () => {
        const container = document.getElementById('chat-messages-container');
        if (container) {
          container.innerHTML = `
            <div class="flex items-start gap-3 max-w-2xl">
              <div class="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">AI</div>
              <div class="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-none p-4 text-xs leading-relaxed">
                Conversation reset. Ask me anything about Pune!
              </div>
            </div>
          `;
        }
      });
    }

    const gpsBtn = document.getElementById('btn-browser-gps');
    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              state.userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
              renderExploreView();
              renderPocketGuardView();
              if (state.maps.main) state.maps.main.setView([state.userCoords.lat, state.userCoords.lng], 14);
            },
            () => {
              alert('Geolocation denied or unavailable. You can use the Pune locality selector instead.');
            }
          );
        }
      });
    }

    // PocketGuard Preset Buttons
    document.querySelectorAll('.pocketguard-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.pocketguardTier = btn.getAttribute('data-tier');
        renderPocketGuardView();
      });
    });
  }

  // ==========================================
  // 20. GLOBAL NAMESPACE EXPORT
  // ==========================================
  window.CityPulse = {
    openDetails: openPlaceDetailModal
  };

})();
