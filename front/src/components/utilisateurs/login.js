import axios from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const LOGIN_URL = `/seConnecter`;

export default function Login() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  //ENVOYER DONNER FORMULAIRE AU BACK-END
  const onSubmit = (data) => {
    axios
      .post(LOGIN_URL, data)
      .then(function (response) {
        if (response.data.success) {
          navigate("/utilisateur/"); // a decommenter si hiditr page hafa !
          toast.success(`Connection Reussi`);
          const u = response.data.user[0];
          localStorage.setItem("u_numCompte", u.numCompte);
          localStorage.setItem("u_attribut", u.attribut);
          localStorage.setItem("u_etatCompte", u.etatCompte );
          localStorage.setItem("u_photoPDP", u.photoPDP);
          localStorage.setItem("token", response.data.token);
        } else {
          setErrMsg("Identification ou Mot de pass Incorrect ! ");
        }
      })
      .catch((error) => {
        setErrMsg(
          "Erreur de connection : ",
          error,
          " Veuillez vous connecter au serveur !"
        );
      });
  };

  //SCHEMA VALIDATION FORMULAIRE LOGIN / SE CONNECTER -----
  const validationSchema = Yup.object().shape({
    identification: Yup.string().required("Identification obligatoire"),
    mdp: Yup.string().required("Mot de passe obligatoire"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      identification: "",
      mdp: "",
    },
    resolver: yupResolver(validationSchema),
  });

  function onClose() {
    reset();
  }

  const { errors } = formState;
  return (
    <>
      <div className="container">
        <Header />
        <Form className="text-center border border-light p-5">
          <p className="h4 mb-4">Se Connecter</p>
          <div className={!errMsg ? null : "alert alert-danger"}>{errMsg}</div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label> </Form.Label>
            <Form.Control
              type="text"
              name="identification"
              {...register("identification")}
              placeholder="identification"
              className="form-control mb-4"
              autoFocus
              autoComplete="off"
              required
            />
            <small className="text-danger d-block">
              {errors.identification?.message}
            </small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label> </Form.Label>
            <Form.Control
              type="password"
              name="mdp"
              {...register("mdp")}
              placeholder="mot de pass"
              className="form-control mb-4"
              autoComplete="off"
              required
            />
            <small className="text-danger d-block">{errors.mdp?.message}</small>
          </Form.Group>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>
          <span> </span>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Se Connecter
          </Button>
        </Form>
      </div>
    </>
  );
}
