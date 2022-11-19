import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// import PropTypes from "prop-types";

const IP = `192.168.8.102`;
const PORT = `:5010`;
const URL = `http://` + IP + PORT + `/api/utilisateur/`;

export default function ModalAjoutUtilisateur(props) {
  const [inputs, setInputs] = useState([]);
  const [users, setUsers] = useState([]);

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

  function onClose() {
    props.onHide();
  }

  console.log("etat modal props.... : ", props.show);
  return (
    <>
      <Modal
        size="sm"
        show={props.show}
        onHide={props.closeAddModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// Modal.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     show: PropTypes.bool.isRequired
//   };
