import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import "../styles/offer.css";
import Footer from "../components/Footer";

const Offer = ({ user }) => {
  const { reference } = useParams();
<<<<<<< HEAD
  const [product, setProduct] = useState(null);
=======

  const [product, setProduct] = useState([]);
>>>>>>> c69032c (amélioration du responsive)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4100/product/${reference}`
        );
        setProduct(response.data);
      } catch (error) {
        setError("Notre serveur est en panne. Veuillez réessayer plus tard.");
      }
    };

    fetchProduct();
  }, [reference]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div className="product-container">
      <Header user={user} />
      <div className="product-details">
        <div className="image-container">
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className="details">
          <h2>Details du produit</h2>
          <h3>{product.name}</h3>
          <p className="price">{product.price}€</p>
          <p>
            <strong>Taille :</strong> {product.size}
          </p>
          <p>
            <strong>Description :</strong> {product.description}
          </p>
          <p>
            <strong>Date de publication :</strong>{" "}
            {new Date(product.creation_date).toLocaleDateString()}
          </p>
          <h2>Contact</h2>
          <p>
            <strong>Email :</strong>{" "}
            <a href={`mailto:${product.creator_email}`}>
              {product.creator_email}
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Offer;
