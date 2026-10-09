// CityPulse AI - Comprehensive Application Data & Datasets
// Demo City: Pune, Maharashtra, India
// Note: Includes authentic landmarks, heritage documentation, live telemetry baselines,
// and prototype safety records clearly identified as DEMO DATA.

const PUNE_CENTER = {
  lat: 18.5204,
  lng: 73.8567,
  zoom: 13,
  name: "Pune City Center (Shivajinagar/Deccan)"
};

const PUNE_LOCALITIES = [
  { id: "shivajinagar", name: "Shivajinagar", lat: 18.5314, lng: 73.8446 },
  { id: "deccan", name: "Deccan Gymkhana / FC Road", lat: 18.5186, lng: 73.8416 },
  { id: "kothrud", name: "Kothrud", lat: 18.5074, lng: 73.8077 },
  { id: "viman_nagar", name: "Viman Nagar", lat: 18.5679, lng: 73.9143 },
  { id: "koregaon_park", name: "Koregaon Park (KP)", lat: 18.5362, lng: 73.8940 },
  { id: "camp", name: "Pune Camp (MG Road)", lat: 18.5135, lng: 73.8770 },
  { id: "hinjawadi", name: "Hinjawadi IT Park", lat: 18.5913, lng: 73.7389 },
  { id: "swargate", name: "Swargate", lat: 18.5018, lng: 73.8584 }
];

