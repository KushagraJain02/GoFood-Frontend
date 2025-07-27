import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-custom py-4 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex align-items-center mb-3 mb-md-0">
          <Link to="/" className="me-2 fs-5 fw-semibold text-decoration-none">
            GoFood
          </Link>
          <span className="text-muted">© 2025 GoFood, Inc</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
