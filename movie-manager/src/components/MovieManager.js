import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const MovieManager = () => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [editId, setEditId] = useState(null);

    //Fetch movies
    const fetchMovies = async () => {
        const response = await axios.get('http://localhost:5000/api/movies');
        dispatch({ type: 'SET_MOVIES', payload: response.data });
    };

    useEffect(() => {
        fetchMovies();
    }, [dispatch]);

    //Adding new movie
    const addMovie = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/movies', { title, director });
        dispatch({ type: 'ADD_MOVIE', payload: response.data });
        setTitle('');
        setDirector('');
    };

    //Update a movie
    const updateMovie = async (e) => {
        e.preventDefault();
        const response = await axios.put(`http://localhost:5000/api/movies/${editId}`, { title, director });
        dispatch({ type: 'UPDATE_MOVIE', payload: response.data });
        setEditId(null);
        setTitle('');
        setDirector('');
    };

    //Editing movie
    const handleEdit = (movie) => {
        setTitle(movie.title);
        setDirector(movie.director);
        setEditId(movie.id);
    };

    //Deleting a movie
    const deleteMovie = async (id) => {
        await axios.delete(`http://localhost:5000/api/movies/${id}`);
        dispatch({ type: 'DELETE_MOVIE', payload: id });
    };

    //Partially update a movie
    const patchMovie = async (id) => {
        const newDirector = prompt('Enter new director name:');
        if (newDirector) {
            const response = await axios.patch(`http://localhost:5000/api/movies/${id}`, { director: newDirector });
            dispatch({ type: 'UPDATE_MOVIE', payload: response.data });
        }
    };

    return (
        <div className="container mt-4">
            <h2>Movie Manager</h2>
            <form onSubmit={editId ? updateMovie : addMovie} className="mb-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Movie Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Director"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary">
                        {editId ? 'Update Movie' : 'Add Movie'}
                    </button>
                </div>
            </form>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.title}</td>
                            <td>{movie.director}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(movie)}>Edit</button>
                                <button className="btn btn-danger me-2" onClick={() => deleteMovie(movie.id)}>Delete</button>
                                <button className="btn btn-info " onClick={() => patchMovie(movie.id)}>Change Director</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovieManager;