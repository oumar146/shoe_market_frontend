import React from "react";
import Header from "../components/Header";
import AllProductList from "../components/AllProductList";
// import "../styles/allOffers.css";

const AllOffers = ({ user }) => {
  return (
    <div>
      <Header />
      <AllProductList user={user} />
    </div>
  );
};

export default AllOffers;
