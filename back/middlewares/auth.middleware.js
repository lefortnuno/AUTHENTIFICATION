const utilisateurModel = require("../models/utilisateur.model");
const jwt = require("jsonwebtoken");

module.exports.checkUtilisateur = (req, res, next, myUserRole) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (decodedToken) {
        const dtok = decodedToken.numCompte[0];
        utilisateurModel.getIdUtilisateur(dtok.numCompte, (err, resultat) => {
          if (
            resultat[0].attribut == myUserRole.admin ||
            resultat[0].attribut == myUserRole.chef ||
            resultat[0].attribut == myUserRole.chefAdjoint ||
            resultat[0].attribut == myUserRole.agent ||
            resultat[0].attribut == myUserRole.client
          ) {
            next();
          } else {
            res.status(403).send({
              message: ` Désolé, cher '${resultat[0].attribut}', vous n’êtes pas autorisé à accéder à cette page !`,
              success: false,
            });
          }
        });
      } else {
        res.status(401).send({
          message: `Non autorisé ! Désolé, Impossible de décoder votre jeton/token !`,
          success: false,
        });
      }
    });
  } else {
    res.status(401).send({
      message: `Non autorisé ! Désolé, Impossible de trouver votre jeton/token  !`,
      success: false,
    });
  }
};
