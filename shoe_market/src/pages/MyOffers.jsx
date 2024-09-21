import React from "react";
import Header from "../components/Header";
import ProductForm from "../components/ProductForm";
import MyProductList from "../components/MyProductList";

const MyOffers = ({ user }) => {
  return (
    <div>
      <Header user={user} />
      <ProductForm user={user} />
      <MyProductList user={user} />
    </div>
  );
};

export default MyOffers;
