let dbConn = require("../config/db");

let Utilisateur = function (utilisateur) {
  this.numCompte = utilisateur.numCompte;
  this.photoPDP = utilisateur.photoPDP;
  this.identification = utilisateur.identification;
  this.attribut = utilisateur.attribut;
  this.mdp = utilisateur.mdp;
  this.etatCompte = utilisateur.etatCompte;
};

Utilisateur.addUtilisateur = (newUtilisateur, result) => {
  dbConn.query("INSERT INTO compte SET ?", newUtilisateur, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, { success: true, message: "Ajout reussi !" });
    }
  });
};

Utilisateur.loginUtilisateur = (values, result) => {
  let requete;
  if (values.identification && values.mdp) {
    requete = "SELECT * FROM compte WHERE identification=? AND mdp=?";
  }
  dbConn.query(requete, [values.identification, values.mdp], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Utilisateur.getAllUtilisateurs = (result) => {
  dbConn.query("SELECT * FROM compte order by numCompte desc", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Utilisateur.getLastIdUtilisateurs = (result) => {
  dbConn.query(
    "SELECT numCompte FROM compte ORDER BY numCompte DESC LIMIT 1",
    (err, res) => {
      if (err) {
        return result(err, null);
      } else {
        let id = 0;
        if (res.length === 0) {
          id = 1;
        } else {
          const tmpID = Object.values(res);
          id = Object.values(tmpID[0]);
          id = id[0] + 1;
        }
        return result(null, id);
      }
    }
  );
};

Utilisateur.getIdUtilisateur = (numCompte, result) => {
  dbConn.query(
    "SELECT * FROM compte WHERE numCompte = ?",
    numCompte,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        if (res.length !== 0) {
          result(null, res);
        } else {
          result(null, res);
        }
      }
    }
  );
};

Utilisateur.searchUtilisateurByParams = (valeur, result) => {
  dbConn.query(
    ` select * from compte where identification LIKE '%${valeur}%' order by numCompte desc`,
    valeur,
    (err, res) => {
      if (err) {
        result({ err, message: "erreur !", success: false }, null);
      } else {
        if (res.length !== 0) {
          result(null, { res, message: "trouvable !", success: true });
        } else {
          result(null, { res, message: "Introuvable !", success: false });
        }
      }
    }
  );
};

Utilisateur.updateUtilisateur = (newUtilisateur, numCompte, result) => {
  dbConn.query(
    `update compte set ? where numCompte = ${numCompte}`,
    newUtilisateur,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Utilisateur.deleteUtilisateur = (numCompte, result) => {
  dbConn.query(
    `delete from compte where numCompte = ${numCompte}`,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, {
          message: `suppresion success, numCompte : ${numCompte}`,
        });
      }
    }
  );
};

Utilisateur.vraideleteUtilisateur = (numCompte, result) => {
  Utilisateur.getIdUtilisateur(numCompte, (err, resAttribut) => {
    if (resAttribut && resAttribut[0].attribut === "client") {
      dbConn.query(
        `delete from compte where numCompte = ${numCompte}`,
        function (err, res) {
          if (err) {
            result(err, null);
          } else {
            result(null, {
              message: `suppresion success, numCompte : ${numCompte}`,
            });
          }
        }
      );
    } else if (!resAttribut && resAttribut[0].attribut === "client") {
      result(null, { message: "Pas de resultat ~" });
    } else if (resAttribut && resAttribut[0].attribut !== "client") {
      result(null, {
        message: `Echec Suppression! attribut du compte: ${resAttribut[0].attribut}`,
      });
    }
  });
};

Utilisateur.roleUtilisateur = (newUtilisateur, numCompte, result) => {
  dbConn.query(
    `update compte set ? where numCompte = ${numCompte}`,
    newUtilisateur,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Utilisateur;
