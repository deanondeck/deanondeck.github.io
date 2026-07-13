/* Site content — copy + data driving each section. Edit text here. */

export const NAV: [string, string][] = [
  ["The Difference", "#difference"],
  ["Ports", "#ports"],
  ["Reviews", "#reviews"],
  ["FAQs", "#faq"],
];

export const TICKER = [
  "No booking fees",
  "Sailor Loot included",
  "Priority boarding",
  "Gold-certified first mate",
  "Adults only · 18+",
  "5-star sailor reviews",
];

export const SHOWCASE = [
  { img: "ship-beach", tag: "18+ only", t: "Adults-Only Voyages", d: "Every sailor is 18 or over. No exceptions — just pure grown-up freedom, bow to stern." },
  { img: "dining", tag: "Included", t: "Michelin-Inspired Dining", d: "20+ included restaurants, zero buffets, and not a single tray in sight." },
  { img: "spa", tag: "The Spa", t: "Wellness & Spa", d: "Thermal suites, fitness, and treatments tuned to long days at sea." },
  { img: "suite", tag: "RockStar", t: "Suites With a View", d: "VIP from the terminal on — private decks, a personal agent, the works." },
  { img: "balcony", tag: "Sea days", t: "Sea Days, Your Way", d: "A private balcony, a hammock, and a cold drink as the coast rolls by." },
  { img: "breakfast", tag: "Mornings", t: "Wake Up at Sea", d: "Slow mornings, room service, and a horizon that changes every day." },
];

// `q` = Virgin Voyages search filter for this destination (each validated to
// return live results). Region codes via selectedRegions; ports via selectedPorts.
export const PORTS = [
  { img: "port-caribbean", c: "Caribbean", t: "Sun & White Sand", q: "selectedRegions=CARIBBEAN" },
  { img: "port-greece", c: "Greece & Croatia", t: "The Adriatic", q: "selectedPorts=DBV,SPU,KTR,JTR,JMK,ATH,CFU" },
  { img: "port-italy", c: "Italy & the Med", t: "Old-World Coast", q: "selectedPorts=CIV,NAP,FLR,SAL,CTA,PMO,MLA" },
  { img: "port-spain", c: "Spain", t: "Iberian Nights", q: "selectedPorts=BCN,PMI,IBZ,AGP,VLC,ALC,CAD" },
  { img: "port-tropical", c: "Tropical Escapes", t: "Endless Summer", q: "selectedPorts=CMA,RTB,CTG,AUA,WIL,KRA,CZM,POP" },
  { img: "port-halong", c: "Far Horizons", t: "On Request", q: "selectedRegions=TRANSATLANTIC" },
];

export const BOARD = [
  "Bahamas", "San Juan", "Bimini", "Dubrovnik", "Santorini", "Mykonos",
  "Barcelona", "Mallorca", "Cannes", "Key West", "Costa Maya", "Roatán",
];

export const CORE = [
  "Richard's Rooftop — private sundeck, bar & nightly happy hour",
  "A dedicated RockStar Agent for dining, shows & requests",
  "Priority dining (120 days) & Shore Things (135 days)",
  "VIP boarding through a private entrance + priority off",
  "In-room bar — first round of full-size bottles on the house",
  "Private section at the Beach Club at Bimini",
];

export const MEGA = [
  "Unlimited drinks up to $25 + two bottles of wine daily",
  "Bottomless in-room bar, replenished every day",
  "Unlimited Redemption Spa thermal access",
  "Private transfers within 50 miles, or port parking",
  "Daily laundry, ironing & express service",
  'Upgraded "Work from Sea" Wi-Fi',
];

export const REVIEWS = [
  { q: "Dean is the absolute best. He spent hours making sure we got the exact suite I wanted. He genuinely cares — the only first mate we'll ever use.", who: "Hayley Preston", when: "Google Review" },
  { q: "Dean has made sure to take care of the small details to ensure we always have the best quality and value for our itineraries. Dean has the magic. Highly recommended.", who: "Colby Hansen", when: "Google Review" },
  { q: "He'll research every question you have and get fast results. Thanks Dean on Deck for making my trips stress-free and a fun vacation.", who: "Avid Reader", when: "Google Review" },
  { q: "Dean is amazing!!!!!!", who: "Bob Willford", when: "Google Review" },
  { q: "The attention to detail and personalized experiences were top-notch. I felt pampered and adventurous. Highly recommend.", who: "Natalie", when: "Sailor" },
  { q: "Dean elevated our Virgin Voyages experience beyond expectations — from RockStar service to unique excursions, every detail tailored perfectly.", who: "Ethan", when: "Sailor" },
];

/* "Voyage Distinction" — the old site's six signature experience cards. */
export const EXPERIENCES = [
  { img: "port-tropical", k: "Hidden gems", t: "Excursion Tours", d: "Itineraries that showcase hidden gems and must-see spots — think the Dominican Republic, done right." },
  { img: "port-sail", k: "Premium at sea", t: "Luxury Sailing Adventures", d: "Exclusive sailing experiences aboard Virgin Voyages with premium amenities and stunning ocean views. Greece, anyone?" },
  { img: "dining", k: "On & off ship", t: "Culinary Delights", d: "Savor local flavors with gourmet dining experiences crafted by top chefs on and off the ship." },
  { img: "port-greece", k: "Guided", t: "Cultural Immersion", d: "Engage with the rich history and vibrant culture of every region through guided tours and local interactions. Amsterdam awaits." },
  { img: "spa", k: "Recharge", t: "Wellness Retreats", d: "Relax and rejuvenate with yoga, spa treatments, and meditation. Sky Lagoon, Iceland is calling." },
  { img: "palm", k: "Thrill-seekers", t: "Adventure Excursions", d: "Snorkeling, hiking, and more — tailored to your interests and skill level. Anguilla sets the bar." },
];

