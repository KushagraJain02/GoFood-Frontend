import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Card from "../components/Card";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch(
      "https://gofoodbackend-sigma.vercel.app/api/foodData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="bg-dark text-light min-vh-100">
      <Navbar />

      {/* Carousel */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div
          className="carousel-inner"
          style={{ maxHeight: "500px", overflow: "hidden" }}
        >
          <div className="carousel-item active">
            <img
              src="../images/burger.jpg"
              className="d-block w-100"
              style={{
                filter: "brightness(40%)",
                objectFit: "cover",
                height: "500px",
              }}
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="../images/pastry.jpg"
              className="d-block w-100"
              style={{
                filter: "brightness(40%)",
                objectFit: "cover",
                height: "500px",
              }}
              alt="Pastry"
            />
          </div>
          <div className="carousel-item">
            <img
              src="../images/barbeque.jpg"
              className="d-block w-100"
              style={{
                filter: "brightness(40%)",
                objectFit: "cover",
                height: "500px",
              }}
              alt="BBQ"
            />
          </div>
        </div>

        {/* Carousel Controls */}
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

      {/* Search Bar below Carousel */}
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <input
            className="form-control w-75 bg-dark text-light border border-secondary rounded-pill px-4 py-2"
            type="search"
            placeholder="🔍 Search your favorite food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Food Sections */}
      <div className="container mt-5">
        {foodCat.length > 0 &&
          foodCat.map((data) => (
            <div className="mb-5" key={data._id}>
              <h3 className="fw-bold mb-3 text-info">{data.categoryName}</h3>
              <hr className="border-secondary" />
              <div className="row g-4">
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.categoryName === data.categoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItem) => (
                      <div
                        key={filterItem._id}
                        className="col-12 col-md-6 col-lg-3 d-flex justify-content-center"
                      >
                        <Card
                          foodItem={filterItem}
                          options={
                            Array.isArray(filterItem.options)
                              ? filterItem.options[0]
                              : {}
                          }
                        />
                      </div>
                    ))
                ) : (
                  <div className="text-muted">No data found.</div>
                )}
              </div>
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
