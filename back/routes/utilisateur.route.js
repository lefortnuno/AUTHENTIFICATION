const router = require("express").Router();
const utilisateurController = require("../controllers/utilisateur.controller");
const middlewareAuth = require('../middlewares/auth.middleware')

router.post("/seConnecter", utilisateurController.loginUtilisateur);
// router.get("/", middlewareAuth.checkUtilisateur, utilisateurController.getAllUtilisateurs);
router.get("/", utilisateurController.getAllUtilisateurs);
router.get("/:id", utilisateurController.getIdUtilisateur);
router.post("/", utilisateurController.addUtilisateur);
router.put("/:id", utilisateurController.updateUtilisateur);
router.put("/role/:id", utilisateurController.roleUtilisateur);
router.put("/etat/:id", utilisateurController.etatCompteUtilisateur);
router.delete("/:id", utilisateurController.deleteUtilisateur);
router.get("/recherche/:valeur", utilisateurController.searchUtilisateurByParams);

module.exports = router;