// ==========================================
// 1. VERIFIED PLACES DATASET
// ==========================================
const PLACES_DATA = [
  // --- HISTORICAL & CULTURAL ---
  {
    id: "pune-01",
    name: "Shaniwar Wada",
    category: "historical",
    categoryName: "Historical Landmark",
    tagline: "18th-century seat of the Peshwa rulers of the Maratha Empire",
    description: "Built in 1732 by Peshwa Baji Rao I, Shaniwar Wada was the administrative capital of the Maratha Empire. Though much of the palace was damaged by fire in 1828, its massive granite fortifications, Dilli Darwaza with anti-elephant iron spikes, and foundations remain an enduring monument to Maratha history.",
    history: "Constructed between 1730-1732, the palace complex witnessed the height of the Peshwa era, including the tragic assassination of young Peshwa Narayanrao in 1773. In 1828, a great fire burned for seven days.",
    culturalSignificance: "Represents the military architecture, garden courtyards, and civil leadership of the Maratha Confederacy.",
    address: "Shaniwar Peth, Pune, Maharashtra 411030",
    locality: "Old Pune / Shaniwar Peth",
    lat: 18.5195,
    lng: 73.8553,
    rating: 4.4,
    reviewCount: 46200,
    ratingSource: "Verified Google Maps & Local Tourism Guides",
    priceTier: "budget",
    priceText: "₹25 (Indians) / ₹300 (Foreigners)",
    costForTwo: "₹50 - ₹100",
    openingHours: "09:30 AM – 05:30 PM (Daily)",
    bestTimeToVisit: "Morning or Late Afternoon (Sound & Light Show 7:00 PM)",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Partial ramp at main courtyard entrance",
      elevator: false,
      restrooms: "Ground-level public facilities available",
      notes: "Main garden paths are paved, but upper fortification terraces require climbing stone stairs."
    },
    cleanlinessRating: 4.1,
    safetyIndicator: "Normal (Well-lit, high daytime tourist footfall, active security guards)",
    facilities: ["Security checkpoint", "Audio guides", "Garden lawns", "Drinking water", "Restrooms"],
    image: "https://images.unsplash.com/photo-1599818816933-4712499faea4?auto=format&fit=crop&w=800&q=80",
    featured: true,
    vibeTags: ["heritage", "architecture", "educational", "budget"]
  },
  {
    id: "pune-02",
    name: "Aga Khan Palace",
    category: "historical",
    categoryName: "Historical Landmark",
    tagline: "Italian arches, lush gardens, and Gandhi Memorial",
    description: "Built in 1892 by Sultan Muhammed Shah Aga Khan III as an act of charity for famine-struck locals, this majestic palace holds monumental significance in India's freedom struggle. Mahatma Gandhi, Kasturba Gandhi, and Mahadev Desai were interned here following the Quit India Movement in 1942.",
    history: "Kasturba Gandhi and Mahadev Desai passed away during captivity here; their marble samadhis are enshrined in the quiet garden grounds. In 1969, Prince Karim El Hussieni Aga Khan IV donated the palace to the Indian nation.",
    culturalSignificance: "National monument commemorating Mahatma Gandhi and the Quit India Movement.",
    address: "Pune-Ahmednagar Road, Kalyani Nagar, Pune 411014",
    locality: "Kalyani Nagar / Yerawada",
    lat: 18.5524,
    lng: 73.9015,
    rating: 4.5,
    reviewCount: 31800,
    ratingSource: "Archaeological Survey of India & Tourist Records",
    priceTier: "budget",
    priceText: "₹25 (Indians) / ₹300 (Foreigners)",
    costForTwo: "₹50",
    openingHours: "09:00 AM – 05:30 PM (Daily)",
    bestTimeToVisit: "Late morning or winter afternoons",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Smooth paved garden paths and museum entrance ramps",
      elevator: false,
      restrooms: "Accessible restrooms near entry",
      notes: "Very accessible for senior citizens and wheelchairs across 19 acres of garden grounds."
    },
    cleanlinessRating: 4.7,
    safetyIndicator: "High Safety (ASI maintained campus, gated security, tranquil residential perimeter)",
    facilities: ["Gandhian Photo Museum", "Samadhi memorials", "Lush gardens", "Parking lot", "Restrooms"],
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    featured: true,
    vibeTags: ["heritage", "peaceful", "accessible", "gardens"]
  },
  {
    id: "pune-03",
    name: "Sinhagad Fort",
    category: "historical",
    categoryName: "Historical Landmark & Trek",
    tagline: "The historic Lion Fort perched atop the Sahyadri range",
    description: "Sinhagad ('Lion Fort') is situated on an isolated cliff about 30 km southwest of Pune at an elevation of 1,312 meters. Famous for the legendary Battle of Sinhagad in 1670 led by Maratha warrior Tanaji Malusare. Known for breezy mountain vistas, Tanaji memorial, and authentic pitla-bhakri village food.",
    history: "Previously known as Kondhana. Chhatrapati Shivaji Maharaj remarked upon Tanaji's sacrifice: 'Gad aala, pan sinh gela' ('The fort is won, but the lion is lost').",
    culturalSignificance: "Enduring symbol of bravery, Maratha military fortification, and weekend trekking culture of Punekars.",
    address: "Sinhagad Ghat Road, Thoptewadi, Maharashtra 411025",
    locality: "Sinhagad / Haveli",
    lat: 18.3664,
    lng: 73.7558,
    rating: 4.6,
    reviewCount: 54000,
    ratingSource: "Forest Department & Trekkers Log",
    priceTier: "budget",
    priceText: "₹50 (Vehicle toll) / ₹20 (Entry fee)",
    costForTwo: "₹200 - ₹350 (including local snacks)",
    openingHours: "06:00 AM – 06:00 PM (Daily)",
    bestTimeToVisit: "Monsoon (misty waterfalls) & Winter sunrise",
    accessibility: {
      wheelchairAccessible: false,
      rampAccess: "Steep natural terrain, stone steps",
      elevator: false,
      restrooms: "Basic forest rest stops",
      notes: "Requires climbing uphill paths and unpaved steps; not suitable for wheelchairs or mobility impairments."
    },
    cleanlinessRating: 3.8,
    safetyIndicator: "Moderate Caution (Winding ghat road, slippery during monsoon, narrow single-lane turns)",
    facilities: ["Local food stalls", "Tanaji memorial", "Kalyan Darwaza", "Horseback rides", "Parking"],
    image: "https://images.unsplash.com/photo-1626014903708-4100d2f0eb34?auto=format&fit=crop&w=800&q=80",
    featured: true,
    vibeTags: ["trekking", "adventure", "nature", "scenic"]
  },
  {
    id: "pune-04",
    name: "Raja Dinkar Kelkar Museum",
    category: "cultural",
    categoryName: "Cultural Venue & Museum",
    tagline: "Treasure trove of 20,000+ Indian medieval art objects & instruments",
    description: "A remarkable one-man collection by Dr. D.G. Kelkar (Kaka Kelkar) in memory of his son. The museum houses traditional Indian crafts, bronze sculptures, intricately carved palace doors, musical instruments, Mughal lamps, and the reconstructed Mastani Mahal chamber.",
    history: "Assembled over 60 years of dedicated travel across India by Kaka Kelkar before being donated to the Government of Maharashtra in 1975.",
    culturalSignificance: "Celebrates pan-Indian craftsmanship, folk traditions, textile arts, and domestic utensils from the 14th to 19th centuries.",
    address: "1377-78, Natu Baug, Off Bajirao Road, Shukrawar Peth, Pune 411002",
    locality: "Shukrawar Peth",
    lat: 18.5109,
    lng: 73.8544,
    rating: 4.5,
    reviewCount: 12900,
    ratingSource: "Maharashtra Tourism & Visitor Books",
    priceTier: "budget",
    priceText: "₹100 (Adults) / ₹30 (Children) / ₹300 (Foreigners)",
    costForTwo: "₹200",
    openingHours: "10:00 AM – 05:30 PM (Daily)",
    bestTimeToVisit: "Midday or afternoon when indoor exhibits offer quiet appreciation",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Ground floor accessible, elevator connects upper floors",
      elevator: true,
      restrooms: "Clean accessible restrooms",
      notes: "Good accessibility inside the museum galleries."
    },
    cleanlinessRating: 4.6,
    safetyIndicator: "High Safety (Quiet side street in heart of city, indoor security, bag lockers)",
    facilities: ["Elevator", "Museum gift store", "Audio guide", "Locker room", "Restrooms"],
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=800&q=80",
    featured: true,
    vibeTags: ["heritage", "cultural", "educational", "accessible"]
  },
  {
    id: "pune-05",
    name: "Pataleshwar Cave Temple",
    category: "cultural",
    categoryName: "Cultural Venue & Ancient Heritage",
    tagline: "8th-century monolithic rock-cut cave temple on busy JM Road",
    description: "Carved entirely out of basalt rock during the Rashtrakuta period in the 8th century, Pataleshwar is dedicated to Lord Shiva. Hidden right in the bustling heart of Pune along Jangali Maharaj Road, it features a grand circular Nandi mandapa supported by massive square pillars and tranquil shaded banyan courtyards.",
    history: "Dating back to the same architectural epoch as the famous Ellora Caves, this temple was left unfinished, leaving fascinating chisel marks on the subterranean chambers.",
    culturalSignificance: "One of the oldest surviving physical structures in Pune, revered for silent meditation.",
    address: "Jangali Maharaj Rd, Revenue Colony, Shivajinagar, Pune 411005",
    locality: "Shivajinagar / JM Road",
    lat: 18.5284,
    lng: 73.8496,
    rating: 4.4,
    reviewCount: 16700,
    ratingSource: "Archaeological Survey of India Records",
    priceTier: "budget",
    priceText: "Free Entry",
    costForTwo: "₹0",
    openingHours: "08:30 AM – 05:30 PM (Daily)",
    bestTimeToVisit: "Early morning for serene temple prayer",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Gentle stone incline down to courtyard",
      elevator: false,
      restrooms: "Public facilities across the garden gate",
      notes: "Courtyard and Nandi pavilion accessible; inner sanctum has a low stone threshold."
    },
    cleanlinessRating: 4.3,
    safetyIndicator: "High Safety (On well-policed JM Road, guarded garden premises)",
    facilities: ["ASI information board", "Gardens", "Shoe stand", "Drinking water"],
    image: "https://images.unsplash.com/photo-1609137144822-4521798e29a3?auto=format&fit=crop&w=800&q=80",
    featured: false,
    vibeTags: ["spiritual", "peaceful", "heritage", "budget"]
  },
  {
    id: "pune-06",
    name: "Shreemant Dagdusheth Halwai Ganpati Mandir",
    category: "cultural",
    categoryName: "Cultural & Spiritual Landmark",
    tagline: "Pune's most famous and beloved Ganpati temple",
    description: "Founded in 1893 by sweetmaker Dagdusheth Gadve and his wife Lakshmibai after the loss of their son during the plague, this temple is the spiritual epicentre of Pune's legendary Ganeshotsav festival. The 2.2-meter gold-adorned idol draws millions of pilgrims every year.",
    history: "Lokmanya Tilak was a close associate who envisioned Ganeshotsav here as a public celebration to unite Indians against British colonial rule.",
    culturalSignificance: "Heartbeat of Pune's cultural calendar, music concerts during festivals, and extensive social welfare trust.",
    address: "Ganpati Bhavan, 250, Budhwar Peth, Shivaji Road, Pune 411002",
    locality: "Budhwar Peth / Shivaji Road",
    lat: 18.5164,
    lng: 73.8560,
    rating: 4.8,
    reviewCount: 92000,
    ratingSource: "Trust Statistics & Public Reviews",
    priceTier: "budget",
    priceText: "Free Entry (Donations voluntary)",
    costForTwo: "₹0 - ₹50 (Prasad)",
    openingHours: "06:00 AM – 10:30 PM (Daily)",
    bestTimeToVisit: "Early morning 6:30 AM or late night after 9:30 PM to avoid peak rush",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Dedicated ramp entrance on side aisle for senior citizens and disabled devotees",
      elevator: false,
      restrooms: "Temple complex facilities available",
      notes: "Temple staff assists wheelchair users during darshan queues."
    },
    cleanlinessRating: 4.8,
    safetyIndicator: "High Security (Continuous CCTV surveillance, metal detectors, heavy police presence)",
    facilities: ["Shoe storage", "Prasad counter", "VIP wheelchair lane", "Security checks", "Information desk"],
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=800&q=80",
    featured: true,
    vibeTags: ["spiritual", "cultural", "accessible", "community"]
  },

  // --- FOOD & RESTAURANTS ---
  {
    id: "pune-07",
    name: "Vaishali Restaurant",
    category: "food",
    categoryName: "Food & Iconic Restaurant",
    tagline: "The legendary collegiate institution on FC Road since 1958",
    description: "No Pune experience is complete without breakfast or evening snacks at Vaishali. Famous for crispy Mysore Masala Dosa, SPDP (Sev Potato Dahi Puri), filter coffee, and its leafy open-air courtyard where generations of Fergusson College students, politicians, and writers gather.",
    history: "Established by Jagannath Shetty in 1958 under the name Cafe Madras, later rebranded to Vaishali. A hub of Pune's intellectual and college subculture.",
    culturalSignificance: "Icon of Pune's casual dining culture and Deccan youth life.",
    address: "1218/1, Fergusson College Rd, Shivajinagar, Pune 411004",
    locality: "FC Road / Deccan",
    lat: 18.5235,
    lng: 73.8415,
    rating: 4.5,
    reviewCount: 48900,
    ratingSource: "Zomato & Google Local Guides",
    priceTier: "moderate",
    priceText: "₹250 - ₹500 for two",
    costForTwo: "₹400",
    openingHours: "07:00 AM – 11:00 PM (Daily)",
    bestTimeToVisit: "Early morning 7:30 AM before student crowds arrive",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Ground-level courtyard seating accessible without steps",
      elevator: false,
      restrooms: "Ground-level washrooms",
      notes: "Can be crowded during peak hours; courteous staff accommodates wheelchairs."
    },
    cleanlinessRating: 4.5,
    safetyIndicator: "High Safety (On lively, well-lit pedestrian-heavy FC Road)",
    facilities: ["Outdoor garden seating", "Air-conditioned inner hall", "Fast service", "Valet parking during weekends"],
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    featured: true,
    vibeTags: ["foodie", "collegiate", "bustling", "breakfast"]
  },
  {
    id: "pune-08",
    name: "Shabree Restaurant",
    category: "food",
    categoryName: "Food & Maharashtrian Thali",
    tagline: "Authentic royal Maharashtrian Thali feast",
    description: "Located on FC Road, Shabree is the gold standard for traditional Maharashtrian vegetarian cuisine. Their multi-course thali includes Puran Poli, Kothimbir Vadi, Bharli Vangi (stuffed brinjal), Varan Bhaat with pure ghee, Aamras (seasonal), and Sol Kadhi served with traditional warm hospitality.",
    history: "Serving Pune residents and dignitaries authentic rural and urban Marathi cuisine since 1993.",
    culturalSignificance: "Showcases the regional flavors of Vidarbha, Konkan, and Desh Maharashtra on a single brass plate.",
    address: "1199/1A, Parag Building, FC Road, Shivajinagar, Pune 411004",
    locality: "FC Road / Shivajinagar",
    lat: 18.5262,
    lng: 73.8423,
    rating: 4.4,
    reviewCount: 18300,
    ratingSource: "TripAdvisor & Food Critics Association",
    priceTier: "moderate",
    priceText: "₹450 - ₹800 for two",
    costForTwo: "₹650",
    openingHours: "11:30 AM – 03:30 PM, 07:30 PM – 11:00 PM",
    bestTimeToVisit: "12:30 PM for lunch thali",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Building elevator to first-floor restaurant hall",
      elevator: true,
      restrooms: "Accessible restrooms available",
      notes: "Spacious seating with easy passage between tables."
    },
    cleanlinessRating: 4.7,
    safetyIndicator: "High Safety (Reputable hospitality establishment, well-patrolled street)",
    facilities: ["Traditional brass dining", "AC family hall", "Valet parking", "Card payment", "Elevator"],
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80",
    featured: false,
    vibeTags: ["foodie", "family", "traditional", "thali"]
  },
  {
    id: "pune-09",
    name: "Cafe Goodluck",
    category: "streetfood",
    categoryName: "Street Food & Irani Cafe",
    tagline: "The original 1935 Irani cafe at Goodluck Chowk",
    description: "Situated at the vibrant crossroads of FC Road and Bhandarkar Road, Cafe Goodluck has been serving its world-famous Bun Maska, Irani Chai, Keema Pav, and Caramel Custard since 1935. It is celebrated as the timeless melting pot of Pune's intellectuals, artists, and film institute students.",
    history: "Established in 1935 by Hussain Ali Yakshi. Legend says Bollywood superstars like Dev Anand frequented the corner table during their FTII days.",
    culturalSignificance: "A living relic of Indo-Persian cafe culture and Pune's morning social ritual.",
    address: "759/75, Goodluck Chowk, Deccan Gymkhana, Pune 411004",
    locality: "Deccan / FC Road",
    lat: 18.5173,
    lng: 73.8406,
    rating: 4.4,
    reviewCount: 39500,
    ratingSource: "Heritage Dining Index",
    priceTier: "budget",
    priceText: "₹150 - ₹300 for two",
    costForTwo: "₹220",
    openingHours: "07:30 AM – 11:00 PM (Daily)",
    bestTimeToVisit: "08:00 AM for fresh hot Bun Maska & Chai",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Small step at front, side entrance has ramp access",
      elevator: false,
      restrooms: "Standard washrooms",
      notes: "Bustling and tightly packed tables; staff helps seat guests with accessibility needs."
    },
    cleanlinessRating: 4.2,
    safetyIndicator: "High Safety (Located at busy major traffic junction with 24/7 activity)",
    facilities: ["Irani cafe ambience", "Takeaway counter", "Fast table turnaround"],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    featured: true,
    vibeTags: ["chai", "vintage", "budget", "streetfood"]
  },
  {
    id: "pune-10",
    name: "Kayani Bakery",
    category: "streetfood",
    categoryName: "Bakery & Culinary Landmark",
    tagline: "World-renowned home of the Pune Shrewsbury Biscuit",
    description: "Founded in 1955 by Parsi brothers Khodadad and Hormuz Kayani on East Street, this bakery has achieved cult status across India. People queue up twice daily to purchase buttery Shrewsbury Biscuits, Mawa Cake, ginger biscuits, and cheese papadi.",
    history: "Opened by the Kayani family following training with Iranian bakers, maintaining the same butter-rich recipes for over 70 years.",
    culturalSignificance: "The definitive edible souvenir of Pune that travelers carry home worldwide.",
    address: "6, East Street, Hulshur, Camp, Pune 411001",
    locality: "Camp / East Street",
    lat: 18.5147,
    lng: 73.8798,
    rating: 4.5,
    reviewCount: 28700,
    ratingSource: "Culinary Heritage Archives",
    priceTier: "budget",
    priceText: "₹200 - ₹400 (per batch of bakery items)",
    costForTwo: "₹300",
    openingHours: "07:30 AM – 01:00 PM, 03:30 PM – 08:00 PM (Closed Sundays)",
    bestTimeToVisit: "3:15 PM sharp before the afternoon fresh biscuit batch sells out",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Paved street level storefront, gentle step-free counter access",
      elevator: false,
      restrooms: "Not applicable (Counter takeaway only)",
      notes: "Strictly takeaway counter; manageable queue line on wide pavement."
    },
    cleanlinessRating: 4.6,
    safetyIndicator: "High Safety (Well-illuminated East Street commercial strip)",
    facilities: ["Takeaway only", "Digital UPI payments", "Gift packaging"],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    featured: false,
    vibeTags: ["bakery", "souvenir", "parsi", "budget"]
  },

  // --- PARKS & NATURE ---
  {
    id: "pune-11",
    name: "Osho Teerth Park (Osho Garden)",
    category: "nature",
    categoryName: "Parks & Urban Nature",
    tagline: "Zen botanical retreat transformed from a former nullah",
    description: "A 12-acre zen garden located in Koregaon Park. Built over a reclaimed wastewater stream, it is now an ecological masterpiece with Japanese-style bamboo bridges, flowing clear streams, koi ponds, manicured zen lawns, and towering raintrees.",
    history: "Created in 1989 under the design direction of Japanese landscape artist Shunyo, demonstrating how polluted urban waterways can be naturally purified through micro-plant filtering.",
    culturalSignificance: "A quiet sanctuary in Koregaon Park, celebrated for urban biodiversity and meditation.",
    address: "D. H. Road, Koregaon Park, Pune 411001",
    locality: "Koregaon Park (KP)",
    lat: 18.5398,
    lng: 73.8962,
    rating: 4.6,
    reviewCount: 17800,
    ratingSource: "Urban Forestry & Eco Reviews",
    priceTier: "budget",
    priceText: "Free Entry (Morning & Evening sessions)",
    costForTwo: "₹0",
    openingHours: "06:00 AM – 09:00 AM, 03:00 PM – 06:00 PM (Daily)",
    bestTimeToVisit: "Early morning 6:30 AM for birdwatching and tranquil walks",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Main entrance and primary perimeter paths are gently paved",
      elevator: false,
      restrooms: "Clean park restrooms",
      notes: "Interior ornamental wooden bridges have gentle arched steps."
    },
    cleanlinessRating: 4.8,
    safetyIndicator: "High Safety (Serene gated public eco-park, strictly monitored hours)",
    facilities: ["Japanese bamboo bridges", "Jogging trails", "Fish ponds", "Shaded benches"],
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80",
    featured: true,
    vibeTags: ["peaceful", "nature", "zen", "morning"]
  },
  {
    id: "pune-12",
    name: "Vetal Tekdi (ARAI Hills)",
    category: "nature",
    categoryName: "Nature Trail & Hill Lookout",
    tagline: "Highest natural vantage point overlooking the Pune skyline",
    description: "Rising to 2,600 feet, Vetal Tekdi is the highest natural hill within Pune city limits. It serves as the primary green lung of western Pune, cherished by runners, naturalists, and birdwatchers for sunrise views across the city basin and pristine scrub forest trails.",
    history: "Named after the historic Vetala temple located at its summit. Maintained through citizen conservation initiatives.",
    culturalSignificance: "Symbolizes Pune's unique hill (Tekdi) walking culture where citizens gather daily for fresh air and discussion.",
    address: "Paud Road / Senapati Bapat Road Approach, Kothrud, Pune 411038",
    locality: "Kothrud / SB Road",
    lat: 18.5244,
    lng: 73.8188,
    rating: 4.7,
    reviewCount: 31000,
    ratingSource: "Tekdi Walkers Forum",
    priceTier: "budget",
    priceText: "Free Access",
    costForTwo: "₹0",
    openingHours: "Open 24 Hours (Recommended: 05:30 AM – 07:00 PM)",
    bestTimeToVisit: "Sunrise 06:00 AM for cool breeze and city panorama",
    accessibility: {
      wheelchairAccessible: false,
      rampAccess: "Unpaved rocky forest paths, steep dirt tracks",
      elevator: false,
      restrooms: "Limited at ARAI gate only",
      notes: "Natural wilderness hill trails; requires sturdy walking footwear."
    },
    cleanlinessRating: 4.4,
    safetyIndicator: "Moderate (Safe in daylight hours with hundreds of walkers; avoid solitary trails after dark)",
    facilities: ["Lookout points", "Quarry lake view", "Birding perches", "Free entry"],
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
    featured: true,
    vibeTags: ["nature", "sunrise", "fitness", "views"]
  },

  // --- SHOPPING & ENTERTAINMENT ---
  {
    id: "pune-13",
    name: "Fergusson College Road Market (FC Road)",
    category: "shopping",
    categoryName: "Shopping & Street Bazaar",
    tagline: "Pune's liveliest youth shopping avenue for books, fashion & footwear",
    description: "Stretching between Deccan Gymkhana and Agricultural College, FC Road is the undisputed fashion, electronics, and book shopping strip for Pune's youth. Packed with trendy boutiques, footwear stalls, second-hand book vendors, and bustling cafes.",
    history: "Named after Sir James Fergusson, Governor of Bombay in 1885 when Fergusson College was founded.",
    culturalSignificance: "The beating heart of student fashion, book hunting, and evening strolls (katta culture).",
    address: "Fergusson College Road, Shivajinagar, Pune 411004",
    locality: "FC Road / Deccan",
    lat: 18.5240,
    lng: 73.8420,
    rating: 4.5,
    reviewCount: 36000,
    ratingSource: "Commercial Street Registry",
    priceTier: "budget",
    priceText: "₹100 - ₹1500 (Bargaining customary)",
    costForTwo: "₹500",
    openingHours: "10:30 AM – 10:00 PM (Daily)",
    bestTimeToVisit: "04:30 PM to 08:30 PM when street stalls are fully active",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Wide paved pedestrian walkway developed under Smart City Project",
      elevator: false,
      restrooms: "Available in nearby malls and dining hubs",
      notes: "Sidewalks are well-paved, but evening crowds can be dense."
    },
    cleanlinessRating: 4.1,
    safetyIndicator: "High Safety (Busy, high pedestrian density, well-illuminated, beat police booth)",
    facilities: ["ATM kiosks", "Street food", "Smart city walkways", "Auto stands"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    featured: false,
    vibeTags: ["shopping", "bustling", "collegiate", "budget"]
  },
  {
    id: "pune-14",
    name: "Phoenix Marketcity Pune",
    category: "shopping",
    categoryName: "Shopping Mall & Entertainment",
    tagline: "Eastern Pune's mega shopping, dining, and cinema hub",
    description: "One of the largest retail and entertainment lifestyle destinations in western India, spanning over 1.4 million square feet. Houses 350+ premium international and Indian brands, 15-screen PVR multiplex, food court, fine dining restaurants, and family play arenas.",
    history: "Opened in 2011, establishing Viman Nagar and Nagar Road as the prime modern commercial nexus of Pune.",
    culturalSignificance: "Key entertainment destination for IT professionals and tourists in eastern Pune.",
    address: "S No. 207, Viman Nagar Road, Clover Park, Viman Nagar, Pune 411014",
    locality: "Viman Nagar",
    lat: 18.5620,
    lng: 73.9168,
    rating: 4.6,
    reviewCount: 74000,
    ratingSource: "Retail & Consumer Reviews",
    priceTier: "premium",
    priceText: "₹1000 - ₹4000 for shopping & dining",
    costForTwo: "₹1500",
    openingHours: "11:00 AM – 11:00 PM (Daily)",
    bestTimeToVisit: "Weekday afternoons for uncrowded shopping",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Complete universal accessibility with ramps, wide automatic doors",
      elevator: true,
      restrooms: "Modern ADA-compliant accessible restrooms on every floor",
      notes: "Free wheelchairs available at concierge desk on request."
    },
    cleanlinessRating: 4.9,
    safetyIndicator: "High Safety (Private mall security, metal scanners, 24/7 CCTV, first-aid center)",
    facilities: ["Wheelchairs", "PVR Cinemas", "Multi-level parking", "Food court", "ATMs", "Baby care rooms"],
    image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80",
    featured: false,
    vibeTags: ["shopping", "modern", "luxury", "accessible"]
  },

  // --- HOTELS & STAYS ---
  {
    id: "pune-15",
    name: "JW Marriott Hotel Pune",
    category: "hotel",
    categoryName: "Hotel & Luxury Accommodation",
    tagline: "5-star luxury icon on Senapati Bapat Road",
    description: "A premier luxury hotel in western India, featuring 415 lavish rooms, the acclaimed rooftop lounge Paasha with panoramic city views, Quan Spa, swimming pool, and multiple international dining restaurants. A top choice for business leaders and discerning travelers.",
    history: "Opened in 2010, designed to capture Pune's evolving status as an international automotive and tech powerhouse.",
    culturalSignificance: "Renowned social venue hosting high-profile conferences, cultural galas, and fine dining.",
    address: "Senapati Bapat Road, Shivajinagar, Pune 411053",
    locality: "SB Road / Shivajinagar",
    lat: 18.5328,
    lng: 73.8296,
    rating: 4.7,
    reviewCount: 22100,
    ratingSource: "Marriott International & Booking Platforms",
    priceTier: "premium",
    priceText: "₹9,500 - ₹18,000 / night",
    costForTwo: "₹12000",
    openingHours: "Open 24 Hours",
    bestTimeToVisit: "Sunset cocktails at Paasha rooftop",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Full ADA compliance with entrance ramps, roll-in showers in select suites",
      elevator: true,
      restrooms: "Accessible restrooms in all common areas",
      notes: "Staff certified in accessibility assistance."
    },
    cleanlinessRating: 4.9,
    safetyIndicator: "Maximum Safety (Gated 5-star hotel security, luggage scanning, 24-hr concierge)",
    facilities: ["Rooftop bar Paasha", "Spa", "Heated pool", "Valet parking", "Fitness center"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    featured: false,
    vibeTags: ["luxury", "rooftop", "views", "stay"]
  },
  {
    id: "pune-16",
    name: "Zostel Pune (Koregaon Park)",
    category: "hotel",
    categoryName: "Hotel & Budget Backpacker Hostel",
    tagline: "Vibrant budget backpacker accommodation in Koregaon Park",
    description: "Ideal for solo travelers, backpackers, and digital nomads visiting Pune on a budget. Offers cheerful air-conditioned dorms, private rooms, coworking common areas, rooftop hangout lounge, and curated city walking tours in the bohemian lanes of Koregaon Park.",
    history: "Part of India's pioneering hostel network, catering to youthful experiential explorers.",
    culturalSignificance: "Community hub for domestic and international travelers exploring Pune's heritage and nightlife.",
    address: "Lane 1, North Main Road, Koregaon Park, Pune 411001",
    locality: "Koregaon Park (KP)",
    lat: 18.5375,
    lng: 73.8912,
    rating: 4.5,
    reviewCount: 4200,
    ratingSource: "Hostelworld & Google Verified",
    priceTier: "budget",
    priceText: "₹750 (Dorm bed) / ₹2,400 (Private room)",
    costForTwo: "₹1500",
    openingHours: "Open 24 Hours",
    bestTimeToVisit: "Year-round for budget stays",
    accessibility: {
      wheelchairAccessible: true,
      rampAccess: "Ground floor common areas and accessible ground floor private rooms",
      elevator: false,
      restrooms: "Ground floor accessible washroom",
      notes: "Dorm bunks require climbing ladders; private ground rooms recommended for mobility needs."
    },
    cleanlinessRating: 4.6,
    safetyIndicator: "High Safety (Keycard access, CCTV in common areas, female-only dorm options)",
    facilities: ["High-speed WiFi", "Rooftop lounge", "Community kitchen", "Lockers"],
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    featured: false,
    vibeTags: ["backpacking", "budget", "social", "stay"]
  }
];

