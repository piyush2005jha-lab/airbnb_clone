"use client";

export default function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav">

      <button className="bottom-nav-item active">
        <span className="bottom-nav-icon">⌕</span>
        <span>Explore</span>
      </button>

      <button className="bottom-nav-item">
        <span className="bottom-nav-icon">♡</span>
        <span>Wishlists</span>
      </button>

      <button className="bottom-nav-item">
        <span className="bottom-nav-icon">♧</span>
        <span>Trips</span>
      </button>

      <button className="bottom-nav-item">
        <span className="bottom-nav-icon">□</span>
        <span>Messages</span>
      </button>

      <button className="bottom-nav-item">
        <span className="bottom-nav-icon">◯</span>
        <span>Profile</span>
      </button>

    </nav>
  );
}