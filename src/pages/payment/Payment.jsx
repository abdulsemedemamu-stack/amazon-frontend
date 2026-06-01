import React, { useContext, useState } from "react";

import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";

import classes from "./Payment.module.css";

import { DataContex } from "../../components/dataprovider/DataProvider";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import CurrencyFormat from "../../components/curencyformat/CurrencyFormat";

import axiosInstance from "../../Api/axios";

import { ClipLoader } from "react-spinners";

import { db } from "../../utility/firebase";

import { useNavigate } from "react-router-dom";

import { collection, doc, setDoc } from "firebase/firestore";
import { Type } from "../../utility/ActionType";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContex);

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const totalitem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [processing, setProcessing] = useState(false);

  const [cardError, setCardError] = useState("");

  const handleChange = (e) => {
    if (e.error) {
      setCardError(e.error.message);
    } else {
      setCardError("");
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      // BACKEND REQUEST
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data.clientSecret;

      // STRIPE PAYMENT
      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // SAVE ORDER TO FIRESTORE
      await setDoc(
        doc(db, "users", user.uid, "orders", confirmation.paymentIntent.id),
        {
          basket: basket,
          amount: confirmation.paymentIntent.amount,
          created: confirmation.paymentIntent.created,
        },
      );

      (dispatch({ type: Type.EMPTY_BASKET }), setProcessing(false));

      alert("Payment Successful");

      navigate("/orders");
    } catch (error) {
      console.log(error);

      setProcessing(false);

      setCardError(error.message);
    }
  };

  return (
    <Layout>
      {/* HEADER */}
      <div className={classes.payment_header}>Checkout ({totalitem}) items</div>

      <section className={classes.payment}>
        {/* ADDRESS */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>

          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Ethiopia</div>
          </div>
        </div>

        <hr />

        {/* PRODUCTS */}
        <div className={classes.flex}>
          <h3>Review Items</h3>

          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        {/* PAYMENT */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>

          <div className={classes.payment_card_container}>
            <form onSubmit={handlePayment}>
              {cardError && <small style={{ color: "red" }}>{cardError}</small>}

              <CardElement onChange={handleChange} />

              <div className={classes.payment_price}>
                <div>
                  <span
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <p>Total Order :</p>

                    <CurrencyFormat amount={total} />
                  </span>
                </div>

                <button type="submit" disabled={processing}>
                  {processing ? (
                    <div className={classes.loading}>
                      <ClipLoader color="gray" size={15} />

                      <p>Please wait...</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
