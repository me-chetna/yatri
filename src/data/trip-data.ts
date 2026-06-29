export type AttractionType = "attraction" | "restaurant" | "market" | "wellness";

export interface Attraction {
  id: string;
  name: string;
  type: AttractionType;
  lat: number;
  lng: number;
  rating: number;
  image: string;
  description: string;
  costINR: number;
  visitMinutes: number;
}

export interface Place {
  id: string;
  name: string;
  tagline: string;
  image: string;
  center: [number, number];
  zoom: number;
  attractions: Attraction[];
  /** Default itinerary as ordered attraction ids, grouped by day */
  defaultItinerary: string[][];
}

export interface State {
  id: string;
  name: string;
  tagline: string;
  vibe: string;
  gradient: string;
  emoji: string;
  image: string;
  places: Place[];
}

const img = (q: string, sig: number) => {
  // If a full custom URL is passed (like the Taj Mahal or Wikipedia ones), use it directly.
  if (q.startsWith("http")) return q;
  
  // Otherwise, use a unique seed index based on your current sig parameter
  const seedId = Math.abs(sig * 17) % 1000;
  return `https://picsum.photos/id/${seedId}/1200/700`;
};

const photos = {
  rajasthan: "https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-city-1-hero?qlt=82&ts=1742200253577",
  jaipurHero: "https://assets.cntraveller.in/photos/66a9ceb4f83738ee3d172870/master/w_1600%2Cc_limit/GettyImages-2057981768.jpg",
  hawaMahal: "https://www.worldtribune.org/wp-content/uploads/sites/2/2024/01/GettyImages-1191232894.jpg",
  amberFort: "https://s7ap1.scene7.com/is/image/incredibleindia/amber-fort-jaipur-rajasthan-1-attr-hero?qlt=82&ts=1742157903972",
  cityPalace: "https://s7ap1.scene7.com/is/image/incredibleindia/city-palace-jaipur-rajasthan-1?qlt=82&ts=1742164664970",
  jalMahal: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/c4/72/f6/jal-mahal-jaipur-tour.jpg?w=900&h=500&s=1",
  nahargarh: "photo-1524613032530-449a5d94c285https://www.fabhotels.com/blog/wp-content/uploads/2019/06/Nahargarh-fort_600.jpg",
  chokhi: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/64/14/90/chokhi-dhani-resort.jpg?w=900&h=500&s=1",
  laxmi: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/f3/9a/83/multi-cuisine-restaurant.jpg?w=900&h=500&s=1",
  johari: "https://media.assettype.com/outlooktraveller/import/outlooktraveller/public/uploads/articles/explore/files/2014/12/FS_083315102A10053671-Fav1.jpg?w=640",

  udaipur: "https://beantowntraveller.com/wp-content/uploads/2020/02/UNADJUSTEDNONRAW_thumb_b808-1024x680.jpg",
  lakePalace: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/77/ea/4b/royalty-meets-fairy-tale.jpg?w=900&h=500&s=1",

  goa: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2022/11/hours-in-goa-beaches-seafood-and-dance.jpg",
  baga: "https://static.toiimg.com/thumb/msid-59486326,width=1200,height=900/59486326.jpg",
  calangute: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRK0tKu5DXxxyF5rZ3-1LMjvbh1Z9h06yzKzx-Se2DSKtbZ5yCB80b4tI&s=10",
  anjuna: "https://www.tourmyindia.com/states/goa/image/anjuna-beach-banner.webp",
  fortAguada: "photo-1580974928064-f0aeef70895a",
  chapora: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/79/ac/35/chapora-beach.jpg?w=1200&h=-1&s=1",
  basilica: "https://www.tourmyindia.com/states/goa/image/basilica-of-bom-jesus-goa.webp",
  britto: "https://content.jdmagicbox.com/quickquotes/listicle/listicle_1719910172103_yxz9f_1000x667.jpg?impolicy=queryparam&im=Resize=(847,400),aspect=fit&q=75",
  thalassa: "https://don5wql5ofws9.cloudfront.net/media/itinerary_images/GoStops%2C%20Goa_%209.%20Thalassa%20Greek%20Taverna%20_%20Greek%20In%20Goa.webp",
  saturday: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg11iYAkv5LKzCq4ze7og0NInLG0CgZGZss_Mo42ks98e-6gtlIsmelYI&s=10",

  himachal: "https://lp-cms-production.imgix.net/2019-06/GettyImages-149353949_high.jpg",
  manali: "https://lp-cms-production.imgix.net/2019-06/GettyImages-149353949_high.jpg",
  hadimba: "https://media-cdn.tripadvisor.com/media/photo-s/0c/13/d0/3d/photo0jpg.jpg",
  solang: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOZaW5O6Ox5qTnXN5xRaDlIoXZIJY5qm2tyOEhK7OICiMRBsZCqEDAEl_o&s=10",
  rohtang: "https://s7ap1.scene7.com/is/image/incredibleindia/rohtang-pass-manali-himachal-pradesh-1-attr-hero?qlt=82&ts=1726730701545",
  vashisht: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfO3nkCvuUGLwWrL6z6LKZ27Zp1u5O_gjE6ZAmb7WACvATd8YZY5IGGJze&s=10",
  oldManali: "https://www.bookmarkresorts.com/wp-content/uploads/2023/10/Old-Manali.jpg",
  johnsons: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/ab/ab/96/johnson-lodge.jpg?w=900&h=500&s=1",
  cafe1947: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/27/92/27/the-view-is-amazing-food.jpg?w=1200&h=1200&s=1",
  mallRoad: "https://s7ap1.scene7.com/is/image/incredibleindia/the-mall-road-shimla-himachal-pradesh-3-attr-hero?qlt=82&ts=1742177571287",

  kerala: "https://static.toiimg.com/photo/58490365/.jpg",
  munnar: "https://static.toiimg.com/photo/58490365/.jpg",
  alleppey: "https://deih43ym53wif.cloudfront.net/large_alleppey-kerala-india-shutterstock_1154918653_25793b1171.jpeg",

  uttarakhand: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlxTAtD3LY0jqit6Mw6W5Hsiwps2gnx7YuP64FlvGeesGVUceaQ3NfQW-U&s=10",
  rishikesh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJlgPJKVS6xniShNQteme77xO6sSWTeWPt_2dbnqttKdUzXsVl9eGlONff&s=10",
  nainital: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2025/03/10153331/Places-to-visit-in-Nainital-FI--1600x900.jpg",

  tamilnadu: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbUcHC86TZrCDEhamTxNJdHPjP3pxGz1PX3Brqg3U-kDFaibTMJVSdPBJD&s=10",
  ooty: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbUcHC86TZrCDEhamTxNJdHPjP3pxGz1PX3Brqg3U-kDFaibTMJVSdPBJD&s=10",
  pondy: "https://greatindiantours.com/wp-content/uploads/2022/08/Pondicherry.jpg",

  agra: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIE-QBZX9yiau9280t0zyTz5TJ0wqwsYCrdn7Y7p6mNYMOq8uRjcDglS3&s=10",
  varanasi: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTsLQQkG9fboZAzCKwawqGvFoCiNgQQpfdjF9l5JeZnBsqD0Yu8JyTM_A&s=10",

  // Wellness / spa imagery
  wellnessSpa: "https://www.carecredit.com/sites/cc/image/day_spa_treatments.jpg",
  wellnessYoga: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2BgQ6LUkRA8ClV03uyDaXSXKw5cVWD4GHoe6Q5QMxdrK2KWvKzppVKgI&s=10",
  wellnessMeditation: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtqx6a45ffmigBqLi9Cl2FBLNckxeRCUXNRsnu-QxFNZHOfm0uJblYdHPS&s=10",
  wellnessAyurveda: "https://www.travancoreayurveda.com/wp-content/uploads/2025/10/TR-3.jpg",
  wellnessNature: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXHUdsfHsHQKb6W9OH7i5CKwHfPmmXRB8V_QChbhw7Z3oARjiIOTdmph0&s=10",
};

