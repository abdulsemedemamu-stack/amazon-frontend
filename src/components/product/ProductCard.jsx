import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

import CurrencyFormat from "../curencyformat/CurrencyFormat";
import classes from "./Product.module.css";

import { DataContex } from "../dataprovider/DataProvider";
import { Type } from "../../utility/ActionType";

function ProductCard({ product, flex, renderDesc, renderadd = true }) {
  const { image, title, id, rating, price, description } = product;

  const [{ basket }, dispatch] = useContext(DataContex);

  const addtocart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <section
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      {/* IMAGE */}
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>

      {/* PRODUCT INFO */}
      <div>
        <h3>{title}</h3>

        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
      </div>

      {/* RATING */}
      <div className={classes.rating}>
        <Rating value={rating?.rate || 0} precision={0.1} />

        <small>{rating?.count}</small>
      </div>

      {/* PRICE */}
      <div>
        <CurrencyFormat amount={price} />
      </div>

      {/* BUTTON */}
      {renderadd && (
        <button className={classes.button} onClick={addtocart}>
          Add to Cart
        </button>
      )}
    </section>
  );
}

export default ProductCard;
