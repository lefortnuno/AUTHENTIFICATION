import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Utilisateur() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const [showEdit, setShowEdit] = useState(false);

  const [inputs, setInputs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault()
    axios
      .post("http://localhost:5010/api/utilisateur/", inputs)
      .then(function (response) {
        if (response.data.success) {
          handleClose();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        getUsers();
      });
  };

  const handleSubmitEdit = (event, id) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5010/api/utilisateur/${id}`, inputs)
      .then(function (response) {
        getUsers();
        handleCloseEdit();
      });
  };

  function getUsers() {
    axios
      .get("http://localhost:5010/api/utilisateur/")
      .then(function (response) {
        setUsers(response.data);
      });
  }

  function getOneUsers(id) {
    axios
      .get(`http://localhost:5010/api/utilisateur/${id}`)
      .then(function (response) {
        handleShowEdit();
        setInputs(response.data[0]);
      });
  }

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5010/api/utilisateur/${id}`)
      .then(function (response) {
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
      axios
        .get(`http://localhost:5010/api/utilisateur/recherche/${valeur}`)
        .then((response) => {
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
        <h2>
          List Utilisateurs
          <span> </span>
          <Button
            className="btn btn-sm btn-primary"
            variant="primary"
            onClick={handleShow}
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
                        onClick={() => getOneUsers(user.numCompte)}
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

      {/*  ----- MODAL AJOUT ----- */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Identification</Form.Label>
              <Form.Control
                type="text"
                name="identification"
                onChange={handleChange}
                placeholder="identification"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Mot de pass</Form.Label>
              <Form.Control
                type="password"
                name="mdp"
                onChange={handleChange}
                placeholder="mot de pass"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>confirmez votre mot de pass</Form.Label>
              <Form.Control
                type="password"
                name="confirmMdp"
                onChange={handleChange}
                placeholder="confirmez votre mot de pass"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/*  ----- MODAL MODIFICATION / EDITER ----- */}
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>identification</Form.Label>
              <Form.Control
                type="text"
                name="identification"
                value={inputs.identification}
                onChange={handleChange}
                placeholder="identificaton"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>etatCompte</Form.Label>
              <Form.Control
                type="text"
                name="etatCompte"
                value={inputs.etatCompte}
                onChange={handleChange}
                placeholder="attribut"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Mdp</Form.Label>
              <Form.Control
                type="password"
                name="mdp"
                value={inputs.mdp}
                onChange={handleChange}
                placeholder="mot de pass"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>

          <Button
            variant="primary"
            onClick={(e) => handleSubmitEdit(e, inputs.numCompte)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
