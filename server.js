import * as dotenv from "dotenv";
dotenv.config();
// Importation de la bibliothèque Express
import express from "express";
// Création d'une instance de l'application Express
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";
import jobRoutes from "./routes/jobRoutes.js";
import mongoose from "mongoose";

if(process.env.NODE_ENV === "development") {
    // Ajout d'un middleware pour afficher les journaux de requête en mode développement
    app.use(morgan("dev"));
}

// Ajout d'un middleware pour analyser les requêtes avec des charges utiles JSON
app.use(express.json());

app.use("/api/v1/jobs", jobRoutes);

// gestion des routes inexistantes
app.use('*', (req, res) => {
    res.status(404).json({
        error: "Route not found",
    });
});

// gestion des erreurs serveur
app.use((err, req, res, next) => {
    console.error(err); 
    res.status(500).json({
        error: "Something went wrongr",
    });
});



const PORT = process.env.PORT || 5100;
app.get("/", (req, res) => {
    res.send('Hi');
});

try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
   app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
   });
}
catch (error) {
    console.error(error);
}