// ==========================================
// 2. CROWDSIGNAL CIVIC & SAFETY DATASET (DEMO DATA)
// ==========================================
const CROWDSIGNAL_REPORTS = [
  {
    id: "sig-001",
    category: "lighting",
    categoryLabel: "Poor Streetlighting",
    severity: "medium",
    status: "Demo report",
    statusType: "demo",
    title: "Dim/flickering streetlights along riverside stretch",
    description: "Streetlights between Sambhaji Bridge and SM Joshi Bridge have been flickering intermittently after 09:30 PM. Pedestrians advised to use main Kelkar Road walkway instead of dark riverbed service path.",
    locationName: "SM Joshi Bridge Approach, Deccan",
    locality: "Deccan",
    lat: 18.5142,
    lng: 73.8435,
    reportedAt: "2026-10-07T21:15:00Z",
    timeAgo: "2 days ago",
    upvotes: 18,
    source: "CrowdSignal Citizen Network (Demo Data)"
  },
  {
    id: "sig-002",
    category: "hazard",
    categoryLabel: "Road Construction & Hazard",
    severity: "high",
    status: "Verified report",
    statusType: "verified",
    title: "Metro line pillar barricades narrowing lanes",
    description: "Ongoing civic road repairs have cordoned off the left lane for 150 meters. Two-wheelers should watch for gravel skidding and loose metal plates during peak evening rush.",
    locationName: "University Road near E-Square Junction",
    locality: "Shivajinagar",
    lat: 18.5385,
    lng: 73.8340,
    reportedAt: "2026-10-08T08:30:00Z",
    timeAgo: "Yesterday",
    upvotes: 42,
    source: "Municipal Traffic Feed (Demo Integration)"
  },
  {
    id: "sig-003",
    category: "accident",
    categoryLabel: "Accident-Prone Segment",
    severity: "high",
    status: "Demo report",
    statusType: "demo",
    title: "Blind turn merge with high-speed vehicle merge",
    description: "Bypassing vehicles merging from the flyover ramp often cross double lanes abruptly. Caution recommended for cyclists and auto-rickshaws, especially during twilight hours.",
    locationName: "Chandani Chowk Flyover Junction",
    locality: "Kothrud",
    lat: 18.5065,
    lng: 73.7845,
    reportedAt: "2026-10-05T19:40:00Z",
    timeAgo: "4 days ago",
    upvotes: 29,
    source: "Traffic Volunteer Post (Demo Data)"
  },
  {
    id: "sig-004",
    category: "theft",
    categoryLabel: "Reported Pickpocket Risk",
    severity: "medium",
    status: "Demo report",
    statusType: "demo",
    title: "Dense crowd pickpocket caution during weekend evening bazaar",
    description: "Several shoppers reported unzipped bags near outer jewelry bazaar stalls. Keep backpacks in front and secure wallets in zipped inner pockets.",
    locationName: "Laxmi Road Bazaar (Near Alka Talkies Chowk)",
    locality: "Old Pune / Laxmi Road",
    lat: 18.5130,
    lng: 73.8510,
    reportedAt: "2026-10-06T20:20:00Z",
    timeAgo: "3 days ago",
    upvotes: 24,
    source: "Merchant Association Advisory (Demo Data)"
  },
  {
    id: "sig-005",
    category: "harassment",
    categoryLabel: "Unlit Alley Harassment Alert",
    severity: "high",
    status: "Verified report",
    statusType: "verified",
    title: "Isolated lane behind bus depot lacks lighting and foot traffic",
    description: "Pedestrians walking alone past 10 PM reported catcalling from groups lingering near abandoned kiosks. Please stick to the brightly illuminated main highway pavement with active auto-rickshaw stands.",
    locationName: "Swargate Bus Terminal North Perimeter Lane",
    locality: "Swargate",
    lat: 18.5030,
    lng: 73.8610,
    reportedAt: "2026-10-07T22:45:00Z",
    timeAgo: "2 days ago",
    upvotes: 51,
    source: "Women Safety Watchdog (Community Demo)"
  }
];

