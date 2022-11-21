const AuthMidleware = require("./auth.middleware");

const monRole = "chef";

module.exports.checkUtilisateur = (req, res, next) => {
  AuthMidleware.checkUtilisateur(req, res, next, {
    admin: "admin",
    chef: monRole,
    chefAdjoint: monRole,
    agent: monRole,
    client: monRole,
  });
};
