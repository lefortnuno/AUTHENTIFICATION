import axios from "../../api/axios";

import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { BsFillTrashFill, BsPencilSquare, BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Header from "../../Header";
import ModalAjout from "./ModalAjout";
import ModalEdition from "./ModalEdit";
import DeleteConfirmation from "./ModalSuppr";

const URL = `/`;

export default function Utilisateur() {
  const navigate = useNavigate();
  const u_info = {
    u_token: localStorage.token,
    u_attribut: localStorage.u_attribut,
    u_photoPDP: localStorage.u_photoPDP,
    u_numCompte: localStorage.u_numCompte,
    u_etatCompte: localStorage.u_etatCompte,
  };

  // MODAL AJOUT UTILISATEUR
  const [show, setShow] = useState(false);
  const showAddModal = () => setShow(true);
  const closeAddModal = () => {
    getUsers();
    setShow(false);
  };

  // MODAL EDIT UTILISATEUR
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

  // PAGINATION ET DONNEE UTILISATEUR
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    axios.get(URL, opts).then(function (response) {
      setUsers(response.data);
    });
  }
  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  // MODAL DELETE UTILISATEUR
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(
      `Etes vous sure de vouloir supprimer '${
        users.find((x) => x.numCompte === id).identification
      }'?`
    );
    setDisplayConfirmationModal(true);
  };
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  const submitDelete = (id) => {
    axios.delete(URL + `${id}`).then(function (response) {
      getUsers();
      toast.success(`Suppr Reussi`);
      setDisplayConfirmationModal(false);

      if (id == u_info.u_numCompte) {
        localStorage.clear();
        navigate("/");
      }
    });
  };

  // ----- MA RECHERCHE -----
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
        <Header>
          {u_info.u_numCompte} : {u_info.u_photoPDP}
        </Header>
        <ModalAjout show={show} onHide={closeAddModal}>
          Ajout Nouveau Utilisateur
        </ModalAjout>
        <ModalEdition showEdit={showEdit} onHide={closeEditModal}>
          {numCompteEdit}
        </ModalEdition>
        <DeleteConfirmation
          showModal={displayConfirmationModal}
          confirmModal={submitDelete}
          hideModal={hideConfirmationModal}
          id={id}
          message={deleteMessage}
        />

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
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm m-1 waves-effect"
                        variant="default"
                        name="numCompteEdit"
                        onClick={() => showEditModal(user.numCompte)}
                      >
                        <BsEye />
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm m-1 waves-effect"
                        variant="default"
                        name="numCompteEdit"
                        onClick={() => showEditModal(user.numCompte)}
                      >
                        <BsPencilSquare />
                      </button>

                      <Button
                        type="button"
                        className="btn btn-outline-danger btn-sm m-1 waves-effect"
                        variant="default"
                        onClick={() => showDeleteModal(user.numCompte)}
                      >
                        <BsFillTrashFill />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td> La liste est vide .... </td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
