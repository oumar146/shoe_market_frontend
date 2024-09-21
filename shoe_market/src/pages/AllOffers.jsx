import React, { useState } from "react";
import Header from "../components/Header";
import AllProductList from "../components/AllProductList";
import SearchBar from "../components/SearchBar";

const AllOffers = ({ user }) => {
  const [input, setInput] = useState("");

  return (
    <div>
      <Header user={user} />
      <SearchBar input={input} setInput={setInput} />
      <AllProductList user={user} input={input} />
    </div>
  );
};

export default AllOffers;
