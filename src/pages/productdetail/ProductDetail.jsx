import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import ProductCard from "../../components/product/ProductCard";

const productUrl = "https://fakestoreapi.com"; // make sure this exists

function ProductDetail() {
  const { productId } = useParams();

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // prevent memory leak

    setIsLoading(true);

    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        if (isMounted) {
          setProduct(res.data);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) {
          setError("Failed to load product");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p style={{ padding: "30px" }}>{error}</p>
      ) : (
        <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>
          {product?.id && (
            <ProductCard
              product={product}
              flex={true}
              renderDesc={true}
            />
          )}
        </div>
      )}
    </Layout>
  );
}

export default ProductDetail;
