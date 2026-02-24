const express = require('express')
const app = express()
const port = process.env.PORT;

// importo il middleware cors
const cors = require("cors");

// middleware per il CORS
app.use(cors({
    origin: 'http://localhost:5173'
}));

// importo il middelware errori
const notFound = require("./middlewares/notFound")

// importo il middelware errorif
const errorsHandler = require("./middlewares/errorsHandler")

// import del middelware di gestione di path imgs
const imagePathMiddleware = require("./middlewares/imagePath");

// attivazioone middelware di gestione di path imgs
app.use(imagePathMiddleware);

// attivazione cartella public per i file statici
app.use(express.static('public'));

// middleware per leggere JSON
app.use(express.json());

// importiamo le rotte dei film
const moviesRoutes = require('./‎routers/movieRouters');

// rotta di home
app.get("/api", (req, res) => {
    res.send("<h1>Rotta di home della APP dei film</h1>");
});

// colleghiamo le rotte dei post
app.use('/api/movies', moviesRoutes);

// middleware per endpoint non trovati
app.use(notFound);

// middleware globale per gestione errori
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});