import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ element: Component, user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenCheck = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:4100/user/token-check",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Stocker les informations sur l'utilisateur
        setUser(response.data.user);
        // Si le token expire dans moins de 5 minutes, stocker un nouveau token
        if (response.data.newToken) {
          localStorage.setItem("token", response.data.newToken);
        }
      } catch (error) {
        console.error("Error fetching protected resource:", error);
        navigate("/login");
      }
    };

    tokenCheck();
  }, [navigate, setUser]);

  return <Component user={user} />;
};

export default ProtectedRoute;
