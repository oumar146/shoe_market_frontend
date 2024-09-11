import React from "react";
import Header from "../components/Header";
import AllProductList from "../components/AllProductList";
const MyOffers = ({ user }) => {
  return (
    <div>
      <Header />
      <AllProductList user={user} />
    </div>
  );
};

export default MyOffers;
