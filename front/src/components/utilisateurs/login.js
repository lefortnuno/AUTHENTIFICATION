import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../Header"
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const IP = `192.168.8.102`;
const PORT = `:5010`;
const URL = `http://` + IP + PORT + `/api/utilisateur/seConnecter`;

export default function Login() {
  const navigate = useNavigate();

  //ENVOYER DONNER FORMULAIRE AU BACK-END
  const onSubmit = (data) => {
    axios
      .post(URL, data)
      .then(function (response) {
        if (response.data.success && response.status === 200) {
          navigate("/utilisateur/"); // a decommenter si hiditr page hafa !
          toast.success(`Co Reussi`);
          localStorage.setItem("userInfo", response.data.user);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(`Co echec`);
        }
      })
      .catch((error) => {
        console.log("Il y a une erreur : ", error);
      });
  };

  {
    /* SCHEMA VALIDATION FORMULAIRE ----- MA FORM LOGIN / SE CONNECTER ----- */
  }
  const validationSchema = Yup.object().shape({
    identification: Yup.string().required("Identification obligatoire"),
    mdp: Yup.string()
      .required("Mot de passe obligatoire"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      identification: "",
      mdp: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;
  return (
    <>
      <div className="container">
        <Header />
          <Form className="text-center border border-light p-5">
            <p className="h4 mb-4">Se Connecter</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> </Form.Label>
              <Form.Control
                type="text"
                name="identification"
                {...register("identification")}
                placeholder="identification"
                className="form-control mb-4"
                autoFocus
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
              />
              <small className="text-danger d-block">{errors.mdp?.message}</small>
            </Form.Group>
            <Button variant="danger" type="reset">
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
