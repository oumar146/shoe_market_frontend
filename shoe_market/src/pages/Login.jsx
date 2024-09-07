import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login/form.css";

const login = async (email, password, setError) => {
  try {
    // requête vers l'API pour se connecter
    const response = await axios.post("http://localhost:4100/user/login", {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.setItem("token", token);
    setError("");
    return token;
  } catch (error) {
    console.error("Erreur de connexion :", error);
    // Gérer les messages d'erreur spécifiques
    if (error.response && error.response.data.error) {
      setError(error.response.data.error);
    } else {
      setError("Une erreur est survenue lors de la connexion");
    }
    throw error;
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Vérifier si les champs sont remplis
      if (!email || !password) {
        setError("Tous les champs doivent être remplis.");
        return;
      }
      // Connexion au site
      await login(email, password, setError);
      navigate(`/admin/dashboard`);
    } catch (error) {
      // Erreur déjà gérer dans la function login
    }
  };

  return (
    <main className="login-container">
      <div className="login-box">
        <h2>Connexion à votre compte</h2>
        <p>Entrez votre email et votre mot de passe pour vous connecter</p>
        {error && <p className="error-msg">{error}</p>}
        {/* Début champs du formulaire */}
        <div className="input-group">
          <label htmlFor="yourEmail">Email</label>
          <input
            type="email"
            id="yourEmail"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="yourPassword">Mot de passe</label>
          <input
            type="password"
            id="yourPassword"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Début champs du formulaire */}
        <button className="submit-btn" onClick={handleLogin}>
          Connexion
        </button>

        <p>
          Vous n'avez pas de compte ? <a href="/signup">Inscrivez-vous ici</a>
        </p>
      </div>
    </main>
  );
};

export default Login;
