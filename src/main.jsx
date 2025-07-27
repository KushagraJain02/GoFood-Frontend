import "bootswatch/dist/darkly/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
// import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./screens/SignUp.jsx";
import { CartProvider } from "./components/ContextReducer.jsx";
import MyOrder from "./screens/MyOrder.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/createuser" element={<SignUp />} />
        <Route exact path="/myOrder" element={<MyOrder />} />
      </Routes>
      <App />
    </Router>
  </CartProvider>
);
