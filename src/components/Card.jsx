import React, { useRef, useState, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const options = props.options || {};
  const priceOptions = Object.keys(options);
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // <-- New state

  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);

  const finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = async () => {
    const food = data.find((item) => item.id === props.foodItem._id);

    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
      } else {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
      }
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000); // auto-hide after 2s
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <div
        className="card shadow-sm border-0 rounded-4 dark-card"
        style={{
          width: "18rem",
          backgroundColor: "#2c2f33",
          color: "#f1f1f1",
        }}
      >
        {/* Success Alert */}
        {showSuccess && (
          <div className="alert alert-success text-center rounded-0 mb-0 py-2">
            Item added successfully!
          </div>
        )}

        <img
          src={props.foodItem.img}
          className="card-img-top rounded-top-4"
          alt={props.foodItem.name}
          style={{
            height: "180px",
            objectFit: "cover",
            filter: "brightness(85%)",
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-success fw-bold text-center">
            {props.foodItem.name}
          </h5>

          <div className="d-flex justify-content-between my-2">
            <select
              className="form-select bg-dark text-white border-success"
              style={{ width: "48%" }}
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Qty: {i + 1}
                </option>
              ))}
            </select>

            <select
              className="form-select bg-dark text-white border-success"
              style={{ width: "48%" }}
              ref={priceRef}
              onChange={(e) => setsize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2 text-center fs-5 fw-semibold text-light">
            ₹{finalPrice}/-
          </div>

          <button
            className="btn btn-success mt-auto fw-bold text-white rounded-pill"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