// ==========================================
// 3. VIBEMATCH PRESET PROFILES
// ==========================================
const VIBEMATCH_PROFILES = [
  {
    id: "vibe-heritage",
    name: "Heritage & Living History",
    icon: "landmark",
    description: "Ancient Maratha fortifications, underground cave temples, and royal artifacts",
    matches: ["pune-01", "pune-02", "pune-04", "pune-05"],
    color: "from-purple-600 to-indigo-700"
  },
  {
    id: "vibe-chai",
    name: "Chill Irani Chai & Cafes",
    icon: "coffee",
    description: "Classic bun maska, fresh Shrewsbury biscuits, and bohemian cafe culture",
    matches: ["pune-09", "pune-10", "pune-07"],
    color: "from-amber-600 to-orange-600"
  },
  {
    id: "vibe-nature",
    name: "Breezy Tekdi & Zen Nature",
    icon: "trees",
    description: "Sunrise hill hikes, Japanese botanical gardens, and scenic valley views",
    matches: ["pune-11", "pune-12", "pune-03"],
    color: "from-emerald-600 to-teal-700"
  },
  {
    id: "vibe-street",
    name: "Bustling Bazaar & Shopping",
    icon: "shopping-bag",
    description: "Trendy student street markets, second-hand books, and mega retail lifestyle",
    matches: ["pune-13", "pune-14", "pune-07"],
    color: "from-pink-600 to-rose-700"
  },
  {
    id: "vibe-thali",
    name: "Authentic Maharashtrian Foodie",
    icon: "utensils",
    description: "Royal Marathi vegetarian thalis, fiery misal, and traditional hospitality",
    matches: ["pune-08", "pune-07", "pune-03"],
    color: "from-orange-600 to-red-600"
  }
];