// ---- Jaipur ----
const jaipur: Place = {
  id: "jaipur",
  name: "Jaipur",
  tagline: "The Pink City",
  image: img(photos.jaipurHero, 1),
  center: [26.9124, 75.7873],
  zoom: 12,
  attractions: [
    {
      id: "hawa-mahal",
      name: "Hawa Mahal",
      type: "attraction",
      lat: 26.9239,
      lng: 75.8267,
      rating: 4.6,
      image: img(photos.hawaMahal, 2),
      description:
        "The five-storey honeycomb façade of the Palace of Winds — 953 tiny jharokhas built so royal women could watch street life unseen.",
      costINR: 200,
      visitMinutes: 60,
    },
    {
      id: "city-palace",
      name: "City Palace",
      type: "attraction",
      lat: 26.9258,
      lng: 75.8237,
      rating: 4.5,
      image: img(photos.cityPalace, 3),
      description:
        "A blend of Rajput and Mughal architecture, still partly home to Jaipur's royal family. Courtyards, gardens, museums of weapons and royal costumes.",
      costINR: 500,
      visitMinutes: 120,
    },
    {
      id: "jantar-mantar",
      name: "Jantar Mantar",
      type: "attraction",
      lat: 26.9247,
      lng: 75.8244,
      rating: 4.4,
      image: img(photos.cityPalace, 4),
      description:
        "An 18th-century astronomical observatory with the world's largest stone sundial — accurate to the second. UNESCO World Heritage Site.",
      costINR: 200,
      visitMinutes: 75,
    },
    {
      id: "amber-fort",
      name: "Amber Fort",
      type: "attraction",
      lat: 26.9855,
      lng: 75.8513,
      rating: 4.7,
      image: img(photos.amberFort, 5),
      description:
        "Sprawling hilltop fortress in pale yellow and pink sandstone, with the dazzling Sheesh Mahal hall of mirrors and panoramic Maota Lake views.",
      costINR: 500,
      visitMinutes: 150,
    },
    {
      id: "jal-mahal",
      name: "Jal Mahal",
      type: "attraction",
      lat: 26.9535,
      lng: 75.8463,
      rating: 4.3,
      image: img(photos.jalMahal, 6),
      description:
        "The 'Water Palace' floats serenely in the middle of Man Sagar Lake. Best photographed at golden hour from the lakeside promenade.",
      costINR: 0,
      visitMinutes: 30,
    },
    {
      id: "nahargarh",
      name: "Nahargarh Fort",
      type: "attraction",
      lat: 26.9374,
      lng: 75.8154,
      rating: 4.5,
      image: img(photos.nahargarh, 7),
      description:
        "Sunset point above Jaipur — the entire pink-washed city stretches out below the Aravalli ridge. Stay for the city lights.",
      costINR: 200,
      visitMinutes: 90,
    },
    {
      id: "chokhi-dhani",
      name: "Chokhi Dhani",
      type: "restaurant",
      lat: 26.7836,
      lng: 75.8567,
      rating: 4.6,
      image: img(photos.chokhi, 8),
      description:
        "Ethnic village resort with all-you-can-eat traditional Rajasthani thali, folk dancers, puppet shows and camel rides. Iconic Jaipur experience.",
      costINR: 1100,
      visitMinutes: 180,
    },
    {
      id: "laxmi-misthan",
      name: "Laxmi Misthan Bhandar",
      type: "restaurant",
      lat: 26.9213,
      lng: 75.8265,
      rating: 4.5,
      image: img(photos.laxmi, 9),
      description:
        "Legendary 1727-old-town sweet shop and pure-veg restaurant. Order the pyaaz kachori, dal-baati-churma and kesar rabri.",
      costINR: 450,
      visitMinutes: 60,
    },
    {
      id: "johari-bazaar",
      name: "Johari Bazaar",
      type: "market",
      lat: 26.9181,
      lng: 75.8268,
      rating: 4.4,
      image: img(photos.johari, 10),
      description:
        "Jewellers' street since the 18th century — Kundan, Meenakari, silver, and famous Bandhej and Leheriya textiles. Bargain hard.",
      costINR: 0,
      visitMinutes: 90,
    },
    {
      id: "jiva-spa-jaipur",
      name: "Jiva Grande Spa",
      type: "wellness",
      lat: 26.9174,
      lng: 75.8109,
      rating: 4.7,
      image: img(photos.wellnessSpa, 51),
      description:
        "Award-winning Ayurvedic spa inside a heritage palace setting. Signature Champi head massage, Panchakarma detox treatments, and rose-and-sandalwood oil rituals using century-old Rajasthani recipes. 90 minutes here undoes a week of travel fatigue.",
      costINR: 3500,
      visitMinutes: 120,
    },
    {
      id: "kaya-kalp-jaipur",
      name: "Kaya Kalp Spa",
      type: "wellness",
      lat: 26.8912,
      lng: 75.7984,
      rating: 4.6,
      image: img(photos.wellnessAyurveda, 70),
      description:
        "Palatial spa sanctuary offering customized gem therapy and crystal healing rituals alongside traditional Indian marma massage. Focuses on deep tissue restoration.",
      costINR: 2800,
      visitMinutes: 90,
    },
    {
      id: "vaidic-wellness-jaipur",
      name: "Vaidic Yoga & Wellness Center",
      type: "wellness",
      lat: 26.9320,
      lng: 75.8015,
      rating: 4.5,
      image: img(photos.wellnessYoga, 71),
      description:
        "A tranquil urban center offering authentic Vedic pranayama breathing classes, traditional sound baths, and holistic dietary consultation aligned with your dosha body type.",
      costINR: 1200,
      visitMinutes: 90,
    }
  ],
  defaultItinerary: [
    ["hawa-mahal", "city-palace", "jantar-mantar", "laxmi-misthan", "johari-bazaar"],
    ["amber-fort", "jal-mahal", "nahargarh", "chokhi-dhani"],
  ],
};

