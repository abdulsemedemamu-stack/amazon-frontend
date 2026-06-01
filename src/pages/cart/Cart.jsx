import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import { DataContex } from "../../components/dataprovider/DataProvider";
import CurrencyFormat from "../../components/curencyformat/CurrencyFormat";
import { Type } from "../../utility/ActionType";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContex);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h2>Your shopping basket</h2>

          {basket?.length === 0 ? (
            <p>Oops! Your cart is empty</p>
          ) : (
            basket.map((item, i) => (
              <section key={i} className={classes.cart_product}>
                <ProductCard product={item} renderDesc={true} flex={true} />

                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <MdOutlineKeyboardArrowDown />
                  </button>

                  <span>{item.amount}</span>

                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <MdKeyboardArrowUp />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>

            <span>
              <input type="checkbox" />
              <small>This order is a gift</small>
            </span>

            <Link to="/payment">Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
