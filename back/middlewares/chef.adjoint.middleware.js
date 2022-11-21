const AuthMidleware = require("./auth.middleware");

const monRole = "chef adjoint";

module.exports.checkUtilisateur = (req, res, next) => {
  AuthMidleware.checkUtilisateur(req, res, next, {
    admin: "admin",
    chef: "chef",
    chefAdjoint: monRole,
    agent: monRole,
    client: monRole,
  });
};