// ---- Goa (North) ----
const goa: Place = {
  id: "north-goa",
  name: "North Goa",
  tagline: "Beaches, shacks & sunset markets",
  image: img(photos.goa, 11),
  center: [15.5527, 73.7517],
  zoom: 12,
  attractions: [
    {
      id: "baga",
      name: "Baga Beach",
      type: "attraction",
      lat: 15.5553,
      lng: 73.7517,
      rating: 4.3,
      image: img(photos.baga, 12),
      description:
        "Lively beach famous for water sports, beach shacks and the legendary nightlife strip with Tito's and Mambo's.",
      costINR: 0,
      visitMinutes: 180,
    },
    {
      id: "calangute",
      name: "Calangute Beach",
      type: "attraction",
      lat: 15.5436,
      lng: 73.7553,
      rating: 4.2,
      image: img(photos.calangute, 13),
      description:
        "The 'Queen of Beaches' — a long sweep of golden sand with parasailing, jet-skis and casual seaside dining.",
      costINR: 0,
      visitMinutes: 150,
    },
    {
      id: "anjuna",
      name: "Anjuna Beach",
      type: "attraction",
      lat: 15.5736,
      lng: 73.7401,
      rating: 4.4,
      image: img(photos.anjuna, 14),
      description:
        "Rocky red-cliff coastline that birthed Goa's hippie trail. Home to the Wednesday Flea Market and trance parties.",
      costINR: 0,
      visitMinutes: 120,
    },
    {
      id: "fort-aguada",
      name: "Fort Aguada",
      type: "attraction",
      lat: 15.4929,
      lng: 73.7732,
      rating: 4.5,
      image: img(photos.fortAguada, 15),
      description:
        "17th-century Portuguese fort overlooking the Arabian Sea, with a four-storey lighthouse and dramatic cliff views.",
      costINR: 50,
      visitMinutes: 90,
    },
    {
      id: "chapora",
      name: "Chapora Fort",
      type: "attraction",
      lat: 15.6043,
      lng: 73.7363,
      rating: 4.4,
      image: img(photos.chapora, 16),
      description:
        "The 'Dil Chahta Hai' fort — empty ramparts on a headland with sweeping sunset views over Vagator beach.",
      costINR: 0,
      visitMinutes: 75,
    },
    {
      id: "basilica",
      name: "Basilica of Bom Jesus",
      type: "attraction",
      lat: 15.5009,
      lng: 73.9116,
      rating: 4.6,
      image: img(photos.basilica, 17),
      description:
        "UNESCO-listed Baroque basilica in Old Goa holding the relics of St. Francis Xavier. Cool laterite interiors, gilded altars.",
      costINR: 0,
      visitMinutes: 60,
    },
    {
      id: "britto",
      name: "Britto's",
      type: "restaurant",
      lat: 15.5567,
      lng: 73.7515,
      rating: 4.4,
      image: img(photos.britto, 18),
      description:
        "Iconic Baga beach shack since 1965. Order the prawn balchao, butter-garlic crab and Goan fish thali with king's beer.",
      costINR: 900,
      visitMinutes: 90,
    },
    {
      id: "thalassa",
      name: "Thalassa Vagator",
      type: "restaurant",
      lat: 15.5996,
      lng: 73.7373,
      rating: 4.5,
      image: img(photos.thalassa, 19),
      description:
        "Greek clifftop tavern — moussaka, sangria and live fire-dancers as the sun melts into the Arabian Sea. Book ahead.",
      costINR: 1500,
      visitMinutes: 120,
    },
    {
      id: "saturday-night",
      name: "Saturday Night Market",
      type: "market",
      lat: 15.6043,
      lng: 73.7559,
      rating: 4.3,
      image: img(photos.saturday, 20),
      description:
        "Arpora's weekend bazaar — global street food, live music, handmade jewellery and Goan curios under fairy lights.",
      costINR: 200,
      visitMinutes: 150,
    },
    {
      id: "sereno-spa-goa",
      name: "Sereno Spa, Park Hyatt",
      type: "wellness",
      lat: 15.4865,
      lng: 73.7878,
      rating: 4.6,
      image: img(photos.wellnessNature, 52),
      description:
        "Goa's most acclaimed beachside wellness retreat. Balinese hot-stone massage, couples' hydrotherapy pools, and a meditation garden overlooking the Arabian Sea. The 90-minute signature Coastal Bliss ritual ends with a cold coconut and ocean views.",
      costINR: 3000,
      visitMinutes: 120,
    },
    {
      id: "snip-salon-spa",
      name: "Snip Salon & Spa Calangute",
      type: "wellness",
      lat: 15.5390,
      lng: 73.7610,
      rating: 4.5,
      image: img(photos.wellnessSpa, 72),
      description:
        "Premium urban spa venue known for excellent deep tissue treatments, oriental reflexology, and professional body scrubs perfect for cleansing skin after beach excursions.",
      costINR: 2200,
      visitMinutes: 90,
    },
    {
      id: "mandala-wellness-goa",
      name: "Mandala Earth Spa",
      type: "wellness",
      lat: 15.5820,
      lng: 73.7315,
      rating: 4.6,
      image: img(photos.wellnessMeditation, 73),
      description:
        "Eco-conscious wellness garden specializing in Thai massage therapies, open-air shala sound healing, and ocean-breeze sunset meditation sessions.",
      costINR: 1800,
      visitMinutes: 120,
    }
  ],
  defaultItinerary: [
    ["calangute", "baga", "britto", "fort-aguada"],
    ["anjuna", "chapora", "thalassa", "saturday-night"],
  ],
};

