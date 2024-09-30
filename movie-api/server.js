const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS config
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// In-memory
let movies = [
    { id: 1, title: 'Inception', director: 'Christopher Nolan' },
    { id: 2, title: 'The Matrix', director: 'The Wachowskis' },
];

// GET movies
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// POST a movie
app.post('/api/movies', (req, res) => {
    const { title, director } = req.body;
    if (!title || !director) {
        return res.status(400).json({ error: 'Title and director are required' });
    }
    const newMovie = { id: movies.length + 1, title, director };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// PUT to movie
app.put('/api/movies/:id', (req, res) => {
    const { id } = req.params;
    const index = movies.findIndex(movie => movie.id === parseInt(id));
    if (index !== -1) {
        const { title, director } = req.body;
        if (!title && !director) {
            return res.status(400).json({ error: 'At least one field (title or director) must be provided' });
        }
        movies[index] = { id: parseInt(id), ...movies[index], ...req.body };
        res.json(movies[index]);
    } else {
        res.status(404).json({ error: 'Movie not found' });
    }
});

// PATCH to movie
app.patch('/api/movies/:id', (req, res) => {
    const { id } = req.params;
    const index = movies.findIndex(movie => movie.id === parseInt(id));
    if (index !== -1) {
        movies[index] = { ...movies[index], ...req.body };
        res.json(movies[index]);
    } else {
        res.status(404).json({ error: 'Movie not found' });
    }
});

// DELETE movie
app.delete('/api/movies/:id', (req, res) => {
    const { id } = req.params;
    const index = movies.findIndex(movie => movie.id === parseInt(id));
    if (index !== -1) {
        movies.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Movie not found' });
    }
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
