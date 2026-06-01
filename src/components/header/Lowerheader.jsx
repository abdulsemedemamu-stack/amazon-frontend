import React from "react";
import { IoIosMenu } from "react-icons/io";
import classes from "./Header.module.css";

function Lowerheader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <IoIosMenu /> All
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default Lowerheader;