// ---- Manali ----
const manali: Place = {
  id: "manali",
  name: "Manali",
  tagline: "Valley of the Gods",
  image: img(photos.manali, 21),
  center: [32.2396, 77.1887],
  zoom: 12,
  attractions: [
    {
      id: "hadimba",
      name: "Hadimba Devi Temple",
      type: "attraction",
      lat: 32.2492,
      lng: 77.1827,
      rating: 4.5,
      image: img(photos.hadimba, 22),
      description:
        "Cedar-shaded 1553 pagoda temple to the wife of Bhima from the Mahabharata. Mossy roofs, ancient deodar grove.",
      costINR: 0,
      visitMinutes: 60,
    },
    {
      id: "solang",
      name: "Solang Valley",
      type: "attraction",
      lat: 32.3187,
      lng: 77.1568,
      rating: 4.6,
      image: img(photos.solang, 23),
      description:
        "Snow-meadow playground 14 km from town. Paragliding, zorbing, snow-skiing in winter and lush hiking in summer.",
      costINR: 800,
      visitMinutes: 240,
    },
    {
      id: "rohtang",
      name: "Rohtang Pass",
      type: "attraction",
      lat: 32.3719,
      lng: 77.2467,
      rating: 4.7,
      image: img(photos.rohtang, 24),
      description:
        "3,978 m mountain pass into Lahaul. Glaciers, alpine streams, year-round snow. Requires online permit.",
      costINR: 550,
      visitMinutes: 300,
    },
    {
      id: "vashisht",
      name: "Vashisht Hot Springs",
      type: "attraction",
      lat: 32.2667,
      lng: 77.1894,
      rating: 4.3,
      image: img(photos.vashisht, 25),
      description:
        "Sulphur hot springs and a 4,000-year-old stone temple in a tight Himalayan village above Manali.",
      costINR: 0,
      visitMinutes: 90,
    },
    {
      id: "old-manali",
      name: "Old Manali",
      type: "attraction",
      lat: 32.2562,
      lng: 77.1788,
      rating: 4.5,
      image: img(photos.oldManali, 26),
      description:
        "Apple-orchard lanes lined with Israeli cafés, slow boutiques and live-music bars across the Manalsu bridge.",
      costINR: 0,
      visitMinutes: 120,
    },
    {
      id: "mall-road",
      name: "Mall Road",
      type: "market",
      lat: 32.2407,
      lng: 77.1893,
      rating: 4.2,
      image: img(photos.mallRoad, 27),
      description:
        "Pedestrian heart of town — Tibetan handicrafts, Kullu shawls, dried fruit and warm apple cider.",
      costINR: 0,
      visitMinutes: 90,
    },
    {
      id: "johnsons",
      name: "Johnson's Café",
      type: "restaurant",
      lat: 32.2466,
      lng: 77.1851,
      rating: 4.6,
      image: img(photos.johnsons, 28),
      description:
        "Garden bistro famous for grilled river trout, wood-fired pizza and Himachali apple cider. Romantic at twilight.",
      costINR: 1200,
      visitMinutes: 90,
    },
    {
      id: "cafe1947",
      name: "Café 1947",
      type: "restaurant",
      lat: 32.2541,
      lng: 77.1782,
      rating: 4.5,
      image: img(photos.cafe1947, 29),
      description:
        "Old Manali riverside café with live music every evening. Wood-fired pizza, pasta and great filter coffee.",
      costINR: 700,
      visitMinutes: 75,
    },
    {
      id: "himalayan-wellness-manali",
      name: "Himalayan Wellness Spa",
      type: "wellness",
      lat: 32.2450,
      lng: 77.1855,
      rating: 4.5,
      image: img(photos.wellnessMeditation, 53),
      description:
        "Mountain retreat combining Tibetan hot-stone therapy, Himalayan herb steam baths, and deep-tissue massage with local deodar cedar oil. Cedar-wood treatment cabins overlook the Beas river valley. The altitude and cold air amplify every treatment.",
      costINR: 2500,
      visitMinutes: 90,
    },
    {
      id: "antahkarana-manali",
      name: "Antahkarana Yoga Retreat",
      type: "wellness",
      lat: 32.2590,
      lng: 77.1680,
      rating: 4.6,
      image: img(photos.wellnessYoga, 74),
      description:
        "Serene meditation and yoga sanctuary in the quiet orchard foothills of Old Manali. Focuses on daily sunrise Ashtanga Vinyasa and stress-release breathwork sessions.",
      costINR: 1000,
      visitMinutes: 120,
    },
    {
      id: "tattva-spa-manali",
      name: "Tattva Spa Sanctuary",
      type: "wellness",
      lat: 32.2355,
      lng: 77.1920,
      rating: 4.4,
      image: img(photos.wellnessSpa, 75),
      description:
        "Premium wellness facility offering refreshing Himalayan clay body wraps, intensive Swedish therapy, and spice-infused oil skin hydrations perfect for warming up after chilly mountain tours.",
      costINR: 2600,
      visitMinutes: 90,
    }
  ],
  defaultItinerary: [
    ["hadimba", "old-manali", "cafe1947", "mall-road"],
    ["solang", "vashisht", "johnsons"],
    ["rohtang"],
  ],
};

