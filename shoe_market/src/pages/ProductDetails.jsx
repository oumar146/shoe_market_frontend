import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/productDetails.css"; // Assurez-vous de créer ce fichier pour le style

const ProductDetails = () => {
  const { reference } = useParams(); // Récupérer l'ID du produit à partir de l'URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4100/product/${reference}`
        );
        console.log("Product Data:", response.data); // Ajout de log
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error); // Ajout de log
        setError("Error fetching product details");
      }
    };

    fetchProductDetails();
  }, [reference]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <img
        src={product.image_url}
        alt={product.name}
        className="product-image"
      />
      <h1>{product.name}</h1>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Size:</strong> {product.size}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Creation Date:</strong>{" "}
        {new Date(product.creation_date).toLocaleString()}
      </p>
    </div>
  );
};

export default ProductDetails;
