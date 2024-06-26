const AuthMidleware = require("./auth.middleware");

const monRole = "admin";

module.exports.checkUtilisateur = (req, res, next) => {
  AuthMidleware.checkUtilisateur(req, res, next, {
    admin: monRole,
    chef: monRole,
    chefAdjoint: monRole,
    agent: monRole,
    client: monRole,
  });
};
