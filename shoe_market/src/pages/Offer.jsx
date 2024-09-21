import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const Offer = ({ user }) => {
  // Récupération des paramètres de l'URL
  const { reference } = useParams();

  const [product, setProduct] = useState(null); // Changer [] à null pour éviter un affichage vide avant le chargement
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4100/product/${reference}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Notre serveur est en panne. Veuillez réessayer plus tard.");
      }
    };

    fetchProduct();
  }, [reference]);

  if (error) {
    return <p>{error}</p>; // Gestion des erreurs
  }

  if (!product) {
    return <p>Chargement en cours...</p>; // Affichage pendant le chargement
  }

  return (
    <div>
      <Header user={user} />
      <div className="product-details">
        <div className="image-container">
          <img src={product.image_url} alt={product.name} />{" "}
          <p>
            <strong>Date de publication :</strong>{" "}
            {new Date(product.creation_date).toLocaleDateString()}
          </p>{" "}
        </div>
        <div className="details">
          <h2>{product.name}</h2> {/* Nom du produit */}
          {product.category_name}
          {/* Image du produit */}
          <p>{product.price}€</p> {/* Prix */}
          <p>
            <strong>Taille :</strong> {product.size}
          </p>{" "}
          <p>
            <strong>Description :</strong> {product.description}
          </p>{" "}
          {/* Description */}
          {/* Taille */}
          {/* Catégorie */}
          {/* Date */}
          <h3>Contact</h3>
          {/* Nom du vendeur */}
          <p>
            <strong>Email :</strong>
            <a href={`mailto:${product.creator_email}`}>
              {product.creator_email}
            </a>
          </p>{" "}
          {/* Lien mailto vers l'email */}
        </div>
      </div>
    </div>
  );
};

export default Offer;
