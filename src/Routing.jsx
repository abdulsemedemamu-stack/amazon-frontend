import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/landing/Landing";
import Auth from "./pages/auth/Auth";
import Payment from "./pages/payment/Payment";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Result from "./pages/result/Result";
import ProductDetail from "./pages/productdetail/ProductDetail";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Stripe Public Key
const stripePromise = loadStripe(
  "pk_test_51TWHuP6MOMeJZrN0qkit1hGSIWkEkLNKTiohgTpWMMp3xu7tN1WtDU9PqcetVQrjX8e3Sst3JGEeHkUvqsAMX67R00XaPYvxVX",
);

function Routing() {
  return (
    <Router>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Landing />} />

        {/* AUTH */}
        <Route path="/auth" element={<Auth />} />

        {/* PAYMENT */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute
              msg="You must log in to access payment"
              redirect="/payment"
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        {/* ORDERS */}
        <Route
          path="/order"
          element={
            <ProtectedRoute
              msg="You must log in to view your orders"
              redirect="/order"
            >
              <Order />
            </ProtectedRoute>
          }
        />

        {/* CART */}
        <Route path="/cart" element={<Cart />} />

        {/* CATEGORY */}
        <Route path="/category/:categoryName" element={<Result />} />

        {/* PRODUCT DETAILS */}
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default Routing;
