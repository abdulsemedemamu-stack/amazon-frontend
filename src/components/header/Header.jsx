// src/components/header/Header.jsx

import React, { useContext } from "react";
import classes from "./Header.module.css";

import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";

import Lowerheader from "./Lowerheader";
import { Link } from "react-router-dom";

import { DataContex } from "../dataprovider/DataProvider";

import { auth } from "../../utility/firebase";
import { signOut } from "firebase/auth";

function Header() {
  const [{ basket, user }] = useContext(DataContex);

  const totalitem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  // SIGN OUT FUNCTION
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={classes.fixed}>
      <div className={classes.header_container}>
        {/* LOGO */}

        <div className={classes.logo_container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="logo"
            />
          </Link>

          <div className={classes.delivery_container}>
            <SlLocationPin />

            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* SEARCH */}

        <div className={classes.search}>
          <select>
            <option>All</option>
          </select>

          <input type="text" placeholder="Search products" />

          <button>
            <BsSearch size={20} />
          </button>
        </div>

        {/* RIGHT SIDE */}

        <div className={classes.order_container}>
          <div className={classes.language}>
            <img src="https://flagcdn.com/w40/us.png" alt="language" />

            <select>
              <option>EN</option>
            </select>
          </div>

          {/* USER */}

          {/* USER */}

          <Link to={!user ? "/auth" : "/"}>
            <div>
              {user ? (
                <>
                  <p>Hello, {user.email.split("@")[0]}</p>

                  <span onClick={handleSignOut}>Sign Out</span>
                </>
              ) : (
                <>
                  <p>Hello, Sign In</p>

                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>

          {/* ORDERS */}

          <Link to="/order">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          {/* CART */}

          <Link to="/cart" className={classes.cart}>
            <BiCart size={30} />
            <span>{totalitem}</span>
          </Link>
        </div>
      </div>

      <Lowerheader />
    </section>
  );
}

export default Header;