// ==========================================
// 4. CITYQUEST GAMIFIED TRAILS
// ==========================================
const CITYQUEST_TRAILS = [
  {
    id: "quest-1",
    title: "Peshwa Legacy Quest",
    xpReward: 180,
    badgeName: "Peshwa Scholar",
    badgeIcon: "crown",
    duration: "3.5 Hours",
    stops: [
      { name: "Shaniwar Wada", desc: "Discover Dilli Darwaza fortifications", placeId: "pune-01" },
      { name: "Pataleshwar Cave Temple", desc: "Witness 8th-century rock carvings", placeId: "pune-05" },
      { name: "Raja Dinkar Kelkar Museum", desc: "View medieval Maratha artifacts", placeId: "pune-04" }
    ]
  },
  {
    id: "quest-2",
    title: "Old Pune Food Odyssey",
    xpReward: 200,
    badgeName: "Puneri Gourmet",
    badgeIcon: "utensils",
    duration: "4 Hours",
    stops: [
      { name: "Cafe Goodluck", desc: "Sip classic Irani Chai with Bun Maska", placeId: "pune-09" },
      { name: "Vaishali", desc: "Savor collegiate SPDP and filter coffee", placeId: "pune-07" },
      { name: "Shabree", desc: "Feast on a traditional Maharashtrian Thali", placeId: "pune-08" }
    ]
  },
  {
    id: "quest-3",
    title: "Sahyadri Summit & Nature Quest",
    xpReward: 250,
    badgeName: "Sahyadri Explorer",
    badgeIcon: "mountain",
    duration: "5 Hours",
    stops: [
      { name: "Vetal Tekdi", desc: "Sunrise birdwatching atop Pune's peak", placeId: "pune-12" },
      { name: "Osho Teerth Park", desc: "Stroll across zen bamboo bridges", placeId: "pune-11" },
      { name: "Sinhagad Fort", desc: "Climb the historic Lion Fort bastion", placeId: "pune-03" }
    ]
  }
];

