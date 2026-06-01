import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/product/ProductCard";
import { productUrl } from "../../Api/Endpoint";
import Loader from "../../components/loader/Loader"; // ✅ import
import classes from "./Result.module.css"; // ✅ import

function Result() {
  const { categoryName } = useParams();

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // ✅ FIX

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [categoryName]);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>category / {categoryName}</p>
        <hr />

        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={true}
                renderadd={false}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Result;
