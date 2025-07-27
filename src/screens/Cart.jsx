import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (!data && data.length === 0) {
    return <div className="empty-cart">The Cart is Empty!</div>;
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("https://gofoodbackend-sigma.vercel.app/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="cart-container container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
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
                <button type="button" className="btn p-0">
                  <img
                    src="../trash.png"
                    alt="delete"
                    style={{
                      width: "24px",
                      height: "24px",
                      cursor: "pointer",
                    }}
                    onClick={() => dispatch({ type: "REMOVE", index })}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-price">Total Price: ₹{totalPrice}/-</div>
      <button className="checkout-btn" onClick={handleCheckOut}>
        Check Out
      </button>
    </div>
  );
};

export default Cart;
