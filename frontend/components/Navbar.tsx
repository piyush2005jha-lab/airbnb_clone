"use client";

import { useEffect, useRef, useState } from "react";

interface NavbarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  {
    name: "All",
    icon: "🌍",
  },
  {
    name: "Homes",
    icon: "🏠",
  },
  {
    name: "Experiences",
    icon: "🎈",
  },
  {
    name: "Services",
    icon: "🛎️",
  },
];

export default function Navbar({
  activeCategory,
  onCategoryChange,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /* ==========================================
     LOAD THEME
  ========================================== */

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("airbnb-theme");

    const isDark =
      savedTheme === "dark";

    setDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, []);

  /* ==========================================
     OUTSIDE CLICK
  ========================================== */

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* ==========================================
     ESCAPE
  ========================================== */

  useEffect(() => {
    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* ==========================================
     CATEGORY
  ========================================== */

  function handleCategory(
    category: string
  ) {
    onCategoryChange(category);
    setMenuOpen(false);
  }

  /* ==========================================
     DARK MODE
  ========================================== */

  function toggleDarkMode() {
    const nextMode = !darkMode;

    setDarkMode(nextMode);

    if (nextMode) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "airbnb-theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "airbnb-theme",
        "light"
      );
    }
  }

  return (
    <header className="navbar">

      <div className="navbar-inner">

        {/* ======================================
            LOGO
        ====================================== */}

        <button
          type="button"
          className="airbnb-logo"
          onClick={() =>
            handleCategory("All")
          }
          aria-label="Airbnb home"
        >

          <span className="airbnb-logo-mark">

            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path
                d="M16 3.5c-2.4 0-4.2 1.7-5.7 4.4L4.1 19.1c-2.1 4-1.2 7.2 1.6 8.5 2.8 1.3 5.7-.1 7.7-3.6l2.6-4.6 2.6 4.6c2 3.5 4.9 4.9 7.7 3.6 2.8-1.3 3.7-4.5 1.6-8.5L21.7 7.9C20.2 5.2 18.4 3.5 16 3.5Zm0 3.2c1.1 0 2.2 1.1 3.1 2.8l6.1 11.2c1.2 2.3.9 4-.6 4.7-1.5.7-3-.3-4.2-2.4L16 16.2l-4.4 7.8c-1.2 2.1-2.7 3.1-4.2 2.4-1.5-.7-1.8-2.4-.6-4.7L12.9 9.5C13.8 7.8 14.9 6.7 16 6.7Z"
              />

              <circle
                cx="16"
                cy="12.8"
                r="2.2"
              />
            </svg>

          </span>

          <span className="airbnb-logo-text">
            airbnb
          </span>

        </button>


        {/* ======================================
            CATEGORIES
        ====================================== */}

        <nav className="desktop-nav">

          {categories.map(
            (category) => {

              const active =
                activeCategory ===
                category.name;

              return (
                <button
                  key={category.name}
                  type="button"
                  className={`nav-category ${
                    active
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleCategory(
                      category.name
                    )
                  }
                >

                  <span className="nav-category-icon">
                    {category.icon}
                  </span>

                  <span>
                    {category.name}
                  </span>

                </button>
              );

            }
          )}

        </nav>


        {/* ======================================
            RIGHT
        ====================================== */}

        <div
          className="navbar-right"
          ref={menuRef}
        >

          <button
            type="button"
            className="host-link"
          >
            Switch to hosting
          </button>


          {/* PROFILE */}

          <button
            type="button"
            className="profile-button"
            onClick={() =>
              setMenuOpen(
                (current) =>
                  !current
              )
            }
            aria-label="Profile menu"
            aria-expanded={menuOpen}
          >
            P
          </button>


          {/* MENU */}

          <button
            type="button"
            className={`menu-button ${
              menuOpen
                ? "menu-button-active"
                : ""
            }`}
            onClick={() =>
              setMenuOpen(
                (current) =>
                  !current
              )
            }
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >

            <span />
            <span />
            <span />

          </button>


          {/* ==================================
              DROPDOWN
          ================================== */}

          {menuOpen && (

            <div
              className="profile-menu"
              role="menu"
            >

              {/* WISHLISTS */}

              <button
                type="button"
                className="profile-menu-item"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <span className="menu-icon">
                  ♡
                </span>

                <span>
                  Wishlists
                </span>

              </button>


              {/* TRIPS */}

              <button
                type="button"
                className="profile-menu-item"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <span className="menu-icon">
                  ♧
                </span>

                <span>
                  Trips
                </span>

              </button>


              {/* MESSAGES */}

              <button
                type="button"
                className="profile-menu-item"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <span className="menu-icon">
                  ▢
                </span>

                <span>
                  Messages
                </span>

              </button>


              {/* PROFILE */}

              <button
                type="button"
                className="profile-menu-item"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <span className="menu-icon">
                  ◎
                </span>

                <span>
                  Profile
                </span>

              </button>


              <div className="menu-divider" />


              {/* NOTIFICATIONS */}

              <button
                type="button"
                className="profile-menu-item"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <span className="menu-icon">
                  ♧
                </span>

                <span>
                  Notifications
                </span>

              </button>


              {/* ACCOUNT */}

              <button
                type="button"
                className="profile-menu-item"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <span className="menu-icon">
                  ⚙
                </span>

                <span>
                  Account settings
                </span>

              </button>


              {/* LANGUAGE */}

              <button
                type="button"
                className="profile-menu-item"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <span className="menu-icon">
                  ◎
                </span>

                <span>
                  Languages & currency
                </span>

              </button>


              {/* HELP */}

              <button
                type="button"
                className="profile-menu-item"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <span className="menu-icon">
                  ?
                </span>

                <span>
                  Help Centre
                </span>

              </button>


              <div className="menu-divider" />


              {/* DARK MODE */}

              <button
                type="button"
                className="profile-menu-item theme-item"
                onClick={
                  toggleDarkMode
                }
              >

                <span className="menu-icon">
                  {darkMode
                    ? "☀"
                    : "☾"}
                </span>

                <span className="theme-label">
                  {darkMode
                    ? "Light mode"
                    : "Dark mode"}
                </span>

                <span
                  className={`theme-switch ${
                    darkMode
                      ? "on"
                      : ""
                  }`}
                >
                  <span />
                </span>

              </button>


              <div className="menu-divider" />


              {/* BECOME A HOST */}

              <button
                type="button"
                className="become-host"
                onClick={() =>
                  handleCategory("Homes")
                }
              >

                <div className="become-host-content">

                  <strong>
                    Become a host
                  </strong>

                  <span>
                    It&apos;s easy to start
                    hosting and earn
                    extra income.
                  </span>

                </div>

                <span className="host-emoji">
                  🧑‍💼
                </span>

              </button>


              {/* REFER */}

              <button
                type="button"
                className="profile-menu-item no-icon-item"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <span>
                  Refer a host
                </span>

              </button>


              {/* CO HOST */}

              <button
                type="button"
                className="profile-menu-item no-icon-item"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <span>
                  Find a co-host
                </span>

              </button>


              <div className="menu-divider" />


              {/* LOG OUT */}

              <button
                type="button"
                className="profile-menu-item no-icon-item"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <span>
                  Log out
                </span>

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}