import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import des pages
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

// Définir les routes publiques
const publicRoutes = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        {publicRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
