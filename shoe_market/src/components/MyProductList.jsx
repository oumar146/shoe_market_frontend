import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "../styles/myProductList.css";

const EditForm = ({ product }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

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
        // Mettre à jour les catégories
        setCategories(response.data.categories);
      } catch (error) {
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
      // Mettre à jour les informations sur le produit
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
        // Répurer les offres d'un utilisateur
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
            <Card.Title>
              <span>{product.name}</span>
            </Card.Title>
            <Card.Text>
              Date de création: {formatDate(product.creation_date)} <br />
            </Card.Text>
            {/* // button pour modifier un produit  */}
            <EditForm product={product} />
            {/* // button pour voir les détails d'un produit  */}
            <Details product={product} />
            {/* // button pour supprimer un produit  */}
            <Button
              className="form-btn"
              variant="danger"
              onClick={() => {
                deleteProduct(product.id);
              }}
            >
              Supprimer
            </Button>
          </Card.Body>
        </Card>
      ))}
      {/* S'il n'y a pas de produit afficher un message */}
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
