import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "../styles/myProductList.css";
import { useNavigate } from "react-router-dom";

const EditForm = ({ product }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]); // Stocker toutes les catégories
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  useEffect(() => {
    // Charger les données du produit dans le formulaire lorsque le produit change
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setSize(product.size || "");
      setPrice(product.price || "");
      setCategoryName(product.category_name || "");
      setImage(product.image_url || "");
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4100/category/get");
        setCategories(response.data.categories); // Mettre à jour l'état avec les catégories
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Notre serveur est en panne. Veuillez réessayer plus tard.");
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !size || !price || !categoryName || !image) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    const formData = {
      name: name,
      description: description,
      size: size,
      price: price,
      category_name: categoryName,
      product_id: product.id,
    };
    if (image) formData.image = image;

    try {
      const token = localStorage.getItem("token");
      console.log(formData);
      await axios.put("http://localhost:4100/product/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setError(null);
      setName("");
      setDescription("");
      setSize("");
      setPrice("");
      setCategoryName("");
      setImage(null);
      handleClose();
      refreshPage();
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Notre serveur est en panne. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <div>
      <>
        <Button variant="primary" className="form-btn" onClick={handleShow}>
          Modifier
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h1>Modifier l'offre</h1>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Nom du produit:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>{"Taille (EU):"}</label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Prix:</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Categorie:</label>
                <select
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Remplacer l'image : </label>
                <input type="file" onChange={handleFileChange} />
              </div>
              <Button variant="success" type="submit" onClick={handleSubmit}>
                Modifier
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

const Details = ({ product }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <>
        <Button variant="secondary" className="form-btn" onClick={handleShow}>
          Détails
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h1>Détails de l'offre</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div>
                <label>Nom du produit:</label>
                <input type="text" value={product.name} disabled />
              </div>
              <div>
                <label>Description:</label>
                <textarea value={product.description} disabled />
              </div>
              <div>
                <label>{"Taille (EU):"}</label>
                <input type="text" value={product.size} disabled />
              </div>
              <div>
                <label>Prix:</label>
                <input type="number" step="5" value={product.price} disabled />
              </div>
              <div>
                <label>Categorie:</label>
                <input type="text" value={product.category_name} disabled />
              </div>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

const MyProductList = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:4100/product/delete", {
        data: { product_id: productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Mettre à jour l'état pour retirer le produit supprimé
      setProducts(products.filter((product) => product.id !== productId));
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Notre serveur est en panne. Veuillez réessayer plus tard."
      );
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:4100/product/my-offers",
          {
            user_id: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.products);
        setRequestSent(true);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Notre serveur est en panne. Veuillez réessayer plus tard.");
      }
    };

    fetchProducts();
  }, [user.id]);

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
            <Button
              className="form-btn"
              variant="danger"
              onClick={() => {
                deleteProduct(product.id);
              }}
            >
              Supprimer
            </Button>
            <EditForm product={product} />
            <Details product={product} />
          </Card.Body>
        </Card>
      ))}
      {requestSent && !(products.length > 0) && (
        <h4 className="no-product-message">
          Vous n'avez pas encore créé de produit. Commencez maintenant en
          ajoutant votre premier produit !
        </h4>
      )}
    </div>
  );
};

export default MyProductList;
