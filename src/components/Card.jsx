import React, { useRef, useState, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const priceOptions = Object.keys(props.options ?? {});
  const options = props.options ?? {};
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);

  const finalPrice = qty * parseInt(options[size] ?? 0);

  const handleAddToCart = async () => {
    const food = data.find((item) => item.id === props.foodItem._id);

    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty,
        });
      } else {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty,
          size,
        });
      }
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty,
        size,
      });
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="d-flex justify-content-center my-4 position-relative">
      {/* Floating success toast */}
      {showSuccess && (
        <div
          className="position-absolute top-0 start-50 translate-middle-x alert alert-success text-center py-2 px-3 shadow rounded-pill"
          style={{ zIndex: 20 }}
        >
          ✅ Added to Cart
        </div>
      )}

      <div
        className="card shadow-sm border-0 rounded-4 dark-card"
        style={{ width: "18rem", backgroundColor: "#2c2f33", color: "#f1f1f1" }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top rounded-top-4"
          alt={props.foodItem?.name || "Food image"}
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
              onChange={(e) => setqty(Number(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, i) => (
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
