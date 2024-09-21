import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Offcanvas,
  Container,
  Nav,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import "../styles/header.css";

const Header = ({ user }) => {
  const navigate = useNavigate();
  // Function pour déconnecter l'utilisateur
  const handleLogout = async (navigate) => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="md">
        <Container fluid className="header">
          <Navbar.Brand
            onClick={() => {
              navigate("/home");
            }}
            style={{ cursor: "pointer" }}
          >
            Shoe<span>Market</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <Nav.Link onClick={() => navigate("/about")}>À propos</Nav.Link>
                <Nav.Link onClick={() => navigate("/contact")}>
                  Contact
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/my-offers")}>
                  Mes offres
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/all-offers")}>
                  Toutes les offres
                </Nav.Link>

                {user && (
                  <NavDropdown
                    title="Mon compte"
                    id={`offcanvasNavbarDropdown-expand-md`}
                  >
                    <NavDropdown.Item>Profil</NavDropdown.Item>
                    <NavDropdown.Item>Commandes</NavDropdown.Item>
                    <NavDropdown.Item>Paramètres</NavDropdown.Item>
                    <NavDropdown.Item>Notifications</NavDropdown.Item>
                    <NavDropdown.Item>Favoris</NavDropdown.Item>
                    <Dropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        handleLogout(navigate);
                      }}
                    >
                      Se déconnecter
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