// ---- makePlace helper ----
// Lightweight placeholder generator for secondary places.
// Wellness type is intentionally excluded from defaultItinerary so it
// appears in the "Explore more" panel — it's an optional add-on, not
// a core day stop.
const makePlace = (
  id: string,
  name: string,
  tagline: string,
  image: string,
  center: [number, number],
  seeds: Array<Partial<Attraction> & { name: string; offset: [number, number]; type?: AttractionType }>,
): Place => {
  const attractions: Attraction[] = seeds.map((s, i) => ({
    id: `${id}-${i + 1}`,
    name: s.name,
    type: s.type ?? "attraction",
    lat: center[0] + s.offset[0],
    lng: center[1] + s.offset[1],
    rating: s.rating ?? 4.3 + (i % 4) * 0.1,
    image: s.image ?? image,
    description:
      s.description ??
      `${s.name} is one of the most loved spots in ${name}. Locals recommend an unhurried visit with time for photographs.`,
    costINR: s.costINR ?? (s.type === "restaurant" ? 600 : s.type === "market" ? 0 : s.type === "wellness" ? 2000 : 200),
    visitMinutes: s.visitMinutes ?? (s.type === "wellness" ? 120 : 90),
  }));

  // Keep wellness centres in attractions (so they show on map + Explore More)
  // but leave them out of the default day-plan.
  const nonWellness = attractions.filter((a) => a.type !== "wellness");
  return {
    id,
    name,
    tagline,
    image,
    center,
    zoom: 12,
    attractions,
    defaultItinerary: [
      nonWellness.slice(0, 4).map((a) => a.id),
      nonWellness.slice(4).map((a) => a.id),
    ].filter((d) => d.length),
  };
};

const udaipur = makePlace(
  "udaipur",
  "Udaipur",
  "City of Lakes",
  img(photos.udaipur, 30),
  [24.5854, 73.7125],
  [
    { name: "City Palace", offset: [0.001, 0.002] },
    { name: "Lake Pichola Boat Ride", offset: [-0.002, -0.001], visitMinutes: 60 },
    { name: "Jagdish Temple", offset: [0.002, 0.003] },
    { name: "Saheliyon-ki-Bari", offset: [0.02, 0.01] },
    { name: "Bagore-ki-Haveli", offset: [-0.001, 0.001] },
    { name: "Ambrai Restaurant", offset: [-0.003, -0.003], type: "restaurant", costINR: 1400 },
    { name: "Hathi Pol Bazaar", offset: [0.004, -0.002], type: "market" },
    {
      name: "Jiva Spa, Taj Lake Palace",
      offset: [-0.008, -0.028],
      type: "wellness",
      costINR: 4000,
      visitMinutes: 120,
      image: img(photos.wellnessSpa, 54),
      description:
        "Floating palace spa experience — Udaipur's most iconic wellness destination. Ayurvedic rituals inspired by Mewar royal traditions, Shirodhara oil therapy, and Abhyanga massage with views of Lake Pichola from every treatment room. Bookings required.",
    },
    {
      name: "Panghat Spa & Salon",
      offset: [0.005, 0.008],
      type: "wellness",
      costINR: 2500,
      visitMinutes: 90,
      image: img(photos.wellnessAyurveda, 76),
      description: "Luxury courtyard spa setting combining deep exfoliating fruit scrubs, herbal dynamic steam chambers, and therapeutic deep-knot royal friction rituals.",
    },
    {
      name: "Mewar Meditation Center",
      offset: [-0.012, 0.015],
      type: "wellness",
      costINR: 1500,
      visitMinutes: 90,
      image: img(photos.wellnessMeditation, 77),
      description: "Quiet lakeside refuge centered around traditional candle concentration (Trataka), rhythmic sound baths, and calming pranayama exercises near the water.",
    }
  ],
);

