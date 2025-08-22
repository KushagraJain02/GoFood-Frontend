import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

const Cart = () => {
  const data = useCart();
  const dispatch = useDispatchCart();

  // ✅ Fix: use OR to correctly handle empty cart
  if (!data || data.length === 0) {
    return (
      <div className="empty-cart text-center my-5">The Cart is Empty!</div>
    );
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/orderData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString(),
          }),
        }
      );

      if (response.ok) {
        dispatch({ type: "DROP" });
        alert("Order placed successfully!");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="cart-container container m-auto mt-5 table-responsive">
      <table className="table cart-table table-hover text-light">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Option</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>₹{food.price}</td>
              <td>
                <button
                  type="button"
                  className="btn p-0"
                  onClick={() => dispatch({ type: "REMOVE", index })}
                >
                  <img
                    src="../trash.png"
                    alt="delete"
                    style={{ width: "24px", height: "24px", cursor: "pointer" }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-price fw-bold fs-5 mt-3">
        Total Price: ₹{totalPrice}/-
      </div>
      <button
        className="checkout-btn btn btn-success mt-3"
        onClick={handleCheckOut}
      >
        Check Out
      </button>
    </div>
  );
};

export default Cart;