/* "From the Deck" — dispatches carried over from the old site's story wall. */
export const JOURNAL = [
  { k: "Pacific Northwest", t: "Waterfalls & Pike Place", d: "Seattle is incredible — Pike Place Market and the Space Needle define the skyline, and beyond the city you'll find breathtaking waterfalls and a world-class culinary scene.", sea: "Seattle, WA" },
  { k: "Shore things", t: "Whale Watching on the Swiftsure", d: "Out of Port Townsend, the Swiftsure is a high-speed, wave-piercing catamaran with a wrap-around viewing deck — prime territory for getting up close with the whales.", sea: "Port Townsend, WA" },
  { k: "Latest experience", t: "Sitka, Alaska", d: "Wildlife cruises past sea otters, whales, and bears; an Alaskan seafood feast at Fin Island Lodge; kayaking glacier-carved fjords. A bucket-list stop — book Shore Things early.", sea: "Sitka, AK ⚓" },
  { k: "Signature night", t: "Scarlet Night", d: "Virgin's ship-wide immersive party replaces stuffy formal nights — pop-up performances, flash mobs, and acrobatics, ending in a late-night pool party. Express yourself.", sea: "Every voyage" },
  { k: "The view", t: "The Space Needle", d: "A must-see that truly stands out. From the scenery to the atmosphere, it's the kind of place that stays with you long after you leave.", sea: "Seattle, WA ⚓🔱" },
  { k: "Why I sail", t: "Life Is Great", d: "Nothing beats touching down somewhere new. Meeting people and diving into vibrant cultures enriches life in ways words can't capture. Now it's your turn to chase the horizon.", sea: "— Dean" },
];

/* Essential FAQs — Virgin fare tiers and the Pay-In-Full discount. */
export const FAQ = [
  {
    q: "Premium vs Essential vs Base — what's the difference?",
    body: [
      ["Premium", "The most polished non-suite path: Premium WiFi for two devices with streaming, a 60-day dining window, a $15 nightly bar tab per Sailor, priority pre-voyage support, guaranteed cabin selection with changes allowed, and maximum name-change flexibility."],
      ["Essential", "The balanced middle: Classic WiFi for one device, a 45-day dining window, guaranteed cabin selection with changes allowed, date changes outside 45 days, and fellow-Sailor name changes until 48 hours before sailing."],
      ["Base & Lock-It-In", "Base is the budget tradeoff, not \"the normal fare\" — stricter rules, a later dining window, and fewer ways to fix the booking later. Lock-It-In only makes sense when savings matter more than cabin choice and flexibility."],
    ],
  },
  {
    q: "How does the Pay-In-Full discount work?",
    body: [
      ["Eligibility", "Book at least 365 days before sailing, select Pay-In-Full at checkout, and pay the entire invoice — fare, taxes, fees, and optional protection — within two hours of booking."],
      ["What you save", "10% off the voyage fare (taxes, fees, and add-ons excluded). It stacks with second-sailor promotions and MNVV placeholder credits."],
      ["Eligible cabins", "XL Sea Terrace, Central Sea Terrace, Sea Terrace, Limited View Sea Terrace, Sea View, and Insider. Lock-It-In cabins are excluded."],
    ],
  },
  {
    q: "What is the MNVV advantage?",
    body: [
      ["My Next Virgin Voyage", "I maintain a supply of MNVV certificates. Book through me with one of these placeholders and you can receive an immediate $300 discount off your voyage fare plus Sailor Loot (onboard credit)."],
      ["Stack the perks", "MNVV combines with Sailor Bonus Loot, group booking bonuses, and seasonal online promotions — I'll line them all up for you."],
    ],
  },
  {
    q: "Already booked? Can Dean take over my booking?",
    body: [
      ["Switching First Mates", "If you booked in the last 30 days and haven't paid in full, I may be able to become your First Mate. You keep the same confirmation number, cabin, and rate — only the agency of record changes."],
      ["Honest answers", "Transfer rules depend on timing, payment status, and fare type. If it's possible, I'll walk you through it; if not, I'll tell you straight."],
    ],
  },
];

/* Beyond Virgin — the old site's expanded cruise-line portfolio. */
export const FLEET = [
  { k: "Families", t: "Royal Caribbean", d: "The ultimate choice for multi-generational families — groundbreaking onboard thrills and private island destinations." },
  { k: "Modern luxury", t: "Celebrity Cruises", d: "Sophisticated resort-style design, elevated dining, and curated global itineraries." },
  { k: "Ultra-luxury", t: "Silversea", d: "All-inclusive ultra-luxury, intimate small ships, and immersive butler-serviced expeditions." },
  { k: "Charters", t: "Atlantis Events", d: "The world's premier all-gay resort and cruise charters — unparalleled entertainment, unforgettable community." },
];