const alleppey = makePlace(
  "alleppey",
  "Alleppey",
  "Backwater paradise",
  img(photos.alleppey, 31),
  [9.4981, 76.3388],
  [
    { name: "Houseboat Cruise", offset: [-0.01, 0.01], visitMinutes: 1440, costINR: 8000 },
    { name: "Alleppey Beach", offset: [-0.005, -0.012] },
    { name: "Marari Beach", offset: [0.05, -0.02] },
    { name: "Krishnapuram Palace", offset: [-0.1, 0.05] },
    { name: "Pathiramanal Island", offset: [0.04, 0.06] },
    { name: "Thaff Restaurant", offset: [0.001, 0.002], type: "restaurant", costINR: 500 },
    { name: "Mullakkal Market", offset: [0.002, 0.001], type: "market" },
    {
      name: "Kerala Ayurveda Centre",
      offset: [0.022, -0.032],
      type: "wellness",
      costINR: 2200,
      visitMinutes: 180,
      image: img(photos.wellnessAyurveda, 55),
      description:
        "Certified Ayurveda retreat on the backwater shores. Traditional Panchakarma detox, Shirodhara (warm oil stream on forehead), and full-day Rejuvenation programmes guided by qualified Vaidyas. Fresh medicinal oils prepared on-site from Kerala herbs.",
    },
    {
      name: "Backwater Lotus Yoga Shala",
      offset: [-0.015, 0.025],
      type: "wellness",
      costINR: 1200,
      visitMinutes: 120,
      image: img(photos.wellnessYoga, 78),
      description: "Thatch-roofed platform over quiet canal waters offering refreshing Hatha yoga tracks and mindful breathing escapes under palm trees.",
    },
    {
      name: "Saraswati Ayurvedic Spa",
      offset: [0.010, -0.018],
      type: "wellness",
      costINR: 1900,
      visitMinutes: 90,
      image: img(photos.wellnessSpa, 79),
      description: "Local village-style facility trusted for warm herbal-pouch fomentation treatments (Elakizhi) and traditional synchronized four-hand hot-oil full body friction.",
    }
  ],
);

const munnar = makePlace(
  "munnar",
  "Munnar",
  "Hills of tea & mist",
  img(photos.munnar, 32),
  [10.0889, 77.0595],
  [
    { name: "Tea Museum", offset: [0.01, -0.01] },
    { name: "Eravikulam National Park", offset: [0.07, 0.02] },
    { name: "Mattupetty Dam", offset: [0.03, 0.06] },
    { name: "Echo Point", offset: [0.04, 0.07] },
    { name: "Top Station Viewpoint", offset: [0.18, 0.18] },
    { name: "SN Annapoorna", offset: [0.002, 0.001], type: "restaurant", costINR: 350 },
    {
      name: "Tea Trails Wellness Spa",
      offset: [0.012, 0.005],
      type: "wellness",
      costINR: 1800,
      visitMinutes: 120,
      image: img(photos.wellnessNature, 56),
      description:
        "Boutique spa inside a colonial plantation bungalow ringed by tea gardens. Signature green-tea body wrap, warm coconut-oil Abhyanga massage, and a guided 30-minute forest meditation walk through the estate at mist-hour. A quiet counter to Munnar's tourist bustle.",
    },
    {
      name: "Mayura Mist Eco-Spa",
      offset: [-0.022, 0.014],
      type: "wellness",
      costINR: 2200,
      visitMinutes: 90,
      image: img(photos.wellnessSpa, 80),
      description: "Charming highland cabin providing skin-brightening mountain coffee scrubs, fresh mint-oil massages, and localized organic deep muscle therapy.",
    },
    {
      name: "Highland Sanctuary Shala",
      offset: [0.035, -0.012],
      type: "wellness",
      costINR: 1400,
      visitMinutes: 120,
      image: img(photos.wellnessYoga, 81),
      description: "Panoramic cliffside floor specializing in cold-weather active Vinyasa flows and crystal clear morning sun chanting sessions among cloud forests.",
    }
  ],
);

