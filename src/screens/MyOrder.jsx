import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

const MyOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrder = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/myOrderData`, // ✅ use env variable
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: localStorage.getItem("userEmail"),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to fetch orders");

      const response = await res.json();
      setOrderData(response?.orderData?.order_data || []);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div className="bg-dark min-vh-100 text-light">
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-4 text-center">🧾 My Orders</h2>

        {loading ? (
          <div className="text-center text-muted fs-5 my-5">
            Loading your orders...
          </div>
        ) : orderData.length === 0 ? (
          <div className="text-center text-muted fs-5 my-5">
            No orders found.
          </div>
        ) : (
          <div className="row">
            {orderData
              .slice()
              .reverse()
              .map((orderGroup, i) => (
                <React.Fragment key={i}>
                  {orderGroup.map((item, j) =>
                    item.Order_date ? (
                      <div className="w-100 my-4" key={`date-${i}-${j}`}>
                        <hr className="border-secondary" />
                        <h5 className="text-center text-muted fw-semibold">
                          Order Date: {item.Order_date}
                        </h5>
                      </div>
                    ) : (
                      <div
                        className="col-12 col-md-6 col-lg-4 d-flex"
                        key={`item-${i}-${j}`}
                      >
                        <div className="card flex-fill border-0 shadow-sm mb-4 bg-dark text-white rounded-4">
                          <div className="card-body">
                            <h5 className="card-title fw-bold text-warning">
                              {item.name}
                            </h5>
                            <div className="d-flex justify-content-between flex-wrap mt-3">
                              <span className="badge bg-secondary p-2">
                                Qty: {item.qty}
                              </span>
                              <span className="badge bg-secondary p-2">
                                Size: {item.size}
                              </span>
                              <span className="badge bg-success p-2">
                                ₹{item.price}/-
                              </span>
                            </div>
                            <div className="mt-3 small text-muted">
                              <i className="bi bi-calendar-event"></i> Date:{" "}
                              {orderGroup.find((it) => it.Order_date)
                                ?.Order_date || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </React.Fragment>
              ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrder;
