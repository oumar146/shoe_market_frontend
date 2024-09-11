import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import "../styles/myProductList.css";

const AllProductList = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(null);

  const getProducts = async (productId) => {
    try {
      await axios.delete("http://localhost:4100/product/offers");
      // Mettre à jour l'état pour retirer le produit supprimé
      setProducts(products.filter((product) => product.id !== productId));
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4100/product/offers"
        );
        setProducts(response.data.products);
        if (!(response.data.products.length > 0)) setMessage(true);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Notre serveur est en panne. Veuillez réessayer plus tard.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {products.map((product) => (
        <Card key={product.id} style={{ width: "18rem", margin: "1rem" }}>
          <Card.Img variant="top" src={product.image_url} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              Taille: {product.size} <br />
              {product.price}€
            </Card.Text>
            {/* <Button
                className="form-btn"
                variant="danger"
                // onClick={() => {
                //   get(product.id);
                // }}
              >
                Supprimer
              </Button> */}
          </Card.Body>
        </Card>
      ))}
      {message && (
        <h4 className="no-product-message">
          Vous n'avez pas encore créé de produit. Commencez maintenant en
          ajoutant votre premier produit !
        </h4>
      )}
    </div>
  );
};

export default AllProductList;