const rishikesh = makePlace(
  "rishikesh",
  "Rishikesh",
  "Yoga capital of the world",
  img(photos.rishikesh, 33),
  [30.0869, 78.2676],
  [
    { name: "Laxman Jhula", offset: [0.01, 0.005] },
    { name: "Ram Jhula", offset: [0.005, 0.003] },
    { name: "Triveni Ghat", offset: [-0.005, -0.002] },
    { name: "Beatles Ashram", offset: [0.012, 0.008] },
    { name: "Neelkanth Mahadev Temple", offset: [0.06, 0.06] },
    { name: "Little Buddha Café", offset: [0.011, 0.006], type: "restaurant", costINR: 500 },
    {
      name: "Parmarth Niketan Wellness",
      offset: [0.024, 0.033],
      type: "wellness",
      costINR: 800,
      visitMinutes: 180,
      image: img(photos.wellnessYoga, 57),
      description:
        "India's largest Ashram on the Ganges banks. Morning Hatha yoga, pranayama, and guided meditation at sunrise — followed by the world-famous Ganga Aarti ceremony at dusk on the river steps. Drop-in sessions welcome; week-long silent retreats available for deeper practice.",
    },
    {
      name: "Ananda Himalayan Alchemy",
      offset: [0.045, -0.025],
      type: "wellness",
      costINR: 4500,
      visitMinutes: 120,
      image: img(photos.wellnessSpa, 82),
      description: "World-class hill-station estate specializing in targeted rose-quartz facial sweeps, extensive hydrotherapy tubs, and Tibetan energy-balancing friction.",
    },
    {
      name: "Ganga Nada Sound Ashram",
      offset: [-0.008, 0.012],
      type: "wellness",
      costINR: 1000,
      visitMinutes: 90,
      image: img(photos.wellnessMeditation, 83),
      description: "Deep riverside immersion center focusing on therapeutic classical sitar vibration frequencies, heavy bronze singing bowls, and profound silent meditation paths.",
    }
  ],
);

const nainital = makePlace(
  "nainital",
  "Nainital",
  "The Lake District of India",
  img(photos.nainital, 34),
  [29.3919, 79.4542],
  [
    { name: "Naini Lake Boating", offset: [0, 0], visitMinutes: 60 },
    { name: "Naina Devi Temple", offset: [0.002, -0.001] },
    { name: "Snow View Point", offset: [0.01, 0.005] },
    { name: "Tiffin Top", offset: [-0.005, -0.008] },
    { name: "Mall Road", offset: [0.001, 0.001], type: "market" },
    { name: "Sakley's Restaurant", offset: [0.002, 0.001], type: "restaurant", costINR: 900 },
    {
      name: "Forest Spa, Mount View",
      offset: [0.008, 0.009],
      type: "wellness",
      costINR: 1500,
      visitMinutes: 120,
      image: img(photos.wellnessMeditation, 58),
      description:
        "Himalayan forest spa at 2,084 m altitude. Oak-smoke sauna, Himalayan salt-crystal stone massage, and sound-bath sessions using 500-year-old Tibetan singing bowls. The thin, clean mountain air amplifies every treatment. A rare off-grid calm in a busy hill station.",
    },
    {
      name: "Pine Ridge Eco Yoga Shala",
      offset: [-0.014, 0.022],
      type: "wellness",
      costINR: 1100,
      visitMinutes: 90,
      image: img(photos.wellnessYoga, 84),
      description: "Wood-floored platform among ancient pine clusters providing core structural alignment yoga sequences and refreshing cold-air lung expansions.",
    },
    {
      name: "Naini Hydrotherapy Haven",
      offset: [0.018, -0.015],
      type: "wellness",
      costINR: 2400,
      visitMinutes: 90,
      image: img(photos.wellnessSpa, 85),
      description: "Mineral-rich localized hot baths featuring organic mountain pine salt cleanses, targeted spine jet washes, and soothing full-torso hot-rock press wraps.",
    }
  ],
);

const ooty = makePlace(
  "ooty",
  "Ooty",
  "Queen of the Nilgiris",
  img(photos.ooty, 35),
  [11.4102, 76.695],
  [
    { name: "Botanical Gardens", offset: [0.005, 0.003] },
    { name: "Ooty Lake", offset: [-0.01, -0.01] },
    { name: "Doddabetta Peak", offset: [0.02, 0.04] },
    { name: "Nilgiri Mountain Railway", offset: [0, 0.002] },
    { name: "Tea Factory", offset: [0.03, 0.02] },
    { name: "Earl's Secret", offset: [0.001, 0.002], type: "restaurant", costINR: 700 },
    {
      name: "Nilgiri Ayurveda Retreat",
      offset: [0.003, -0.003],
      type: "wellness",
      costINR: 1200,
      visitMinutes: 120,
      image: img(photos.wellnessAyurveda, 59),
      description:
        "Traditional Kerala Ayurveda transplanted to a Nilgiri hill bungalow. Sirodhara, Njavara Kizhi (medicated rice-bolus therapy), and morning yoga on the eucalyptus-shaded lawn. Kerala-certified therapists, medicinal oils cold-pressed on the premises. Walk out fog-brained in the best way.",
    },
    {
      name: "Eucalyptus Ridge Pure Spa",
      offset: [-0.015, 0.020],
      type: "wellness",
      costINR: 1800,
      visitMinutes: 90,
      image: img(photos.wellnessSpa, 86),
      description: "Distinct local sanctuary featuring therapeutic chest-clearing wild eucalyptus steam treatments, hot towels, and targeted deep shoulder pressure releases.",
    },
    {
      name: "Blue Mountain Zen Center",
      offset: [0.022, -0.028],
      type: "wellness",
      costINR: 1300,
      visitMinutes: 120,
      image: img(photos.wellnessMeditation, 87),
      description: "Peaceful stone cottage layout emphasizing deep slow posture breathing practices, sitting mindfulness, and soothing tea infusion ceremonies over looking the valley.",
    }
  ],
);

