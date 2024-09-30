// src/redux/movieReducer.js
const initialState = {
    movies: [],
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MOVIE':
            return { ...state, movies: [...state.movies, action.payload] };
        case 'UPDATE_MOVIE':
            return {
                ...state,
                movies: state.movies.map(movie =>
                    movie.id === action.payload.id ? action.payload : movie
                ),
            };
        case 'DELETE_MOVIE':
            return {
                ...state,
                movies: state.movies.filter(movie => movie.id !== action.payload),
            };
        case 'SET_MOVIES':
            return { ...state, movies: action.payload };
        default:
            return state;
    }
};

export default movieReducer;