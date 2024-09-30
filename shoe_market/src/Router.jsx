import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext";

// Import des pages
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import MyOffers from "./pages/MyOffers";
import AllOffers from "./pages/AllOffers";
import Offer from "./pages/Offer";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

// Définir les routes
const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/home", element: <Home /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/contact", element: <Contact /> },
  { path: "/my-offers", element: <MyOffers /> },
  { path: "/all-offers", element: <AllOffers /> },
  { path: "/offer/:reference", element: <Offer /> },
];

const Router = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes*/}
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default Router;
