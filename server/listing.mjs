const photo = (id, alt) => ({ id, src: `/images/${id}.webp`, alt });
export const listing = {
  id: "mirashya-ug10",
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  subtitle: "Entire serviced apartment in Candolim, India",
  location: "Candolim, India",
  guests: 3,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  rating: 4.95,
  reviewCount: 19,
  host: "Mirashya Homes",
  hostYears: 2,
  currency: "INR",
  total: 28499,
  nights: 5,
  checkIn: "2026-10-18",
  checkOut: "2026-10-23",
  referencePhotoCount: 43,
  heroSources: {
    "patio-seating": "/images/patio-seating-hero.webp",
    "bedroom-main": "/images/bedroom-hero.webp",
  },
  tourSources: { "living-main": "/images/living-tour.webp" },
  hero: [
    "patio-front",
    "patio-seating",
    "jacuzzi",
    "bedroom-main",
    "exterior-front",
  ],
  categories: [
    {
      id: "living-room-1",
      name: "Living room 1",
      amenities: "Sofa · Air conditioning · Ceiling fan · TV",
      photos: [
        photo(
          "living-main",
          "Sunlit living room with a mustard sofa, wooden coffee table and dining area",
        ),
        photo(
          "living-tv",
          "Television cabinet and dining table in the living room",
        ),
        photo("living-wide", "Wide view of the living room and kitchen"),
      ],
    },
    {
      id: "living-room-2",
      name: "Living room 2",
      amenities: "Ceiling fan · Hot tub",
      photos: [
        photo(
          "patio-seating",
          "Woven patio seating beside the private jacuzzi",
        ),
        photo(
          "patio-front",
          "Open-air lounge with woven chairs and a cushioned footstool",
        ),
        photo(
          "patio-wide",
          "Private patio with a glass dining table and jacuzzi",
        ),
      ],
    },
    {
      id: "full-kitchen",
      name: "Full kitchen",
      amenities:
        "Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery",
      photos: [
        photo(
          "kitchen-front",
          "Kitchen with wooden cupboards, refrigerator and microwave",
        ),
        photo(
          "kitchen-dining",
          "Kitchen counter looking toward the dining table",
        ),
      ],
    },
    {
      id: "bedroom",
      name: "Bedroom",
      amenities:
        "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi",
      photos: [
        photo(
          "bedroom-main",
          "Double bedroom with wooden flooring, a window and a full-length mirror",
        ),
      ],
    },
    {
      id: "full-bathroom",
      name: "Full bathroom",
      amenities: "Hairdryer · Hot water · Shampoo · Shower gel",
      photos: [
        photo(
          "bathroom",
          "Stone-tiled bathroom with round mirror, washbasin and shower",
        ),
      ],
    },
    {
      id: "gym",
      name: "Gym",
      amenities: "Air conditioning · Gym · Exercise equipment · Ceiling fan",
      photos: [
        photo(
          "gym-main",
          "Shared gym with exercise bike, treadmill and free weights",
        ),
        photo("gym-equipment", "Strength-training equipment in the shared gym"),
        photo("gym-window", "Bright gym with windows and exercise equipment"),
      ],
    },
    {
      id: "exterior",
      name: "Exterior",
      amenities: "",
      photos: [
        photo(
          "exterior-main",
          "Aerial view of the white and yellow apartment building with its red roof",
        ),
        photo(
          "exterior-area",
          "Green neighbourhood surrounding the apartment building",
        ),
        photo("exterior-side", "Side view of the apartment building"),
        photo(
          "exterior-front",
          "Front view of the white and yellow apartment building",
        ),
      ],
    },
    {
      id: "pool",
      name: "Pool",
      amenities: "Pool",
      photos: [
        photo("pool-main", "Blue shared pool in the apartment courtyard"),
        photo("pool-deck", "Shared swimming pool and wooden deck"),
        photo("pool-courtyard", "Pool surrounded by apartment balconies"),
      ],
    },
    {
      id: "additional-photos",
      name: "Additional photos",
      amenities: "",
      photos: [
        photo(
          "jacuzzi-diagonal",
          "View of the private jacuzzi beside lounge seating and plants",
        ),
        photo(
          "jacuzzi",
          "Private jacuzzi with a wooden surround and garden seating",
        ),
        photo(
          "patio-overview",
          "View across the jacuzzi toward the open-air lounge",
        ),
        photo("patio-corner", "Patio corner with a chair beside the jacuzzi"),
        photo(
          "patio-utility",
          "Patio utility area with washing machine and wooden cupboards",
        ),
      ],
    },
  ],
};
