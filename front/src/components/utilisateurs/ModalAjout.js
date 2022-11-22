import axios from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const URL_UTILISATEUR = `/`;

export default function ModalAjout(props) {
  // IMAGE PHOTO DE PROFILE DES UTILISATEUR
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const submitPhotoProfile = async () => {
    const formdata = new FormData();
    formdata.append("avatar", userInfo.file);

    axios
      .post(URL_UTILISATEUR + "photoProfile", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.warn(res);
        if (res.data.success) {
          toast.success("Image upload successfully");
        }
      });
  };

  // INFO DU COMPTE UTILISATEUR
  const onSubmit = (data) => {
    axios.post(URL_UTILISATEUR, data).then(function (response) {
      if (response.data.success) {
        toast.success(response.data.message);
        // reset();
        // props.onHide();
        submitPhotoProfile();
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
    mdp: Yup.string()
      .required("Mot de passe obligatoire")
      .min(4, "trop court! entrez au moins 4 caracteres"),
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
        <Modal.Header>
          <Modal.Title>{props.children}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <div className="text-center">
              {userInfo.filepreview !== null ? (
                <img
                  className="img-thumbnail rounded  mx-auto d-block"
                  src={userInfo.filepreview}
                  alt="photo de prohile"
                />
              ) : null}
            </div>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput0">
              <Form.Label>Photo de profile</Form.Label>
              <Form.Control
                type="file"
                className="form-control"
                name="upload_file"
                onChange={handleInputChange}
                placeholder="photo de profile"
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