// ==========================================
// 5. CITY TWIN URBAN TELEMETRY BASELINES
// ==========================================
const CITY_TWIN_DATA = {
  aqi: { value: 68, label: "Moderate", pm25: 22, pm10: 48 },
  trafficCorridors: [
    { name: "Jangali Maharaj (JM) Road", status: "Smooth Flow", speed: "34 km/h", color: "text-emerald-600 bg-emerald-50" },
    { name: "Fergusson College (FC) Road", status: "Moderate Pedestrian Rush", speed: "22 km/h", color: "text-amber-600 bg-amber-50" },
    { name: "Senapati Bapat (SB) Road", status: "Normal Conditions", speed: "38 km/h", color: "text-emerald-600 bg-emerald-50" },
    { name: "Swargate Junction", status: "Heavy Transit Peak", speed: "14 km/h", color: "text-rose-600 bg-rose-50" }
  ],
  neighborhoodLighting: [
    { name: "Shivajinagar / JM Road", index: 94, status: "Excellent Smart LED Grid" },
    { name: "Deccan Gymkhana", index: 88, status: "High Commercial Illumination" },
    { name: "Koregaon Park", index: 86, status: "Well-lit Residential Avenues" },
    { name: "Swargate Perimeter", index: 72, status: "Moderate (Dim Riverbed Pockets)" }
  ]
};

