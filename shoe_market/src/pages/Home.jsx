import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import MoreArticle from "../components/MoreArticle";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Categories />
      <MoreArticle />
      <Footer />
    </div>
  );
};

export default Home;
