import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/utilisateurs/login";
import Utilisateur from "./components/utilisateurs/utilisateur";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./Protected"
import Deconnection from "./deconnection"

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <BrowserRouter>
        <Routes>
          <Route index element={ <Deconnection Cmp={Login} />} />
          <Route path="utilisateur/" element={ <Protected Cmp={Utilisateur} /> } />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