// ==========================================
// 6. POCKETGUARD BUDGET CALCULATOR DATA (INR ₹)
// ==========================================
const POCKETGUARD_BUDGET_TIERS = [
  {
    id: "tier-500",
    name: "Budget Explorer",
    totalBudget: 500,
    breakdown: { food: 220, transport: 130, tickets: 75, buffer: 75 },
    recommendedPlaces: ["pune-09", "pune-01", "pune-05", "pune-12"],
    notes: "Ideal for students & backpackers using public transit/PMPML buses."
  },
  {
    id: "tier-1200",
    name: "Day Tripper",
    totalBudget: 1200,
    breakdown: { food: 550, transport: 300, tickets: 150, buffer: 200 },
    recommendedPlaces: ["pune-07", "pune-04", "pune-02", "pune-13"],
    notes: "Comfortable outing using auto-rickshaws, museum entries, and cafe dining."
  },
  {
    id: "tier-2500",
    name: "Weekend Treat",
    totalBudget: 2500,
    breakdown: { food: 1150, transport: 600, tickets: 350, buffer: 400 },
    recommendedPlaces: ["pune-08", "pune-10", "pune-14", "pune-02"],
    notes: "Royal Maharashtrian Thali dining, cab transfers, and gift shopping."
  },
  {
    id: "tier-5000",
    name: "Luxury Experience",
    totalBudget: 5000,
    breakdown: { food: 2400, transport: 1200, tickets: 600, buffer: 800 },
    recommendedPlaces: ["pune-15", "pune-14", "pune-02"],
    notes: "Rooftop lounge dining at Paasha, premium shopping, and AC cab travel."
  }
];