const pondy = makePlace(
  "pondicherry",
  "Pondicherry",
  "French Riviera of the East",
  img(photos.pondy, 36),
  [11.9416, 79.8083],
  [
    { name: "Promenade Beach", offset: [0, 0.01] },
    { name: "Auroville", offset: [0.06, -0.02] },
    { name: "French Quarter", offset: [0.001, 0.005] },
    { name: "Sri Aurobindo Ashram", offset: [0.002, 0.004] },
    { name: "Paradise Beach", offset: [-0.04, 0.02] },
    { name: "Café des Arts", offset: [0.001, 0.003], type: "restaurant", costINR: 800 },
    { name: "Goubert Market", offset: [-0.001, 0.002], type: "market" },
    {
      name: "Auroville Wellness Centre",
      offset: [0.05, -0.025],
      type: "wellness",
      costINR: 1000,
      visitMinutes: 180,
      image: img(photos.wellnessYoga, 60),
      description:
        "Holistic wellness hub inside Auroville's green belt. Integral Yoga, deep relaxation bodywork, Watsu aquatic sessions, and silent-retreat spaces surrounded by the Matrimandir forest. Book the sunrise yoga on the Matrimandir grounds — one of the most serene hours you'll spend in India.",
    },
    {
      name: "Villa Shanti Ocean Spa",
      offset: [-0.002, 0.006],
      type: "wellness",
      costINR: 2600,
      visitMinutes: 90,
      image: img(photos.wellnessSpa, 88),
      description: "Classic French Quarter courtyard facility offering calming marine clay detox wraps, sea salt deep skin scrubs, and aromatic lavender oil muscle therapy.",
    },
    {
      name: "Sadhana Quietude Oasis",
      offset: [0.012, -0.018],
      type: "wellness",
      costINR: 1500,
      visitMinutes: 120,
      image: img(photos.wellnessMeditation, 89),
      description: "Quiet seaside sanctuary running restorative ocean sound therapy, guided self-inquiry concentrations, and peaceful therapeutic sunset lifestyle circles.",
    }
  ],
);

export const STATES: State[] = [
  {
    id: "rajasthan",
    name: "Rajasthan",
    tagline: "Land of Kings",
    vibe: "Forts, deserts, royal palaces",
    gradient: "linear-gradient(135deg, oklch(0.7 0.18 35), oklch(0.55 0.18 25))",
    emoji: "🏰",
    image: img(photos.jaipurHero, 100),
    places: [jaipur, udaipur],
  },
  {
    id: "goa",
    name: "Goa",
    tagline: "Sun, sand & susegad",
    vibe: "Beaches, shacks, Portuguese charm",
    gradient: "linear-gradient(135deg, oklch(0.72 0.14 60), oklch(0.6 0.16 30))",
    emoji: "🏖️",
    image: img(photos.goa, 101),
    places: [goa],
  },
  {
    id: "himachal",
    name: "Himachal Pradesh",
    tagline: "Abode of the snows",
    vibe: "Snow, cedar valleys, mountain villages",
    gradient: "linear-gradient(135deg, oklch(0.55 0.08 220), oklch(0.42 0.06 240))",
    emoji: "🏔️",
    image: img(photos.manali, 102),
    places: [manali],
  },
  {
    id: "kerala",
    name: "Kerala",
    tagline: "God's Own Country",
    vibe: "Backwaters, tea hills, ayurveda",
    gradient: "linear-gradient(135deg, oklch(0.55 0.12 155), oklch(0.4 0.1 165))",
    emoji: "🌴",
    image: img(photos.munnar, 103),
    places: [alleppey, munnar],
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    tagline: "Devbhoomi — Land of Gods",
    vibe: "Ganga, yoga, Himalayan lakes",
    gradient: "linear-gradient(135deg, oklch(0.65 0.12 200), oklch(0.45 0.1 220))",
    emoji: "🕉️",
    image: img(photos.rishikesh, 104),
    places: [rishikesh, nainital],
  },
  {
    id: "tamilnadu",
    name: "Tamil Nadu",
    tagline: "Temples & long coastlines",
    vibe: "Dravidian temples, French colonies, hills",
    gradient: "linear-gradient(135deg, oklch(0.65 0.16 35), oklch(0.45 0.14 20))",
    emoji: "🛕",
    image: img(photos.pondy, 105),
    places: [pondy, ooty],
  },
];

export function getState(id: string): State | undefined {
  return STATES.find((s) => s.id === id);
}

export function getPlace(stateId: string, placeId: string): { state: State; place: Place } | undefined {
  const state = getState(stateId);
  if (!state) return;
  const place = state.places.find((p) => p.id === placeId);
  if (!place) return;
  return { state, place };
}

// --- Itinerary math helpers ---

/** Haversine distance in km between two lat/lng */
export function distanceKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const la1 = (a[0] * Math.PI) / 180;
  const la2 = (b[0] * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

/** Rough travel time in minutes, assuming 30 km/h city average, +5 min buffer */
export function travelMinutes(a: [number, number], b: [number, number]): number {
  return Math.max(5, Math.round((distanceKm(a, b) / 30) * 60) + 5);
}

type PoiItem = Attraction & { cost: number; emoji: string };
export type PlaceWithState = Place & { state: string; pois: PoiItem[] };

const poiEmoji = (type: AttractionType): string => {
  switch (type) {
    case "restaurant": return "🍽️";
    case "market":     return "🛍️";
    case "wellness":   return "🧘";
    default:           return "📍";
  }
};

export const findState = (slug: string) => STATES.find((s) => s.id === slug);
export const findPlace = (
  stateSlug: string,
  placeSlug: string,
): PlaceWithState | undefined => {
  const state = findState(stateSlug);
  const place = state?.places.find((p) => p.id === placeSlug);
  if (!state || !place) return;
  const pois: PoiItem[] = place.attractions.map((attraction) => ({
    ...attraction,
    cost: attraction.costINR,
    emoji: poiEmoji(attraction.type),
  }));
  return { ...place, state: state.name, pois };
};