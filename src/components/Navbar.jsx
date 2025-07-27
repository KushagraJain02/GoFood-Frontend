import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  let data = useCart();
  const [cartView, setcartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom py-3">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fs-2 fst-italic" to="/">
          GoFood
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/">
                Home
              </Link>
            </li>

            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link className="nav-link fs-5" to="/myOrder">
                  My Orders
                </Link>
              </li>
            )}
          </ul>

          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link
                className="btn btn-outline-accent me-3 btn-rounded"
                to="/login"
              >
                Login
              </Link>
              <Link className="btn btn-accent btn-rounded" to="/createuser">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-accent me-3 btn-rounded d-flex align-items-center"
                onClick={() => setcartView(true)}
              >
                My Cart
                <Badge pill bg="danger" className="ms-2">
                  {data.length}
                </Badge>
              </button>

              {cartView && (
                <Modal onClose={() => setcartView(false)}>
                  <Cart />
                </Modal>
              )}

              <button
                className="btn btn-danger btn-rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
