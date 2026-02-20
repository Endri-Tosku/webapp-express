const express = require('express')
const app = express()
const port = process.env.PORT;

// importo il middelware errori
const notFound = require("./middlewares/notFound")

// importo il middelware errorif
const errorsHandler = require("./middlewares/errorsHandler")

// importiamo le rotte dei post
// const postRoutes = require('./‎routes/post');

// attivazione cartella public per i file statici
app.use(express.json());

// middleware per leggere JSON (servirà dopo)
// app.use(express.json());

// rotta di home
app.get("/api", (req, res) => {
    res.send("<h1>Rotta di home della APP dei film</h1>");
});

// colleghiamo le rotte dei post
// app.use('/posts', postRoutes);

// middleware per endpoint non trovati
app.use(notFound);

// middleware globale per gestione errori
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});