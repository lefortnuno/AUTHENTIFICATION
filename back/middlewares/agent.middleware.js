const AuthMidleware = require("./auth.middleware");

const monRole = "agent";

module.exports.checkUtilisateur = (req, res, next) => {
  AuthMidleware.checkUtilisateur(req, res, next, {
    admin: "admin",
    chef: "chef",
    chefAdjoint: "chef adjoint",
    agent: monRole,
    client: monRole,
  });
};
