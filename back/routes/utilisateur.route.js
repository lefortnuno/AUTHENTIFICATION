const router = require("express").Router();
const utilisateurController = require("../controllers/utilisateur.controller");
const admin = require('../middlewares/admin.middleware')
const chef = require('../middlewares/chef.middleware')
const chefAdjoint = require('../middlewares/chef.adjoint.middleware')
const agent = require('../middlewares/agent.middleware')

router.post("/seConnecter", utilisateurController.loginUtilisateur);
router.get("/", chefAdjoint.checkUtilisateur, utilisateurController.getAllUtilisateurs);
router.get("/:id", utilisateurController.getIdUtilisateur);
router.post("/", utilisateurController.addUtilisateur);
router.put("/:id", utilisateurController.updateUtilisateur);
router.put("/role/:id", utilisateurController.roleUtilisateur);
router.put("/etat/:id", utilisateurController.etatCompteUtilisateur);
router.delete("/:id",  utilisateurController.deleteUtilisateur);
router.get("/recherche/:valeur", utilisateurController.searchUtilisateurByParams);

module.exports = router;
