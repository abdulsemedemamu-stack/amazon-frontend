import React from "react";
import classes from "./Catagory.module.css";
import { Link } from "react-router-dom"; // ✅ FIX

function CatagoryCard({ data }) {
  return (
    <div className={classes.catagory}>
      <Link to={`/category/${data.name}`}>
        {" "}
        {/* ✅ FIX */}
        <h2>{data.title}</h2>
        <img src={data.imgLink} alt={data.title} />
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;
