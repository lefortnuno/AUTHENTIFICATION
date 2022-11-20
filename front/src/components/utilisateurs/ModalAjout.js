import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const IP = `192.168.8.102`;
const PORT = `:5010`;
const URL = `http://` + IP + PORT + `/api/utilisateur/`;

export default function ModalAjout(props) {
  const [inputs, setInputs] = useState([]);

  const handleChangePDP = (event) => {
    const name = event.target.name;
    const value = event.target.files[0];
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (data) => {
    // console.log(inputs.photoPDP);
    axios.post(URL, data).then(function (response) {
      if (response.data.success) {
        toast.success(response.data.message);
        reset();
        props.onHide();
      } else {
        toast.error(response.data.message);
      }
    });
  };

  {
    /* SCHEMA VALIDATION FORMULAIRE ----- MA FORM LOGIN / SE CONNECTER ----- */
  }
  const validationSchema = Yup.object().shape({
    identification: Yup.string()
      .required("identification obligatoire")
      .min(2, "trop court!entrez au moins 2 caracteres"),
    mdp: Yup.string().required("Mot de passe obligatoire").min(4, "trop court! entrez au moins 4 caracteres"),
    confirmMdp: Yup.string()
      .required("Mot de passe de confirmation obligatoire")
      .oneOf(
        [Yup.ref("mdp"), null],
        "Le mot de passe de confirmation ne correspond pas au 1er mot de pass!"
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

  function onClose() {
    props.onHide();
  }

  return (
    <>
      <Modal
        size="sm"
        show={props.show}
        onHide={props.closeAddModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>{props.children}</Modal.Title>
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
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
