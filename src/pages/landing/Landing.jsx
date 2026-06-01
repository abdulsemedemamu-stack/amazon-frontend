import Layout from "../../components/layout/Layout";

import CarouselEffect from "../../components/carousel/CarouselEffect";
import Catagory from "../../components/Catagory/Catagory";
import Product from "../../components/product/Product";

function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <Catagory />
      <Product />
    </Layout>
  );
}

export default Landing;
