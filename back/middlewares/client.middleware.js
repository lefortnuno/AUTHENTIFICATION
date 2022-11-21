const AuthMidleware = require("./auth.middleware");

const monRole = "client";

module.exports.checkUtilisateur = (req, res, next) => {
  AuthMidleware.checkUtilisateur(req, res, next, {
    admin: "admin",
    chef: "chef",
    chefAdjoint: "chef adjoint",
    agent: "agent",
    client: monRole,
  });
};
