"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Keyboard } from "lucide-react";
export default function Calendar({
  checkIn,
  checkOut,
  onChange,
  compact = false,
}) {
  const [month, setMonth] = useState(9);
  const [choosingEnd, setChoosingEnd] = useState(false);
  const dateString = (year, m, day) =>
    `${year}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  function choose(value) {
    if (!choosingEnd || !checkIn || value <= checkIn) {
      onChange(value, "");
      setChoosingEnd(true);
    } else {
      onChange(checkIn, value);
      setChoosingEnd(false);
    }
  }
  return (
    <div className={`calendar ${compact ? "compact-calendar" : ""}`}>
      <div className="calendar-months">
        {[month, month + 1].map((m, idx) => {
          const first = new Date(2026, m, 1),
            year = first.getFullYear(),
            normalized = first.getMonth();
          const label = first.toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          });
          const count = new Date(year, normalized + 1, 0).getDate();
          return (
            <div className="month" key={m}>
              <div className="month-heading">
                {idx === 0 && (
                  <button
                    className="icon-button month-prev"
                    aria-label="Previous month"
                    onClick={() => setMonth((m) => m - 1)}
                  >
                    <ChevronLeft />
                  </button>
                )}
                <h3>{label}</h3>
                {idx === 1 && (
                  <button
                    className="icon-button month-next"
                    aria-label="Next month"
                    onClick={() => setMonth((m) => m + 1)}
                  >
                    <ChevronRight />
                  </button>
                )}
              </div>
              <div className="days" role="group" aria-label={label}>
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <span className="weekday" key={`day-${i}`} aria-hidden="true">
                    {d}
                  </span>
                ))}
                {Array.from({ length: first.getDay() }, (_, i) => (
                  <span key={`blank-${i}`} />
                ))}
                {Array.from({ length: count }, (_, i) => {
                  const value = dateString(year, normalized, i + 1),
                    selected = value === checkIn || value === checkOut,
                    between =
                      checkIn &&
                      checkOut &&
                      value > checkIn &&
                      value < checkOut;
                  return (
                    <button
                      key={value}
                      className={`${selected ? "selected" : ""} ${between ? "in-range" : ""}`}
                      aria-label={`${i + 1} ${label}`}
                      aria-pressed={selected}
                      onClick={() => choose(value)}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="calendar-footer">
        <span>
          <Keyboard aria-hidden="true" />
          <span className="sr-only">
            Use Tab to navigate dates and Enter to select.
          </span>
        </span>
        <span className="muted" aria-live="polite">
          {choosingEnd ? "Select checkout date" : ""}
        </span>
        <button
          className="text-button"
          onClick={() => {
            onChange("", "");
            setChoosingEnd(false);
          }}
        >
          Clear dates
        </button>
      </div>
    </div>
  );
}
