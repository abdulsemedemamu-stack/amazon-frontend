import React from "react";
import { CatagoryInfo } from "./CatagoryfullInfo";
import CatagoryCard from "./CatagoryCard";
import classes from "./Catagory.module.css";
function Catagory() {
  return (
    <section className={classes.catagory_container}>
      {CatagoryInfo.map((infos, index) => (
        <CatagoryCard key={index} data={infos} />
      ))}
    </section>
  );
}

export default Catagory;
