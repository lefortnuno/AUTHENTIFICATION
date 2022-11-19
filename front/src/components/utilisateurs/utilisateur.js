import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Header from "../../Header";
import ModalAjoutUtilisateur from "./ModalAjout";

const IP = `192.168.8.102`;
const PORT = `:5010`;
const URL = `http://` + IP + PORT + `/api/utilisateur/`;

export default function Utilisateur() {
  const closeAddModal = () => setShow(false);
  const handleClose = () => setShow(false);
  const showAddModal = () => setShow(true);
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

  const handleChangePDP = (event) => {
    const name = event.target.name;
    const value = event.target.files[0];
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (data) => {
    console.log(inputs.photoPDP);
    // axios.post(URL, data).then(function (response) {
    //   if (response.data.success) {
    //     handleClose();
    //     toast.success(response.data.message);
    //   } else {
    //     toast.error(response.data.message);
    //   }
    //   getUsers();
    // });
  };

  {
    /* SCHEMA VALIDATION FORMULAIRE ----- MA FORM LOGIN / SE CONNECTER ----- */
  }
  const validationSchema = Yup.object().shape({
    identification: Yup.string()
      .min(2, "trop court")
      .required("identification obligatoire"),
    mdp: Yup.string().min(4, "trop court").required("Mot de passe obligatoire"),
    confirmMdp: Yup.string()
      .required("Mot de passe de confirmation obligatoire")
      .oneOf(
        [Yup.ref("mdp"), null],
        "Le mot de passe de confirmation ne correspond pas!"
      ),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      identification: "",
      mdp: "",
      confirmMdp: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

  const handleSubmitEdit = (event, id) => {
    event.preventDefault();
    axios.put(URL + `${id}`, inputs).then(function (response) {
      getUsers();
      handleCloseEdit();
    });
  };

  function getUsers() {
    axios.get(URL).then(function (response) {
      setUsers(response.data);
    });
  }

  function getOneUsers(id) {
    axios.get(URL + `${id}`).then(function (response) {
      handleShowEdit();
      setInputs(response.data[0]);
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

        <Button onClick={showAddModal}> CLIC </Button>
        {show ? (
          <ModalAjoutUtilisateur
            show={show}
            onHide={closeAddModal}
          />
        ) : null}

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
      {/* <Modal
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput0">
              <Form.Label>Photo de profile</Form.Label>
              <Form.Control
                type="file"
                name="photoPDP"
                onChange={handleChangePDP}
                placeholder="photoPDP"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Identification</Form.Label>
              <Form.Control
                type="text"
                name="identification"
                {...register("identification")}
                placeholder="identification"
                autoFocus
              />
              <small className="text-danger d-block">
                {errors.identification?.message}
              </small>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Mot de pass</Form.Label>
              <Form.Control
                type="password"
                name="mdp"
                {...register("mdp")}
                placeholder="mot de pass"
              />
              <small className="text-danger d-block">
                {errors.mdp?.message}
              </small>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>confirmez votre mot de pass</Form.Label>
              <Form.Control
                type="password"
                name="confirmMdp"
                {...register("confirmMdp")}
                placeholder="confirmez votre mot de pass"
              />
              <small className="text-danger d-block">
                {errors.confirmMdp?.message}
              </small>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

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
          <Button variant="danger" onClick={handleCloseEdit}>
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
