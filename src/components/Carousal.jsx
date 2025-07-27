import React from "react";
import burgerImg from "../images/burger.jpg";
import pastryImg from "../images/pastry.jpg";
import barbequeImg from "../images/barbeque.jpg";

const Carousal = () => {
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id="carousel">
          {/* Search Overlay */}
          <div
            className="carousel-caption d-flex justify-content-center align-items-center flex-column"
            style={{ zIndex: "10", bottom: "30%", gap: "1rem" }}
          >
            <h2 className="text-white fw-bold">Craving Something Delicious?</h2>
            <form className="d-flex w-75 mx-auto">
              <input
                className="form-control me-2 bg-dark text-white border-secondary"
                type="search"
                placeholder="Search your favorite food..."
                aria-label="Search"
                style={{ boxShadow: "0 0 5px rgba(255,255,255,0.3)" }}
              />
              <button
                className="btn btn-success text-white px-4"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>

          {/* Slides */}
          <div className="carousel-item active">
            <img
              src={burgerImg}
              className="d-block w-100"
              style={{ filter: "brightness(30%)", height: "90vh", objectFit: "cover" }}
              alt="burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src={pastryImg}
              className="d-block w-100"
              style={{ filter: "brightness(30%)", height: "90vh", objectFit: "cover" }}
              alt="pastry"
            />
          </div>
          <div className="carousel-item">
            <img
              src={barbequeImg}
              className="d-block w-100"
              style={{ filter: "brightness(30%)", height: "90vh", objectFit: "cover" }}
              alt="barbeque"
            />
          </div>
        </div>

        {/* Navigation */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousal;