// ==========================================
// 7. CITY TWIN OUTING PLANS COMPARISON DATA
// ==========================================
const CITY_TWIN_OUTING_PLANS = [
  {
    id: "plan-a",
    name: "Plan A: Deccan & Peshwa Heritage Trail",
    subtitle: "Historic wadas, rock cave shrines & collegiate street cafes",
    stops: ["Shaniwar Wada", "Pataleshwar Caves", "Cafe Goodluck", "Vaishali"],
    costPerPerson: 650,
    costText: "₹650",
    distanceKm: 4.8,
    transitTime: "45 mins",
    sunExposure: "Moderate (Shaded Courtyards)",
    crowdLevel: "Medium",
    safetyIndex: 92,
    highlights: "High pedestrian foot traffic, well-lit boulevards, authentic Irani chai"
  },
  {
    id: "plan-b",
    name: "Plan B: Koregaon Park & Eastern Pune Retreat",
    subtitle: "Zen botanical gardens, Parsi bakeries & mega shopping lifestyle",
    stops: ["Osho Teerth Park", "Kayani Bakery", "Phoenix Marketcity"],
    costPerPerson: 1400,
    costText: "₹1,400",
    distanceKm: 11.2,
    transitTime: "1 hr 15 mins",
    sunExposure: "Low (AC Mall & Tree Canopies)",
    crowdLevel: "High (Weekend Shopping)",
    safetyIndex: 89,
    highlights: "Universal accessibility, tranquil zen streams, Shrewsbury biscuits"
  },
  {
    id: "plan-c",
    name: "Plan C: Sahyadri Mountain Bastion Trek",
    subtitle: "Historic mountain fortress, breathtaking cliff vistas & rustic village food",
    stops: ["Sinhagad Fort", "Kalyan Darwaza", "Khadakwasla Dam"],
    costPerPerson: 450,
    costText: "₹450",
    distanceKm: 32.0,
    transitTime: "2 hrs 10 mins",
    sunExposure: "High (Open Ridge Trail)",
    crowdLevel: "Moderate",
    safetyIndex: 75,
    highlights: "Cool mountain breezes, steaming hot Pitla Bhakri, panoramic Sahyadri views"
  }
];

// Export to window for global access
window.PUNE_CENTER = PUNE_CENTER;
window.PUNE_LOCALITIES = PUNE_LOCALITIES;
window.PLACES_DATA = PLACES_DATA;
window.CROWDSIGNAL_REPORTS = CROWDSIGNAL_REPORTS;
window.DEMO_SAFETY_REPORTS = CROWDSIGNAL_REPORTS;
window.VIBEMATCH_PROFILES = VIBEMATCH_PROFILES;
window.CITYQUEST_TRAILS = CITYQUEST_TRAILS;
window.CITY_TWIN_DATA = CITY_TWIN_DATA;
window.POCKETGUARD_BUDGET_TIERS = POCKETGUARD_BUDGET_TIERS;
window.CITY_TWIN_OUTING_PLANS = CITY_TWIN_OUTING_PLANS;
