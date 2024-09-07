import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Import des pages
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

// Import du composant ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";

// Définir les routes publiques
const publicRoutes = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

// Définir les routes protégées
const protectedRoutes = [{ path: "/home", element: HomePage }];

const Router = () => {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        {publicRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}

        {/* Routes protégées */}
        {protectedRoutes.map(({ path, element: Element }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <ProtectedRoute element={Element} user={user} setUser={setUser} />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
