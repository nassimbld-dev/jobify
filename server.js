import express from "express";

const app = express();
app.use(express.json())

app.get("/",(req,res) => {
    console.log(req)
});

app.listen("5000", () => {console.log("listening on the port 5000")})