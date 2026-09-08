"use client";

import { useEffect, useState } from "react";

type SearchPanel = "where" | "when" | "who" | null;

interface SearchBarProps {
  onSearch?: (location: string) => void;
}

export default function SearchBar({
  onSearch,
}: SearchBarProps) {
  const [activePanel, setActivePanel] =
    useState<SearchPanel>(null);

  const [scrolled, setScrolled] = useState(false);

  const [destination, setDestination] = useState("");

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const [checkIn, setCheckIn] =
    useState<{ month: string; day: number } | null>(null);

  const [checkOut, setCheckOut] =
    useState<{ month: string; day: number } | null>(null);

  /* ========================================
     SCROLL DETECTION
  ======================================== */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 70);
        ticking = false;
      });

      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* ========================================
     DATE
  ======================================== */

  const monthOrder = [
    "September 2026",
    "October 2026",
  ];

  function isBefore(
    a: { month: string; day: number },
    b: { month: string; day: number }
  ) {
    const aIndex = monthOrder.indexOf(a.month);
    const bIndex = monthOrder.indexOf(b.month);

    if (aIndex !== bIndex) {
      return aIndex < bIndex;
    }

    return a.day < b.day;
  }

  function selectDate(
    month: string,
    day: number
  ) {
    const clicked = {
      month,
      day,
    };

    if (!checkIn || checkOut) {
      setCheckIn(clicked);
      setCheckOut(null);
      return;
    }

    if (isBefore(clicked, checkIn)) {
      setCheckIn(clicked);
      setCheckOut(null);
      return;
    }

    setCheckOut(clicked);
  }

  function formatDate(
    value: { month: string; day: number } | null
  ) {
    if (!value) {
      return null;
    }

    const shortMonth =
      value.month
        .split(" ")[0]
        .slice(0, 3);

    return `${shortMonth} ${value.day}`;
  }

  const whenLabel =
    checkIn && checkOut
      ? `${formatDate(checkIn)} – ${formatDate(checkOut)}`
      : checkIn
      ? `${formatDate(checkIn)} – Add checkout`
      : "Add dates";

  /* ========================================
     DESTINATION
  ======================================== */

  function selectDestination(value: string) {
    setDestination(value);
    setActivePanel(null);
  }

  /* ========================================
     REAL SEARCH
  ======================================== */

  function performSearch() {
    const value = destination.trim();

    onSearch?.(value);

    setActivePanel(null);
  }

  function handleDestinationKeyDown(
    event: React.KeyboardEvent
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  }

  /* ========================================
     GUESTS
  ======================================== */

  function updateGuest(
    type: keyof typeof guests,
    amount: number
  ) {
    setGuests((current) => ({
      ...current,
      [type]: Math.max(
        0,
        current[type] + amount
      ),
    }));
  }

  const totalGuests =
    guests.adults +
    guests.children;

  /* ========================================
     PANEL
  ======================================== */

  function togglePanel(
    panel: SearchPanel
  ) {
    setActivePanel((current) =>
      current === panel
        ? null
        : panel
    );
  }

  /* ========================================
     COMPACT VALUES
  ======================================== */

  const compactLocation =
    destination || "Anywhere";

  const compactDates =
    checkIn && checkOut
      ? `${formatDate(checkIn)} – ${formatDate(checkOut)}`
      : "Anytime";

  const compactGuests =
    totalGuests > 0
      ? `${totalGuests} guest${
          totalGuests > 1 ? "s" : ""
        }`
      : "Add guests";

  /* ========================================
     OPEN SEARCH AFTER SCROLL
  ======================================== */

  function openCompactSearch() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setActivePanel("where");
    }, 250);
  }

  return (
    <>
      {/* =================================================
          MAIN SEARCH
      ================================================= */}

      <div
        className={`search-wrapper ${
          scrolled ? "is-scrolled" : ""
        }`}
        onClick={() => setActivePanel(null)}
      >
        {/* MOBILE */}

        <button
          className="mobile-search"
          onClick={(event) => {
            event.stopPropagation();
            setActivePanel("where");
          }}
        >
          <span className="mobile-search-icon">
            ⌕
          </span>

          <span className="mobile-search-text">
            Start your search
          </span>
        </button>

        {/* DESKTOP */}

        <div
          className={`search-bar ${
            scrolled
              ? "search-bar-compacting"
              : ""
          }`}
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          {/* WHERE */}

          <button
            className={`search-item search-location ${
              activePanel === "where"
                ? "search-item-active"
                : ""
            }`}
            onClick={() =>
              togglePanel("where")
            }
          >
            <span className="search-label">
              Where
            </span>

            <span className="search-value">
              {destination ||
                "Search destinations"}
            </span>
          </button>

          <div className="search-divider" />

          {/* WHEN */}

          <button
            className={`search-item search-when ${
              activePanel === "when"
                ? "search-item-active"
                : ""
            }`}
            onClick={() =>
              togglePanel("when")
            }
          >
            <span className="search-label">
              When
            </span>

            <span className="search-value">
              {whenLabel}
            </span>
          </button>

          <div className="search-divider" />

          {/* WHO */}

          <button
            className={`search-item search-who ${
              activePanel === "who"
                ? "search-item-active"
                : ""
            }`}
            onClick={() =>
              togglePanel("who")
            }
          >
            <div className="who-content">
              <span className="search-label">
                Who
              </span>

              <span className="search-value">
                {totalGuests === 0
                  ? "Add guests"
                  : `${totalGuests} guest${
                      totalGuests > 1
                        ? "s"
                        : ""
                    }`}
              </span>
            </div>

            {/* SEARCH BUTTON */}

            <span
              className="search-button"
              onClick={(event) => {
                event.stopPropagation();
                performSearch();
              }}
            >
              🔍

              <span className="search-button-text">
                Search
              </span>
            </span>
          </button>
        </div>

        {/* =================================================
            WHERE PANEL
        ================================================= */}

        {activePanel === "where" && (
          <div
            className="search-panel destination-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="panel-title">
              Suggested destinations
            </div>

            {/* CUSTOM SEARCH INPUT */}

            <div className="destination-input-wrapper">
              <span>⌕</span>

              <input
                autoFocus
                value={destination}
                onChange={(event) =>
                  setDestination(
                    event.target.value
                  )
                }
                onKeyDown={
                  handleDestinationKeyDown
                }
                placeholder="Search destinations"
              />
            </div>

            <Destination
              icon="➤"
              title="Nearby"
              subtitle="Find what's around you"
              onClick={() =>
                selectDestination("")
              }
            />

            <Destination
              icon="▦"
              title="Noida, Uttar Pradesh"
              subtitle="Near you"
              onClick={() =>
                selectDestination("Noida")
              }
            />

            <Destination
              icon="🏖"
              title="North Goa, Goa"
              subtitle="Popular beach destination"
              onClick={() =>
                selectDestination("Goa")
              }
            />

            <Destination
              icon="🏡"
              title="Dehradun, Uttarakhand"
              subtitle="For nature lovers"
              onClick={() =>
                selectDestination("Dehradun")
              }
            />

            <Destination
              icon="🏙"
              title="New Delhi, Delhi"
              subtitle="For sights like India Gate"
              onClick={() =>
                selectDestination("Delhi")
              }
            />

            <Destination
              icon="🏔"
              title="Manali, Himachal Pradesh"
              subtitle="Great for winter getaways"
              onClick={() =>
                selectDestination("Manali")
              }
            />

            {/* SEARCH FROM PANEL */}

            <button
              className="panel-search-button"
              onClick={performSearch}
            >
              🔍 Search homes
            </button>
          </div>
        )}

        {/* =================================================
            WHEN PANEL
        ================================================= */}

        {activePanel === "when" && (
          <div
            className="search-panel calendar-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="calendar-toggle">
              <button className="calendar-toggle-active">
                Dates
              </button>

              <button>
                Flexible
              </button>
            </div>

            <div className="calendar-header">
              <button>‹</button>

              <h3>
                September 2026
              </h3>

              <h3>
                October 2026
              </h3>

              <button>›</button>
            </div>

            <div className="calendar-months">
              <CalendarMonth
                month="September 2026"
                startDay={2}
                days={30}
                checkIn={checkIn}
                checkOut={checkOut}
                onSelect={selectDate}
              />

              <CalendarMonth
                month="October 2026"
                startDay={4}
                days={31}
                checkIn={checkIn}
                checkOut={checkOut}
                onSelect={selectDate}
              />
            </div>

            <div className="date-options">
              <button className="date-option-active">
                Exact dates
              </button>

              <button>± 1 day</button>
              <button>± 2 days</button>
              <button>± 3 days</button>
              <button>± 7 days</button>
              <button>± 14 days</button>
            </div>

            {(checkIn || checkOut) && (
              <div
                className="date-options"
                style={{
                  marginTop: 12,
                }}
              >
                <button
                  onClick={() => {
                    setCheckIn(null);
                    setCheckOut(null);
                  }}
                >
                  Clear dates
                </button>
              </div>
            )}
          </div>
        )}

        {/* =================================================
            WHO PANEL
        ================================================= */}

        {activePanel === "who" && (
          <div
            className="search-panel guests-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <GuestRow
              title="Adults"
              subtitle="Ages 13 or above"
              value={guests.adults}
              onMinus={() =>
                updateGuest(
                  "adults",
                  -1
                )
              }
              onPlus={() =>
                updateGuest(
                  "adults",
                  1
                )
              }
            />

            <GuestRow
              title="Children"
              subtitle="Ages 2–12"
              value={guests.children}
              onMinus={() =>
                updateGuest(
                  "children",
                  -1
                )
              }
              onPlus={() =>
                updateGuest(
                  "children",
                  1
                )
              }
            />

            <GuestRow
              title="Infants"
              subtitle="Under 2"
              value={guests.infants}
              onMinus={() =>
                updateGuest(
                  "infants",
                  -1
                )
              }
              onPlus={() =>
                updateGuest(
                  "infants",
                  1
                )
              }
            />

            <GuestRow
              title="Pets"
              subtitle="Bringing a service animal?"
              value={guests.pets}
              onMinus={() =>
                updateGuest(
                  "pets",
                  -1
                )
              }
              onPlus={() =>
                updateGuest(
                  "pets",
                  1
                )
              }
            />
          </div>
        )}
      </div>

      {/* =================================================
          COMPACT SEARCH
      ================================================= */}

      <button
        className={`compact-search ${
          scrolled
            ? "compact-search-visible"
            : ""
        }`}
        onClick={openCompactSearch}
        aria-label="Open search"
      >
        <div className="compact-search-part">
          <span className="compact-home">
            🏠
          </span>

          <strong>
            {compactLocation}
          </strong>
        </div>

        <span className="compact-divider" />

        <div className="compact-search-part">
          <strong>
            {compactDates}
          </strong>
        </div>

        <span className="compact-divider" />

        <div className="compact-search-part">
          <strong>
            {compactGuests}
          </strong>
        </div>

        <span className="compact-search-button">
          🔍
        </span>
      </button>
    </>
  );
}


