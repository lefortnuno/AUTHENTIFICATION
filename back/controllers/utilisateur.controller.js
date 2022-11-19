"use strict";
const Utilisateur = require("../models/utilisateur.model");
const jwt = require("jsonwebtoken");
const tmp = 3 * 24 * 60 * 60 * 1000;

const createToken = (numCompte) => {
  return jwt.sign({ numCompte }, process.env.TOKEN_SECRET, { expiresIn: tmp });
};

module.exports.addUtilisateur = (req, res) => {
  let { identification, mdp } = req.body;
  const attribut = "client";
  const etatCompte = "actif";
  
  Utilisateur.getLastIdUtilisateurs((err, lastId) => {
    if (!err) {
      identification = identification + "-" + lastId;

      const newUtilisateur = {
        attribut,
        identification,
        mdp,
        etatCompte,
      };

      Utilisateur.addUtilisateur(newUtilisateur, (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          res.send(resp);
        }
      });
    } else {
      res.send(err);
    }
  });
};

module.exports.loginUtilisateur = (req, res) => {
  const { identification, mdp } = req.body;
  Utilisateur.loginUtilisateur({ identification, mdp }, (err, resp) => {
    const token = createToken(resp);
    if (!err) {
      if (resp.length != 0) {
        res.send({ success: true, token, user: resp });
      } else {
        res.send({ success: false });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.getAllUtilisateurs = (req, res) => {
  Utilisateur.getAllUtilisateurs((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdUtilisateur = (req, res) => {
  Utilisateur.getIdUtilisateur(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateUtilisateur = (req, res) => {
  const { identification, mdp, etatCompte } = req.body;
  const newUtilisateur = { identification, mdp, etatCompte };

  Utilisateur.updateUtilisateur(newUtilisateur, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.roleUtilisateur = (req, res) => {
  const { attribut } = req.body;
  const newUtilisateur = { attribut };

  Utilisateur.roleUtilisateur(newUtilisateur, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.etatCompteUtilisateur = (req, res) => {
  const { etatCompte } = req.body;
  const newUtilisateur = { etatCompte };

  Utilisateur.etatCompteUtilisateur(
    newUtilisateur,
    req.params.id,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};

module.exports.deleteUtilisateur = (req, res) => {
  Utilisateur.deleteUtilisateur(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchUtilisateurByParams = (req, res) => {
  Utilisateur.searchUtilisateurByParams(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
