// Importation de la bibliothèque Express
import express from "express";

// Création d'une instance de l'application Express
const app = express();

// Ajout d'un middleware pour analyser les requêtes avec des charges utiles JSON
app.use(express.json());

// Définition d'un gestionnaire de route pour les requêtes GET à l'URL racine ("/")
app.get("/", (req, res) => {
    // Affichage de l'objet requête dans la console
    console.log(req);
});

// Démarrage du serveur et écoute sur le port 5000
app.listen("5000", () => {
    // Affichage d'un message dans la console lorsque le serveur démarre
    console.log("listening on the port 5000");
});