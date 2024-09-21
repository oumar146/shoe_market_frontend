import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

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
  return (
    <div className="categories">
      <h2>Chercher par Catégorie</h2>
      <div className="category-list">
        {categories &&
          categories.map((category) => (
            <div key={category.name} className="category-item">
              {category.name}
            </div>
          ))}

        {/* Ajoutez d'autres catégories si nécessaire */}
      </div>
    </div>
  );
};

export default Categories;
