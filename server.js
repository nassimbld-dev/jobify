import * as dotenv from "dotenv";
dotenv.config();
// Importation de la bibliothèque Express
import express from "express";
// Création d'une instance de l'application Express
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";

let jobs = [
    {id: nanoid(), title: "Software Developer", company: "Google"},
    {id: nanoid(), title: "Frontend Developer", company: "Facebook"},]

if(process.env.NODE_ENV === "development") {
    // Ajout d'un middleware pour afficher les journaux de requête en mode développement
    app.use(morgan("dev"));
}

// Ajout d'un middleware pour analyser les requêtes avec des charges utiles JSON
app.use(express.json());

// get all jobs
app.get("/api/v1/jobs", (req, res) => {
    res.status(200).json({
            jobs,
    });
});

// create new job, a tester sur postman : body, row
app.post("/api/v1/jobs", (req, res) => {
    const { title, company} = req.body;
    console.log(title, company);
    if(!title || !company) {
        return res.status(400).json({
            error: "title and company are required",
        });
        return;
    }

    const id = nanoid(10); 
    const newJob = {id, title, company};

    jobs.push(newJob);

    res.status(201).json(newJob);
});



const PORT = process.env.PORT || 5100;
app.get("/", (req, res) => {
    res.send('Hi');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${5100}`);
});