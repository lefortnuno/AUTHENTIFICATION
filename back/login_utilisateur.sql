-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 18 nov. 2022 à 07:02
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `login_utilisateur`
--

-- --------------------------------------------------------

--
-- Structure de la table `compte`
--

DROP TABLE IF EXISTS `compte`;
CREATE TABLE IF NOT EXISTS `compte` (
  `numCompte` int(11) NOT NULL AUTO_INCREMENT,
  `photoPDP` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attribut` varchar(15) DEFAULT 'client',
  `identification` varchar(50) NOT NULL,
  `mdp` varchar(15) NOT NULL,
  `etatCompte` varchar(25) DEFAULT 'actif',
  PRIMARY KEY (`numCompte`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `compte`
--

INSERT INTO `compte` (`numCompte`, `attribut`, `identification`, `mdp`, `etatCompte`) VALUES
(6, 'admin', 'nuno-6', 'nuno', 'actif'),
(2, 'chef', 'undefined-2', 'gggg', 'actif'),
(3, 'chef adjoint', 'tttt-3', '55555', 'actif'),
(4, 'agent', 'lala-4', 'www', 'actif'),
(5, 'client', 'kkk-5', '111', 'actif'),
(7, 'client', 'bbb-7', 'bbb', 'actif'),
(8, 'chef', 'w-8', 'w', 'actif');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
