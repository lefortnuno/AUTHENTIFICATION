import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/utilisateurs/login";
import Utilisateur from "./components/utilisateurs/utilisateur";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <BrowserRouter>

        <nav className="navbar navbar-expand-sm navbar-dark bg-secondary justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Deconnection</Link>
            </li>
            <li className="nav-item">
              <Link to="/utilisateur/" className="nav-link">Gestion des Utilisateurs</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<Login />} />
          <Route path="utilisateur/" element={<Utilisateur />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
