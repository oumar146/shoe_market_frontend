import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/allProductList.css";

const AllProductList = ({ user, input }) => {
  const [products, setProducts] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4100/product/offers"
        );
        // Stocker toutes les offres
        setProducts(response.data.products);
        setRequestSent(true);
      } catch (error) {
        setError("Notre serveur est en panne. Veuillez réessayer plus tard.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {products.map((product) =>
        product.name.toLowerCase().includes(input.toLowerCase()) ||
        product.description.toLowerCase().includes(input.toLowerCase()) ? (
          <Card
            key={product.id}
            style={{ width: "18rem", margin: "1rem", cursor: "pointer" }}
            onClick={() => navigate(`/offer/${product.reference}`)}
          >
            <Card.Img variant="top" src={product.image_url} />
            <Card.Body className="product-info">
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                <span className="category">{product.category_name}</span> <br />
                <span className="price">{product.price}€</span>
                <br />
              </Card.Text>
              <Button
                className="form-btn"
                variant="secondary"
                // onClick={() => {
                //   deleteProduct(product.id);
                // }}
              >
                Ajouter au panier
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <h4 key={product.id} className="no-product-message">
            Aucune offre trouvé
          </h4>
        )
      )}
      {requestSent && !(products.length > 0) && (
        <h4 className="no-product-message">Aucune offre trouvé</h4>
      )}
    </div>
  );
};

export default AllProductList;
