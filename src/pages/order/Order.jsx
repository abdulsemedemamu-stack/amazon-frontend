import React, { useContext, useEffect, useState } from "react";
import { db } from "../../utility/firebase";

import classes from "./Order.module.css";

import Layout from "../../components/layout/Layout";
import { DataContex } from "../../components/dataprovider/DataProvider";
import ProductCard from "../../components/product/ProductCard";

function Order() {
  const [{ user }] = useContext(DataContex);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
          );
        });
    } else {
      setOrders([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>

          {orders?.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((eachOrder) => (
              <div key={eachOrder.id}>
                <br />

                <p>
                  <strong>Order ID:</strong> {eachOrder.id}
                </p>

                {eachOrder?.data?.basket?.map((item) => (
                  <ProductCard key={item.id} product={item} flex={true} />
                ))}

                <hr />
              </div>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Order;
