"use client";


import { useEffect, useState } from "react";
import {
  Search,
  Globe,
  Menu,
  Heart,
  Upload,
  Grip,
  ChevronDown,
  ChevronRight,
  X,
  Flag,
  Tag,
  Fan,
  DoorOpen,
  Waves,
  CookingPot,
  Wifi,
  CarFront,
  Bath,
  PawPrint,
  Cctv,
  AlarmSmoke,
  BriefcaseBusiness,
  ShieldCheck,
  KeyRound,
  Sparkles,
  Map,
  MessageSquare,
  Check,
  Dumbbell,
  Tv,
  WashingMachine,
  Snowflake,
  Coffee,
  Wind,
  CalendarDays,
  Copy,
  Minus,
  Plus,
  House,
} from "lucide-react";
import PhotoTour from "./PhotoTour";
import Modal from "./Modal";
import Calendar from "./Calendar";
const amenities = [
  ["Kitchen", CookingPot],
  ["Wifi", Wifi],
  ["Dedicated workspace", BriefcaseBusiness],
  ["Free parking on premises", CarFront],
  ["Pool", Waves],
  ["Hot tub", Bath],
  ["Pets allowed", PawPrint],
  ["Exterior security cameras on property", Cctv],
  ["Carbon monoxide alarm", AlarmSmoke, true],
  ["Smoke alarm", AlarmSmoke, true],
];
const amenityGroups = [
  [
    "Bathroom",
    [
      ["Hairdryer", Wind],
      ["Hot water", Bath],
      ["Shampoo", Bath],
      ["Shower gel", Bath],
    ],
  ],
  [
    "Bedroom and laundry",
    [
      ["Washing machine", WashingMachine],
      ["Hangers", House],
      ["Bed linen", House],
      ["Room-darkening blinds", House],
      ["Iron", House],
      ["Clothes storage", House],
      ["Cot", House],
    ],
  ],
  [
    "Entertainment",
    [
      ["TV", Tv],
      ["Gym", Dumbbell],
    ],
  ],
  [
    "Heating and cooling",
    [
      ["Air conditioning", Snowflake],
      ["Ceiling fan", Fan],
    ],
  ],
  [
    "Internet and office",
    [
      ["Wifi", Wifi],
      ["Dedicated workspace", BriefcaseBusiness],
    ],
  ],
  [
    "Kitchen and dining",
    [
      ["Kitchen", CookingPot],
      ["Fridge", CookingPot],
      ["Freezer", Snowflake],
      ["Microwave", CookingPot],
      ["Cooking basics", CookingPot],
      ["Crockery and cutlery", CookingPot],
      ["Kettle", Coffee],
      ["Coffee", Coffee],
      ["Wine glasses", Coffee],
    ],
  ],
  [
    "Parking and facilities",
    [
      ["Free parking on premises", CarFront],
      ["Pool", Waves],
      ["Hot tub", Bath],
      ["Gym", Dumbbell],
    ],
  ],
  [
    "Services",
    [
      ["Pets allowed", PawPrint],
      ["Cleaning available during stay", Sparkles],
      ["Long-term stays allowed", CalendarDays],
      ["Self check-in", KeyRound],
    ],
  ],
];
const nearby = [
  ["Beautiful Studio with a view to die for", "₹23,600", "4.91"],
  ["NAQAB - 1bhk with private pool", "₹42,218", "4.95"],
  ["Greentique Luxury Flat with plunge pool, Calangute", "₹44,506", "4.94"],
  ["The Tropical Studio | 5 mins to Beach", "₹22,824", "4.96"],
  ["Luxury Casa Bella 1BHK with plunge pool, Calangute", "₹39,942", "4.95"],
];
const reviews = [
  {
    name: "Amit",
    tenure: "2 months on Airbnb",
    date: "1 week ago",
    text: "Very helpful and responsive team. Safe and peaceful stay, loved everything about the property.",
  },
  {
    name: "Aheesh",
    tenure: "3 years on Airbnb",
    date: "2 weeks ago",
    text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.",
  },
  {
    name: "Samiksha",
    tenure: "8 months on Airbnb",
    date: "May 2026",
    text: "the host nitish was really great help",
  },
  {
    name: "Vedant",
    tenure: "4 years on Airbnb",
    date: "May 2026",
    text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.",
  },
  {
    name: "Vaibhav S",
    tenure: "3 years on Airbnb",
    date: "May 2026",
    text: "Great great experience living out there, can't expect more.",
  },
  {
    name: "Mohd",
    tenure: "5 years on Airbnb",
    date: "May 2026",
    text: "Great place. Exactly as described in the listing.",
  },
];
function Laurel({ mirrored = false }) {
  return (
    <svg
      className={`laurel ${mirrored ? "mirrored" : ""}`}
      viewBox="0 0 24 40"
      aria-hidden="true"
      fill="none"
    >
      <path d="M19 37C6 30 3 14 12 3" stroke="currentColor" />
      <path
        d="M10 9C3 10 4 3 10 2c2 3 2 5 0 7Zm-3 9C0 17 1 10 6 10c3 3 3 5 1 8Zm2 9C2 29 0 21 5 20c4 1 5 3 4 7Zm5 7C9 40 4 32 7 29c4-1 6 1 7 5Zm-5-9c-1-6 6-7 8-3-1 4-4 5-8 3Zm-3-9c1-6 7-6 8-2-2 4-5 5-8 2Zm9 16c0-5 7-5 8-1-2 3-5 4-8 1Z"
        stroke="currentColor"
      />
    </svg>
  );
}
function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Airbnb home">
      <svg viewBox="0 0 32 36" aria-hidden="true">
        <path d="M16 3c-3 0-4 4-6 8L3 27c-3 8 6 10 13 1 7 9 16 7 13-1l-7-16c-2-4-3-8-6-8Zm0 12c-7 0-5 8 0 13 5-5 7-13 0-13Z" />
      </svg>
      <span>airbnb</span>
    </a>
  );
}
function Review({ review }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="review">
      <div className="person">
        <span className="avatar">{review.name[0]}</span>
        <div>
          <strong>{review.name}</strong>
          <p>{review.tenure}</p>
        </div>
      </div>
      <p className="review-date">
        <span aria-label="5 out of 5 stars">★★★★★</span> · {review.date}
      </p>
      <p className={expanded ? "" : "review-excerpt"}>{review.text}</p>
      {review.text.length > 180 && (
        <button className="text-button" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </article>
  );
}
export default function ListingPage() {
  const [listing, setListing] = useState(null),
    [error, setError] = useState(""),
    [retry, setRetry] = useState(0);
  const [tour, setTour] = useState(null),
    [sheet, setSheet] = useState(null),
    [saved, setSaved] = useState(false),
    [claimed, setClaimed] = useState(false),
    [scrolled, setScrolled] = useState(false),
    [activeSection, setActiveSection] = useState("photos"),
    [expanded, setExpanded] = useState(false),
    [guests, setGuests] = useState(2),
    [checkIn, setCheckIn] = useState("2026-10-18"),
    [checkOut, setCheckOut] = useState("2026-10-23"),
    [notice, setNotice] = useState(""),
    [search, setSearch] = useState(""),
    [nearbyIndex, setNearbyIndex] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setError("");
    fetch("/api/listing", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("The listing service is unavailable.");
        return r.json();
      })
      .then(setListing)
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      });
    return () => controller.abort();
  }, [retry]);
  useEffect(() => {
    try {
      setSaved(localStorage.getItem("mirashya-saved") === "true");
    } catch {
      /* Browsing preferences may disable storage. */
    }
    const onScroll = () =>
      setScrolled(
        window.scrollY >
          parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--compact-threshold",
            ),
          ),
      );
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!listing) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActiveSection(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    ["photos", "amenities", "reviews", "location"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [listing]);
  const toggleSave = () =>
    setSaved((old) => {
      try {
        localStorage.setItem("mirashya-saved", String(!old));
      } catch {
        /* Saving still works for this session. */
      }
      return !old;
    });
  useEffect(() => {
    setNotice("");
  }, [sheet]);
  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / 86400000),
        )
      : 0;
  const total = listing
    ? Math.round((listing.total / listing.nights) * nights)
    : 0;
  const money = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(total);
  const changeDates = (start, end) => {
    setCheckIn(start);
    setCheckOut(end);
  };
  const share = () => {
    setNotice("");
    setSheet("share");
  };
  function navigate(id) {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  const dateLabel = (value) =>
    value
      ? new Date(value + "T12:00:00").toLocaleDateString("en-US")
      : "Add date";
  const reserve = () => {
    setNotice("");
    setSheet(nights ? "reserve" : "dates");
  };

  
  if (!listing)
    return (
      <div className="loading-page">
        <Brand />
        <main>
          <h1>
            {error ? "We couldn’t load this stay" : "Getting your stay ready…"}
          </h1>
          <p>{error || "Loading the apartment and its photo tour."}</p>
          {error && (
            <button
              className="outline-button"
              onClick={() => setRetry((n) => n + 1)}
            >
              Try again
            </button>
          )}
        </main>
      </div>
    );
  const allPhotos = listing.categories.flatMap((c) => c.photos);
  return (
    <>
      <a href="#listing-content" className="skip-link">
        Skip to listing content
      </a>
      <header id="top" className="site-header">
        <div className="header-inner">
          <Brand />
          <button
            className="search-pill"
            aria-label="Search stays: anywhere, anytime, add guests"
            onClick={() => {
              setNotice("");
              setSheet("search");
            }}
          >
            <span className="search-house" aria-hidden="true">
              🏡
            </span>
            <strong>Anywhere</strong>
            <span className="pill-divider" />
            <strong>Anytime</strong>
            <span className="pill-divider" />
            <span className="muted">Add guests</span>
            <span className="search-circle">
              <Search />
            </span>
          </button>
          <nav className="header-actions" aria-label="Account">
            <button className="host-link" onClick={() => setSheet("host-info")}>
              Become a host
            </button>
            <button
              className="icon-button soft"
              aria-label="Language and currency"
              onClick={() => setSheet("language")}
            >
              <Globe />
            </button>
            <button
              className="icon-button soft"
              aria-label="Open menu"
              onClick={() => setSheet("menu")}
            >
              <Menu />
            </button>
          </nav>
        </div>
      </header>
      {scrolled && (
        <nav className="compact-nav" aria-label="Listing sections">
          <div className="container compact-inner">
            <div className="section-links">
              {["Photos", "Amenities", "Reviews", "Location"].map((label) => (
                <button
                  key={label}
                  aria-current={
                    activeSection === label.toLowerCase()
                      ? "location"
                      : undefined
                  }
                  onClick={() => navigate(label.toLowerCase())}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="compact-reserve">
              <div>
                <strong>{nights ? money : "Add dates"}</strong>
                {nights > 0 && ` for ${nights} nights`}
                <small>
                  ★ {listing.rating} · {listing.reviewCount} reviews
                </small>
              </div>
              <button className="primary-button" onClick={reserve}>
                Reserve
              </button>
            </div>
          </div>
        </nav>
      )}
      <main id="listing-content" className="container">
        <section id="photos" aria-labelledby="listing-title">
          <div className="title-row">
            <h1 id="listing-title">{listing.title}</h1>
            <div className="listing-actions">
              <button className="text-button" onClick={share}>
                <Upload />
                Share
              </button>
              <button
                className="text-button"
                aria-pressed={saved}
                onClick={toggleSave}
              >
                <Heart fill={saved ? "currentColor" : "none"} />
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
          <div className="hero-gallery">
            {listing.hero.map((id, i) => {
              const p = allPhotos.find((p) => p.id === id);
              return (
                <button
                  key={id}
                  className={`hero-photo hero-photo-${i}`}
                  aria-label={`Open photo tour: ${p.alt}`}
                  onClick={() => setTour({})}
                >
                  <img
                    src={listing.heroSources?.[id] || p.src}
                    alt={p.alt}
                    fetchPriority={i === 0 ? "high" : "auto"}
                  />
                </button>
              );
            })}
            <button className="show-photos" onClick={() => setTour({})}>
              <Grip />
              Show all photos
            </button>
          </div>
        </section>
        <div className="listing-columns">
          <div className="listing-main">
            <section className="intro">
              <h2>{listing.subtitle}</h2>
              <p>
                {listing.guests} guests · {listing.bedrooms} bedroom ·{" "}
                {listing.beds} bed · {listing.bathrooms} bathroom
              </p>
              <button
                className="guest-favourite"
                onClick={() => navigate("reviews")}
                aria-label="Guest favourite, rated 4.95 out of 5, 19 reviews"
              >
                <span className="favourite-label">
                  <Laurel />
                  <strong>
                    Guest
                    <br />
                    favourite
                  </strong>
                  <Laurel mirrored />
                </span>
                <span className="favourite-description">
                  One of the most loved homes on Airbnb,
                  <br />
                  according to guests
                </span>
                <span className="rating">
                  <strong>{listing.rating}</strong>
                  <span className="stars">★★★★★</span>
                </span>
                <span className="review-number">
                  <strong>{listing.reviewCount}</strong>
                  <span>Reviews</span>
                </span>
              </button>
              <div className="host-row">
                <span className="host-avatar">MIRASHYA</span>
                <div>
                  <strong>Hosted by {listing.host}</strong>
                  <p>{listing.hostYears} years hosting</p>
                </div>
              </div>
            </section>
            <section className="highlights">
              <div>
                <Bath />
                <div>
                  <strong>Outdoor entertainment</strong>
                  <p>
                    The pool and alfresco dining are great for summer trips.
                  </p>
                </div>
              </div>
              <div>
                <Fan />
                <div>
                  <strong>Designed for staying cool</strong>
                  <p>Beat the heat with the A/C and ceiling fan.</p>
                </div>
              </div>
              <div>
                <DoorOpen />
                <div>
                  <strong>Self check-in</strong>
                  <p>You can check in with the building staff.</p>
                </div>
              </div>
            </section>
            <section className="description">
              <div className="translation">
                Some info has been automatically translated.{" "}
                <button
                  className="text-button"
                  onClick={() => setSheet("translation")}
                >
                  Show original
                </button>
              </div>
              <p className={expanded ? "" : "description-clamp"}>
                🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes!
                ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a
                private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed
                WiFi, Smart TV, pet-friendly comfort, and stylish interiors.
                Just minutes from Candolim Beach 🏖️, popular cafés, restaurants,
                and nightlife, it’s ideal for couples seeking romance,
                relaxation, and a touch of luxury in North Goa! ❤️🌴
              </p>
              <button
                className="text-button"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show less" : "Show more"}
                <ChevronRight />
              </button>
            </section>
            <section className="sleep-section">
              <h2>Where you’ll sleep</h2>
              <div className="sleep-grid">
                {[
                  ["bedroom-main", "Bedroom", "1 double bed", "bedroom"],
                  ["living-main", "Living room", "1 sofa", "living-room-1"],
                ].map(([id, name, detail, category]) => (
                  <button
                    className="sleep-card"
                    key={id}
                    onClick={() => setTour({ category })}
                  >
                    <img src={`/images/${id}.webp`} alt={name} />
                    <strong>{name}</strong>
                    <span>{detail}</span>
                  </button>
                ))}
              </div>
            </section>
            <section id="amenities" className="amenities-section">
              <h2>What this place offers</h2>
              <div className="amenities-grid">
                {amenities.map(([label, Icon, missing]) => (
                  <div className={missing ? "unavailable" : ""} key={label}>
                    <Icon />
                    <span>{label}</span>
                    {missing && (
                      <span className="sr-only"> — not reported</span>
                    )}
                  </div>
                ))}
              </div>
              <button
                className="outline-button"
                onClick={() => setSheet("amenities")}
              >
                Show all amenities
              </button>
            </section>
            <section id="calendar" className="calendar-section">
              <h2>
                {nights ? `${nights} nights in Candolim` : "Select your dates"}
              </h2>
              <p className="muted">
                {checkIn
                  ? new Date(checkIn + "T12:00:00").toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" },
                    )
                  : "Add check-in date"}
                {checkOut &&
                  ` – ${new Date(checkOut + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`}
              </p>
              <Calendar
                checkIn={checkIn}
                checkOut={checkOut}
                onChange={changeDates}
              />
            </section>
          </div>
          <aside className="booking-sidebar" aria-label="Book this stay">
            <div className="sticky-booking">
              <div className="discount-card">
                <span className="discount-icon" aria-hidden="true">
                  🏷️
                </span>
                <div>
                  <p>
                    {claimed
                      ? "Your 10% offer is saved."
                      : "Get 10% off your next stay."}
                  </p>
                  <button
                    className="text-button"
                    onClick={() => setSheet("terms")}
                  >
                    Terms apply
                  </button>
                </div>
                <button
                  className="soft-button"
                  disabled={claimed}
                  onClick={() => setClaimed(true)}
                >
                  {claimed ? (
                    <>
                      <Check />
                      Saved
                    </>
                  ) : (
                    "Claim"
                  )}
                </button>
              </div>
              <div className="booking-card">
                <p className="price">
                  <button
                    className="text-button"
                    onClick={() => setSheet("price")}
                  >
                    <strong>{nights ? money : "Add dates"}</strong>
                  </button>
                  {nights > 0 && <span> for {nights} nights</span>}
                </p>
                <div className="booking-fields">
                  <button
                    className="date-field"
                    onClick={() => setSheet("dates")}
                  >
                    <span>CHECK-IN</span>
                    {dateLabel(checkIn)}
                  </button>
                  <button
                    className="date-field"
                    onClick={() => setSheet("dates")}
                  >
                    <span>CHECKOUT</span>
                    {dateLabel(checkOut)}
                  </button>
                  <button
                    className="guest-field"
                    onClick={() => setSheet("guests")}
                  >
                    <span>
                      <b>GUESTS</b>
                      {guests} {guests === 1 ? "guest" : "guests"}
                    </span>
                    <ChevronDown />
                  </button>
                </div>
                <p className="cancellation">
                  {checkIn === listing.checkIn &&
                  checkOut === listing.checkOut ? (
                    <>
                      Free cancellation before <strong>17 October</strong>
                    </>
                  ) : (
                    "Check cancellation terms for your selected dates"
                  )}
                </p>
                <button
                  className="primary-button reserve-button"
                  onClick={reserve}
                >
                  Reserve
                </button>
                <p className="charge-note">You won’t be charged yet</p>
              </div>
              <button
                className="report-button"
                onClick={() => {
                  setNotice("");
                  setSheet("report");
                }}
              >
                <Flag />
                Report this listing
              </button>
            </div>
          </aside>
        </div>
        <section id="reviews" className="reviews-section">
          <div className="reviews-intro">
            <div className="big-rating">
              <Laurel />
              <strong>4.95</strong>
              <Laurel mirrored />
            </div>
            <h2>Guest favourite</h2>
            <p>
              One of the most loved homes on Airbnb based on
              <br />
              ratings, reviews and reliability
            </p>
          </div>
          <div className="rating-metrics">
            <div className="rating-bars">
              <strong>Overall rating</strong>
              {[5, 4, 3, 2, 1].map((n) => (
                <div key={n}>
                  <span>{n}</span>
                  <span className={`bar rating-${n}`}>
                    <i />
                  </span>
                </div>
              ))}
            </div>
            {[
              ["Cleanliness", "5.0", Sparkles],
              ["Accuracy", "5.0", Check],
              ["Check-in", "5.0", KeyRound],
              ["Communication", "5.0", MessageSquare],
              ["Location", "4.8", Map],
              ["Value", "4.9", Tag],
            ].map(([name, value, Icon]) => (
              <div key={name}>
                <strong>{name}</strong>
                <b>{value}</b>
                <Icon />
              </div>
            ))}
          </div>
          <div className="review-tags">
            {[
              "🛋️ Comfort 6",
              "✅ Accuracy 5",
              "🛁 Hot tub 5",
              "🌷 Condition 4",
              "🎁 Hospitality 8",
              "🧴 Cleanliness 4",
              "🧁 Amenities 2",
            ].map((tag) => (
              <button
                className="outline-button"
                key={tag}
                onClick={() => {
                  setSearch(tag.split(" ")[1]);
                  setSheet("reviews");
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <Review key={review.name} review={review} />
            ))}
          </div>
          <button
            className="outline-button"
            onClick={() => {
              setSearch("");
              setSheet("reviews");
            }}
          >
            Show all 19 reviews
          </button>
        </section>
        <section id="location" className="location-section">
          <h2>Where you’ll be</h2>
          <p>Candolim, Goa, India</p>
          <div
            className="map-panel"
            role="group"
            aria-label="Approximate location in Candolim near the coast. Exact address provided after booking."
          >
            <div className="map-sea" />
            <div className="map-road road-one" />
            <div className="map-road road-two" />
            <div className="map-park park-one" />
            <div className="map-park park-two" />
            <span className="map-label">Candolim</span>
            <span className="map-pin">
              <House />
            </span>
            <span className="map-caption">Approximate location</span>
            <button
              className="map-info icon-button"
              aria-label="Location details"
              onClick={() => setSheet("location")}
            >
              <Map />
            </button>
          </div>
          <p className="muted location-note">
            Exact location will be provided after booking.
          </p>
        </section>
        <section className="host-section">
          <h2>Meet your host</h2>
          <div className="host-layout">
            <div>
              <div className="host-profile">
                <div>
                  <span className="host-avatar large">
                    MIRASHYA
                    <br />
                    HOMES
                  </span>
                  <h2>
                    Mirashya
                    <br />
                    Homes
                  </h2>
                  <p>Host</p>
                </div>
                <div className="host-stats">
                  <p>
                    <strong>1,463</strong>Reviews
                  </p>
                  <p>
                    <strong>4.68 ★</strong>Rating
                  </p>
                  <p>
                    <strong>2</strong>Years hosting
                  </p>
                </div>
              </div>
              <p className="host-fact">Born in the 80s</p>
              <p>Where I went to school: NICMAR GOA</p>
            </div>
            <div>
              <h3>Co-Hosts</h3>
              <div className="cohosts">
                {[
                  "Sharath",
                  "Aman Dev Pahwa",
                  "Maria Karen Priyanka",
                  "Simran",
                  "Pallavi",
                  "Sanyukta",
                  "Shruti",
                  "Amisha",
                ].map((name) => (
                  <div key={name}>
                    <span className="avatar small">{name[0]}</span>
                    {name}
                  </div>
                ))}
              </div>
              <h3>Host details</h3>
              <p>
                Response rate: 100%
                <br />
                Responds within an hour
              </p>
              <button
                className="soft-button message-host"
                onClick={() => setSheet("message")}
              >
                Message host
              </button>
              <p className="host-payment">
                <ShieldCheck />
                To help protect your payment, always use Airbnb to send money
                and communicate with hosts.
              </p>
            </div>
          </div>
        </section>
        <section className="things-section">
          <h2>Things to know</h2>
          <div className="things-grid">
            <div>
              <CalendarDays />
              <h3>Cancellation policy</h3>
              <p>
                Free cancellation before 17 October. Cancel before check-in on
                18 October for a partial refund.
              </p>
              <p>Review this host’s full policy for details.</p>
              <button
                className="text-button"
                onClick={() => setSheet("cancellation")}
              >
                Learn more
              </button>
            </div>
            <div>
              <KeyRound />
              <h3>House rules</h3>
              <p>Check-in after 2:00 pm</p>
              <p>Checkout before 11:00 am</p>
              <p>3 guests maximum</p>
              <button className="text-button" onClick={() => setSheet("rules")}>
                Learn more
              </button>
            </div>
            <div>
              <ShieldCheck />
              <h3>Safety & property</h3>
              <p>Carbon monoxide alarm not reported</p>
              <p>Smoke alarm not reported</p>
              <p>Exterior security cameras on property</p>
              <button
                className="text-button"
                onClick={() => setSheet("safety")}
              >
                Learn more
              </button>
            </div>
          </div>
        </section>
        <section className="nearby-section">
          <h2>More stays nearby</h2>
          <div className="nearby-grid">
            {nearby.map(([title, price, rating], i) => (
              <button
                className="nearby-card"
                key={title}
                onClick={() => {
                  setNearbyIndex(i);
                  setSheet("nearby");
                }}
              >
                <img
                  src={`/images/nearby-${i + 1}.webp`}
                  alt={title}
                  loading="lazy"
                />
                <strong>{title}</strong>
                <span>
                  {price} · ★ {rating}
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>
            India <ChevronRight /> Goa <ChevronRight /> North Goa{" "}
            <ChevronRight /> Candolim
          </p>
          <div>
            <span>
              © 2026 Airbnb, Inc. ·{" "}
              <button
                className="text-button"
                onClick={() => setSheet("privacy")}
              >
                Privacy
              </button>{" "}
              ·{" "}
              <button className="text-button" onClick={() => setSheet("terms")}>
                Terms
              </button>
            </span>
            <span>English (IN) · ₹ INR</span>
          </div>
        </div>
      </footer>
      {tour && (
        <PhotoTour
          listing={listing}
          initialCategory={tour.category}
          onClose={() => setTour(null)}
          saved={saved}
          onSave={toggleSave}
          onShare={share}
        />
      )}
      {sheet && (
        <Modal
          className={`sheet ${sheet === "dates" ? "date-sheet" : ""}`}
          label={sheetTitles[sheet] || "Listing information"}
          onClose={() => setSheet(null)}
        >
          {(close) => (
            <div className="sheet-card">
              <header className="sheet-header">
                <button
                  data-autofocus
                  className="icon-button"
                  aria-label="Close dialog"
                  onClick={close}
                >
                  <X />
                </button>
                <h2>{sheetTitles[sheet] || "Listing information"}</h2>
              </header>
              <div className="sheet-body">
                {sheet === "nearby" && (
                  <>
                    <img
                      className="nearby-detail"
                      src={`/images/nearby-${nearbyIndex + 1}.webp`}
                      alt={nearby[nearbyIndex][0]}
                    />
                    <h3>{nearby[nearbyIndex][0]}</h3>
                    <p>
                      {nearby[nearbyIndex][1]} · ★ {nearby[nearbyIndex][2]}
                    </p>
                    <p>
                      Details and booking are unavailable for this nearby stay.
                    </p>
                  </>
                )}
                {sheet === "amenities" &&
                  amenityGroups.map(([group, items]) => (
                    <section className="amenity-group" key={group}>
                      <h3>{group}</h3>
                      {items.map(([name, Icon]) => (
                        <p key={name}>
                          <Icon />
                          {name}
                        </p>
                      ))}
                    </section>
                  ))}
                {sheet === "dates" && (
                  <>
                    <h3>
                      {nights
                        ? `${nights} nights in Candolim`
                        : "Choose your stay"}
                    </h3>
                    <Calendar
                      checkIn={checkIn}
                      checkOut={checkOut}
                      onChange={changeDates}
                      compact
                    />
                    <button
                      className="primary-button"
                      disabled={!nights}
                      onClick={close}
                    >
                      Save dates
                    </button>
                  </>
                )}
                {sheet === "guests" && (
                  <>
                    <div className="guest-stepper">
                      <div>
                        <h3>Guests</h3>
                        <p>Up to 3 guests</p>
                      </div>
                      <button
                        className="photo-arrow"
                        aria-label="Remove one guest"
                        disabled={guests <= 1}
                        onClick={() => setGuests((g) => g - 1)}
                      >
                        <Minus />
                      </button>
                      <span aria-live="polite">{guests}</span>
                      <button
                        className="photo-arrow"
                        aria-label="Add one guest"
                        disabled={guests >= 3}
                        onClick={() => setGuests((g) => g + 1)}
                      >
                        <Plus />
                      </button>
                    </div>
                    <button className="primary-button" onClick={close}>
                      Save guests
                    </button>
                  </>
                )}
                {sheet === "share" && (
                  <>
                    <div className="share-preview">
                      <img src="/images/patio-front.webp" alt="Private patio" />
                      <strong>{listing.title}</strong>
                    </div>
                    <button
                      className="outline-button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            window.location.origin,
                          );
                          setNotice("Link copied");
                        } catch {
                          setNotice(
                            "Copy the listing URL from the field below.",
                          );
                        }
                      }}
                    >
                      <Copy />
                      Copy link
                    </button>
                    <label className="field-label">
                      Listing link
                      <input
                        readOnly
                        value={
                          typeof window === "undefined"
                            ? ""
                            : window.location.origin
                        }
                        onFocus={(e) => e.target.select()}
                      />
                    </label>
                  </>
                )}
                {sheet === "reserve" && (
                  <>
                    <h3>Your trip</h3>
                    <p>
                      {dateLabel(checkIn)} – {dateLabel(checkOut)} · {guests}{" "}
                      guests
                    </p>
                    <div className="price-line">
                      <span>{nights} nights</span>
                      <strong>{money}</strong>
                    </div>
                    <p>
                      This assignment preview does not process reservations or
                      payments.
                    </p>
                    <button
                      className="primary-button"
                      onClick={() =>
                        setNotice(
                          "Your trip details are ready. No reservation or payment has been made.",
                        )
                      }
                    >
                      Review trip details
                    </button>
                  </>
                )}
                {sheet === "price" && (
                  <>
                    <div className="price-line">
                      <span>
                        {nights} nights ×{" "}
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 2,
                        }).format(listing.total / listing.nights)}
                      </span>
                      <span>{money}</span>
                    </div>
                    <div className="price-line">
                      <strong>Total</strong>
                      <strong>{money}</strong>
                    </div>
                    <p className="muted">
                      Price reproduced from the reference stay. Taxes and fees
                      are not independently verified.
                    </p>
                  </>
                )}
                {sheet === "reviews" && (
                  <>
                    <p>★ 4.95 · 19 reviews</p>
                    <p className="muted">
                      Showing the six review excerpts visible in the supplied
                      recording.
                    </p>
                    <div className="dialog-reviews">
                      {reviews.map((review) => (
                        <Review key={review.name} review={review} />
                      ))}
                    </div>
                  </>
                )}
                {sheet === "search" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setNotice(
                        /candolim|goa|india/i.test(search) || !search
                          ? "1 stay found in Candolim. Close this dialog to explore the apartment."
                          : "This preview contains one stay in Candolim, Goa.",
                      );
                    }}
                  >
                    <label className="field-label">
                      Where
                      <input
                        placeholder="Search destinations"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </label>
                    <p>Explore the available stay in Candolim, India.</p>
                    <button className="primary-button" type="submit">
                      <Search />
                      Search
                    </button>
                  </form>
                )}
                {sheet === "report" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setNotice(
                        "Your report details have been captured for this preview session. Nothing has been sent or saved permanently.",
                      );
                    }}
                  >
                    <label className="field-label">
                      What would you like to report?
                      <select defaultValue="">
                        <option value="" disabled>
                          Select a reason
                        </option>
                        <option>Inaccurate information</option>
                        <option>Photo issue</option>
                        <option>Other concern</option>
                      </select>
                    </label>
                    <label className="field-label">
                      Details
                      <textarea required placeholder="Describe the issue" />
                    </label>
                    <button className="primary-button">Review report</button>
                  </form>
                )}
                {sheet === "menu" && (
                  <div className="menu-list">
                    <button
                      onClick={() => {
                        toggleSave();
                        setNotice(
                          saved
                            ? "Removed from saved stays"
                            : "Added to saved stays",
                        );
                      }}
                    >
                      <Heart />
                      {saved ? "Remove saved stay" : "Save this stay"}
                    </button>
                    <button onClick={() => setSheet("host-info")}>
                      <House />
                      Hosting information
                    </button>
                    <button onClick={() => setSheet("language")}>
                      <Globe />
                      Language and currency
                    </button>
                  </div>
                )}
                {sheet === "language" && (
                  <>
                    <h3>English (India)</h3>
                    <p>Currency: Indian rupee — INR ₹</p>
                    <p className="muted">
                      This desktop preview is available in English.
                    </p>
                  </>
                )}
                {sheet === "terms" && (
                  <>
                    <h3>10% off your next stay</h3>
                    <p>
                      The reference displays this offer with “Terms apply”. Full
                      eligibility, validity dates, and redemption terms were not
                      supplied.
                    </p>
                    <p>
                      Saving the offer in this preview does not redeem a
                      discount or change your booking price.
                    </p>
                  </>
                )}
                {sheet === "location" && (
                  <>
                    <h3>Candolim, Goa, India</h3>
                    <p>
                      The location illustration is approximate. An exact address
                      and original map data were not supplied.
                    </p>
                  </>
                )}
                {sheet === "translation" && (
                  <p>
                    The visible description is reproduced from the supplied
                    English recording. The original untranslated description was
                    not supplied.
                  </p>
                )}
                {sheet === "message" && (
                  <>
                    <h3>Mirashya Homes</h3>
                    <p>Response rate: 100% · Responds within an hour</p>
                    <p>
                      Host messaging is not connected in this assignment
                      preview.
                    </p>
                  </>
                )}
                {sheet === "host-info" && (
                  <p>
                    This assignment implements one property listing. Host
                    registration and listing management are outside this
                    preview.
                  </p>
                )}
                {sheet === "privacy" && (
                  <p>
                    This local preview stores only your saved-listing preference
                    in your browser. It does not connect to analytics,
                    authentication, or payment services.
                  </p>
                )}
                {sheet === "cancellation" && (
                  <>
                    <p>
                      Free cancellation before 17 October. Cancel before
                      check-in on 18 October for a partial refund.
                    </p>
                    <p>
                      The complete policy was not supplied. Dates reflect the
                      reference stay.
                    </p>
                  </>
                )}
                {sheet === "rules" && (
                  <>
                    <p>Check-in after 2:00 pm</p>
                    <p>Checkout before 11:00 am</p>
                    <p>3 guests maximum</p>
                    <p>Self check-in with building staff.</p>
                  </>
                )}
                {sheet === "safety" && (
                  <>
                    <p>Carbon monoxide alarm not reported</p>
                    <p>Smoke alarm not reported</p>
                    <p>Exterior security cameras on property</p>
                  </>
                )}
                {notice && (
                  <p className="notice" role="status">
                    {notice}
                  </p>
                )}
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
const sheetTitles = {
  nearby: "Nearby stay",
  amenities: "What this place offers",
  dates: "Select dates",
  guests: "Who’s coming?",
  share: "Share this place",
  reserve: "Review your stay",
  price: "Price details",
  reviews: "Guest reviews",
  search: "Search stays",
  report: "Report this listing",
  menu: "Menu",
  language: "Language and currency",
  terms: "Offer terms",
  location: "Where you’ll be",
  translation: "Original description",
  message: "Contact your host",
  "host-info": "Become a host",
  privacy: "Privacy",
  cancellation: "Cancellation policy",
  rules: "House rules",
  safety: "Safety & property",
};
