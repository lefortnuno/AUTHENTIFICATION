"use strict";
const Utilisateur = require("../models/utilisateur.model");
const jwt = require("jsonwebtoken");
const tmp = 3 * 24 * 60 * 60 * 1000;
const path = require("path");
const multer = require("multer");

const createToken = (numCompte) => {
  return jwt.sign({ numCompte }, process.env.TOKEN_SECRET, { expiresIn: tmp });
};

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public_html/", "uploads"),
  filename: function (req, file, cb) {
    // null as first argument means no error
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports.addUtilisateur = (req, res) => {
  let { identification, mdp } = req.body;
  const attribut = "client";
  const etatCompte = "actif";

  let upload = multer({ storage: storage }).single("avatar");

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    const photoPDP= req.file.filename

    //Get last ID USER for future CONCATENATION
    Utilisateur.getLastIdUtilisateurs((err, lastId) => {
      if (!err) {
        identification = identification + "-" + lastId;
  
        const newUtilisateur = {
          photoPDP,
          attribut,
          identification,
          mdp,
          etatCompte,
        };
  
        // Add User Model
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
  const { photoPDP, identification, mdp, etatCompte } = req.body;
  const newUtilisateur = { photoPDP, identification, mdp, etatCompte };

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
