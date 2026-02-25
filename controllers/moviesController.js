const connection = require("./../data/db");

// const dataPost = require('./../data/posts')

// INDEX
function index(req, res) {
    // prepariamo la query
    const sql = 'SELECT * FROM movies';
    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        // correzione delle immagini al nome del titolo
        const titleToImage = {
            "The Godfather": "the_godfather.jpg",
            "Interstellar": "interstellar.jpg",
            "Titanic": "titanic.jpg",
            "The Matrix": "matrix.jpg",
            "Inception": "inception.jpg"
        };

        // creo una copia dei risultati con modifica path imgs
        const films = results.map(film => {
            return {
                ...film,
                image: req.imagePath + titleToImage[film.title]
            }
        })

        res.json(films);
    })
}

// SHOW
function show(req, res) {

    const id = parseInt(req.params.id);

    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    const reviewSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        if (movieResults.length === 0) {
            return res.status(404).json({ error: 'Film not found' });
        }

        const movie = movieResults[0];

        // aggiungo path img dal middleware
        movie.image = req.imagePath + movie.image;

        connection.query(reviewSql, [id], (err, reviewResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // salviamo le reviews in una cost
            const reviewsArr = reviewResults;

            movie.reviews = reviewsArr;

            res.json(movie);
        });
    });
}

// funzione per lo store della review
function storeReview(req, res) {

    // recuperiamo id da param dinamico
    const { id } = req.params;

    // recuperiamo le info dal body della req
    const { name, vote, text } = req.body;

    // settiamo Sql di richiesta al DB
    const sql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)';

    // Eseguiamo la query
    connection.query(sql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId });
    });
}

module.exports = { index, show, storeReview };