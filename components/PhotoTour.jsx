"use client";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Grip,
  Upload,
  Heart,
} from "lucide-react";
import Modal from "./Modal";
export default function PhotoTour({
  listing,
  onClose,
  initialCategory,
  saved,
  onSave,
  onShare,
}) {
  const [index, setIndex] = useState(null);
  const scrollRef = useRef(null);
  const photos = listing.categories.flatMap((category) =>
    category.photos.map((photo) => ({ ...photo, category: category.name })),
  );
  const jump = (id, smooth = true) => {
    const section = document.getElementById(`tour-${id}`);
    const scroller = scrollRef.current;
    if (section && scroller) {
      const gap = parseFloat(
        getComputedStyle(scroller).getPropertyValue("--space-4"),
      );
      scroller.scrollTo({
        top:
          scroller.scrollTop +
          section.getBoundingClientRect().top -
          scroller.getBoundingClientRect().top -
          gap,
        behavior:
          smooth && !matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "smooth"
            : "instant",
      });
    }
    section?.querySelector("h2")?.focus({ preventScroll: true });
  };
  useEffect(() => {
    if (initialCategory)
      requestAnimationFrame(() => jump(initialCategory, false));
  }, [initialCategory]);
  function openPhoto(id) {
    setIndex(photos.findIndex((photo) => photo.id === id));
  }
  return (
    <>
      <Modal className="fullscreen tour" label="Photo tour" onClose={onClose}>
        {(close) => (
          <>
            <header className="overlay-header">
              <button
                data-autofocus
                className="icon-button"
                aria-label="Close photo tour"
                onClick={close}
              >
                <ChevronLeft />
              </button>
              <h1>Photo tour</h1>
              <div className="overlay-actions">
                <button
                  className="icon-button"
                  aria-label="Share this listing"
                  onClick={onShare}
                >
                  <Upload />
                </button>
                <button
                  className="icon-button"
                  aria-label={saved ? "Unsave listing" : "Save listing"}
                  aria-pressed={saved}
                  onClick={onSave}
                >
                  <Heart fill={saved ? "currentColor" : "none"} />
                </button>
              </div>
            </header>
            <div className="tour-scroll" ref={scrollRef}>
              <div className="tour-container">
                <nav className="category-nav" aria-label="Photo categories">
                  {listing.categories.map((category) => (
                    <button key={category.id} onClick={() => jump(category.id)}>
                      <img src={category.photos[0].src} alt="" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </nav>
                {listing.categories.map((category) => (
                  <section
                    id={`tour-${category.id}`}
                    className="tour-section"
                    key={category.id}
                  >
                    <div className="tour-description">
                      <h2 tabIndex={-1}>{category.name}</h2>
                      {category.amenities && <p>{category.amenities}</p>}
                    </div>
                    <div className="tour-photo-grid">
                      {category.photos.map((photo, i) => (
                        <button
                          className={
                            i % 3 === 0 ? "tour-photo wide" : "tour-photo"
                          }
                          key={photo.id}
                          onClick={() => openPhoto(photo.id)}
                          aria-label={`Open ${category.name} photo ${i + 1}`}
                        >
                          <img
                            src={listing.tourSources?.[photo.id] || photo.src}
                            alt={photo.alt}
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </>
        )}
      </Modal>
      {index !== null && (
        <Lightbox
          photos={photos}
          index={index}
          setIndex={setIndex}
          onClose={() => setIndex(null)}
        />
      )}
    </>
  );
}
function Lightbox({ photos, index, setIndex, onClose }) {
  const closeRef = useRef(null);
  const photo = photos[index];
  useEffect(() => {
    function key(event) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((i) => Math.min(photos.length - 1, i + 1));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      }
    }
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [photos.length, setIndex]);
  return (
    <Modal
      className="fullscreen lightbox"
      label="Photo viewer"
      closeRef={closeRef}
      onClose={onClose}
    >
      {(close) => (
        <>
          <header className="overlay-header">
            <button
              className="icon-button"
              aria-label="Back to photo tour"
              onClick={close}
            >
              <Grip />
            </button>
            <h1 aria-live="polite">{photo.category}</h1>
            <div className="overlay-actions">
              <span
                className="photo-counter"
                aria-live="polite"
                aria-atomic="true"
              >
                {index + 1} of {photos.length}
              </span>
              <button
                data-autofocus
                className="icon-button"
                aria-label="Close photo viewer"
                onClick={close}
              >
                <X />
              </button>
            </div>
          </header>
          <div className="lightbox-stage">
            <button
              className="photo-arrow previous"
              aria-label="Previous photo"
              disabled={index === 0}
              onClick={() => setIndex((i) => i - 1)}
            >
              <ChevronLeft />
            </button>
            <img
              key={photo.id}
              className="lightbox-photo"
              src={photo.src}
              alt={photo.alt}
            />
            <button
              className="photo-arrow next"
              aria-label="Next photo"
              disabled={index === photos.length - 1}
              onClick={() => setIndex((i) => i + 1)}
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
