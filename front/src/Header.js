import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav"
import  NavDropdown from "react-bootstrap/Nav"

function Header(props) {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const seDeconnecter = () => {
    // localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-secondary justify-content-center">
      <ul className="navbar-nav">
        {userToken ? (
          <>
          <li className="nav-item">
            <Link to="/utilisateur/" className="nav-link">
              {props.children}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/utilisateur/" className="nav-link">
              Gestion des Utilisateurs
            </Link>
          </li>
            <li className="nav-item" onClick={seDeconnecter}>
              <p className="nav-link"> Deconnection </p>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Connection
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
