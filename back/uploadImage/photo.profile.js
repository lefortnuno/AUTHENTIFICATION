require("dotenv").config({ path: "../config/.env" });
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const Utilisateur = require("../models/utilisateur.model");

// Databse Connection
const connection = require("../config/db");
const URL_UPLOAD_PIC = `/api/utilisateur/photoProfile`

app.use(cors());

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public_html/", "uploads"),
  filename: function (req, file, cb) {
    // null as first argument means no error
    cb(null, Date.now() + "-" + file.originalname);
  },
});

app.put(URL_UPLOAD_PIC, async (req, res) => {
  try {
    // 'avatar' is the name of our file input field in the HTML form

    let upload = multer({ storage: storage }).single("avatar");

    upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields

      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const classifiedsadd = {
        photoPDP: req.file.filename,
      };
      Utilisateur.getLastIdUtilisateurs((err, lastId) => {
        if (!err) {
          const numCompte = lastId - 1;
          const sql = `update compte set ? where numCompte = ${numCompte}`;
          connection.query(sql, classifiedsadd, (err, results) => {
            if (err) throw err;
            res.json({ success: true });
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});