/* =====================================================
   DESTINATION
===================================================== */

function Destination({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      className="destination-option"
      onClick={onClick}
    >
      <div className="destination-icon blue">
        {icon}
      </div>

      <div>
        <strong>
          {title}
        </strong>

        <span>
          {subtitle}
        </span>
      </div>
    </button>
  );
}


/* =====================================================
   CALENDAR
===================================================== */

function CalendarMonth({
  month,
  startDay,
  days,
  checkIn,
  checkOut,
  onSelect,
}: {
  month: string;
  startDay: number;
  days: number;
  checkIn?: {
    month: string;
    day: number;
  } | null;
  checkOut?: {
    month: string;
    day: number;
  } | null;
  onSelect?: (
    month: string,
    day: number
  ) => void;
}) {
  const dayNames = [
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
  ];

  const cells = [];

  for (
    let i = 0;
    i < startDay;
    i++
  ) {
    cells.push(
      <span
        key={`empty-${i}`}
      />
    );
  }

  function dayStatus(day: number) {
    const isCheckIn =
      checkIn?.month === month &&
      checkIn?.day === day;

    const isCheckOut =
      checkOut?.month === month &&
      checkOut?.day === day;

    if (
      isCheckIn ||
      isCheckOut
    ) {
      return "date-selected";
    }

    if (
      checkIn &&
      checkOut &&
      checkIn.month === month &&
      checkOut.month === month &&
      day > checkIn.day &&
      day < checkOut.day
    ) {
      return "date-in-range";
    }

    return "";
  }

  for (
    let day = 1;
    day <= days;
    day++
  ) {
    cells.push(
      <button
        key={day}
        className={dayStatus(day)}
        onClick={() =>
          onSelect?.(
            month,
            day
          )
        }
      >
        {day}
      </button>
    );
  }

  return (
    <div className="calendar-month">
      <h3>{month}</h3>

      <div className="calendar-days">
        {dayNames.map(
          (day, index) => (
            <span key={index}>
              {day}
            </span>
          )
        )}

        {cells}
      </div>
    </div>
  );
}


/* =====================================================
   GUEST ROW
===================================================== */

function GuestRow({
  title,
  subtitle,
  value,
  onMinus,
  onPlus,
}: {
  title: string;
  subtitle: string;
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div className="guest-row">
      <div className="guest-info">
        <strong>
          {title}
        </strong>

        <span>
          {subtitle}
        </span>
      </div>

      <div className="guest-controls">
        <button
          className={
            value === 0
              ? "disabled"
              : ""
          }
          onClick={onMinus}
        >
          −
        </button>

        <span>
          {value}
        </span>

        <button
          onClick={onPlus}
        >
          +
        </button>
      </div>
    </div>
  );
}