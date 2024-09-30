import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../styles/productForm.css";

const ProductForm = ({ user }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [typeConfirmed, setTypeConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageType = ["image/jpg", "image/jpeg", "image/png"];

  const navigate = useNavigate();

  // Fonction de réinitialisation des champs
  const resetFormFields = () => {
    setError(null);
    setName("");
    setDescription("");
    setSize("");
    setPrice("");
    setCategoryName("");
    setImage(null);
  };

  const handleClose = () => {
    resetFormFields(); // Réinitialiser les champs
    setShow(false); // Fermer le modal
  };

  const handleShow = async () => {
    setShow(true);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4100/category/get");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Notre serveur est en panne. Veuillez réessayer plus tard.");
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    const types = imageType.filter(
      (imageType) => imageType === e.target.files[0].type
    );
    if (!types.length > 0) {
      setTypeConfirmed(false);
      return;
    }
    setTypeConfirmed(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !size || !price || !categoryName || !image) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    if (image && !typeConfirmed) {
      setError("Vérifier l'extension du fichier de l'image");
      return;
    }

    setIsSubmitting(true);
    const creationDate = new Date().toISOString();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("creation_date", creationDate);
    formData.append("size", size);
    formData.append("price", price);
    formData.append("category_name", categoryName);
    formData.append("email", user.email);
    formData.append("creator_id", user.id);

    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4100/product/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      resetFormFields(); // Réinitialiser les champs après soumission réussie
      handleClose(); // Fermer le modal
      navigate(0); // Rafraîchir la page
    } catch (error) {
      setError(error.response?.data?.error || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-add-btn">
      <Button className="btn" onClick={handleShow}>
        Nouveau produit
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle offre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="error">{error}</p>}

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
              <label>Taille (EU):</label>
              <input
                type="number"
                step="5"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Prix:</label>
              <input
                type="number"
                step="10"
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
              <label>Image:</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
            <Button variant="success" type="submit" disabled={isSubmitting}>
              Ajouter
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductForm;
