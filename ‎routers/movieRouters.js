// richiamo istanza di framework Express
const express = require('express');
// creiamo un'istanza dell'oggetto rotte di Express
const router = express.Router();

// IMPORT CONTROLLER
const movieController = require('../controllers/moviesController');

// ROTTE CRUD

// INDEX: restituisce tutti i film
router.get('/', movieController.index); // ✔ corretto, usa movieController

// SHOW: restituisce un singolo film e le sue recensioni
router.get('/:id', movieController.show); // ✔ corretto, usa movieController

// ESPORTA L'ISTANZA DI QUESTE ROTTE
module.exports = router;