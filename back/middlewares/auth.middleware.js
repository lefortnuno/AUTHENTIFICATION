const utilisateurModel = require("../models/utilisateur.model");
const jwt = require("jsonwebtoken");

module.exports.checkUtilisateur = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, `12nuno98Trofel56`, async (err, decodedToken) => {
      if (decodedToken) {
        const dtok = decodedToken.numCompte[0];
        utilisateurModel.getIdUtilisateur(dtok.numCompte, (err, resultat) => {
          if (resultat[0].attribut == "admin") {
            next();
          } else {
            res.status(403).send({
              message: `Vous etes un simple ${resultat[0].attribut} !`,
              success: false,
            });
          }
        });
      } else {
        res.status(401).send({
          message: `Unauthorized! Failed to Decode Token !`,
          success: false,
        });
      }
    });
  } else {
    res.status(401).send({
      message: `Unauthorized! token invalide!`,
      success: false,
    });
  }
};
