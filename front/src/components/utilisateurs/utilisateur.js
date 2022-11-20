import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Header from "../../Header";
import ModalAjout from "./ModalAjout";
import ModalEdition from "./ModalEdit";

const IP = `192.168.8.102`;
const PORT = `:5010`;
const URL = `http://` + IP + PORT + `/api/utilisateur/`;

export default function Utilisateur() {
  const [show, setShow] = useState(false);
  const showAddModal = () => setShow(true);
  const closeAddModal = () => {
    getUsers();
    setShow(false);
  };

  const [numCompteEdit, setNumCompteEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const showEditModal = (numCompte) => {
    setNumCompteEdit(numCompte);
    setShowEdit(true);
  };

  const closeEditModal = () => {
    getUsers();
    setShowEdit(false);
  };

  const [inputs, setInputs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get(URL).then(function (response) {
      setUsers(response.data);
    });
  }

  const deleteUser = (id) => {
    axios.delete(URL + `${id}`).then(function (response) {
      getUsers();
      toast.success(`Suppr Reussi`);
    });
  };

  {
    /* FONCTIONS DES RECHERCHES ----- MA RECHERCHE ----- */
  }
  const [contenuTab, setContenuTab] = useState(true);
  function rechercheUtilisateur(event) {
    const valeur = event.target.value;
    if (!valeur) {
      getUsers();
      setContenuTab(true);
    } else {
      axios.get(URL + `recherche/${valeur}`).then((response) => {
        if (response.data.success) {
          setUsers(response.data.res);
          setContenuTab(true);
        } else {
          setUsers(response.data.res);
          setContenuTab(false);
        }
      });
    }
  }

  return (
    <>
      <div>
        <Header />
        <ModalAjout show={show} onHide={closeAddModal}>
          Adding
        </ModalAjout>
        <ModalEdition showEdit={showEdit} onHide={closeEditModal}>
          {numCompteEdit}
        </ModalEdition>

        <h2>
          List Utilisateurs
          <span> </span>
          <Button
            className="btn btn-sm btn-primary"
            variant="primary"
            onClick={showAddModal}
          >
            Ajout Utilisateur
          </Button>
          <span> </span>
          <label>
            <input
              type="text"
              name="cin"
              className="form-control form-control-sm"
              onChange={rechercheUtilisateur}
              placeholder="rechercher un utilisateur ...."
            />
          </label>
        </h2>
        {/*  ----- TABLEAU LISTE UTILISATEURS ----- */}

        <div className="table-responsive text-nowrap">
          <table className="table table-striped w-auto">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Identification</th>
                <th scope="col">Role</th>
                <th scope="col">etat Compte</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contenuTab ? (
                users.map((user, key) => (
                  <tr key={key}>
                    <th scope="row">{user.numCompte} </th>
                    <td>{user.identification}</td>
                    <td>{user.attribut}</td>
                    <td>{user.etatCompte}</td>
                    <td className="mr-4">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm m-0 waves-effect"
                        variant="primary"
                        name="numCompteEdit"
                        onClick={() => showEditModal(user.numCompte)}
                      >
                        <i
                          className="fas fa-edit mr-2 grey-text"
                          aria-hidden="true"
                        ></i>
                        EDIT
                      </button>
                      <span> </span>
                      <Button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteUser(user.numCompte)}
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td> La liste est vide .... </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
