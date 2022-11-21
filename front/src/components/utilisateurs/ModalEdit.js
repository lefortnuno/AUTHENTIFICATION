import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const URL = `/`;
let i = 0;

export default function ModalEdition(props) {
  const [inputs, setInputs] = useState([]);
  const id = props.children;

  while (props.showEdit && i == 0) {
    if (i != 0) {
      break;
    }
    getOneUser(id);
    i = 1;
  }

  useEffect(() => {
    getOneUser(1); // MCREER-VA UTILISATEUR 001 DIA AZA FAFANA MITSN INY UTILISATEUR INY !
  }, []);

  function getOneUser(id) {
    axios.get(URL + `${id}`).then(function (response) {
      setInputs(response.data[0]);
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmitEdit = (event, id) => {
    event.preventDefault();
    axios.put(URL + `${id}`, inputs).then(function (response) {
      props.onHide();
      toast.success("Modification Reussi !")
    });
  };

  function onClose() {
    props.onHide();
    i = 0;
  }
  return (
    <>
      <Modal
        size="sm"
        show={props.showEdit}
        onHide={props.closeEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Edition Utilisateur Numero : {id}</Modal.Title>
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
          <Button variant="danger" onClick={onClose}>
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
