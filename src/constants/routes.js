import MovieList from "../components/MovieList";

const paths = {
    MAIN: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    MOVIES: "/movies",
    NEW_MOVIE: "/movies/new"
};

export default [
    {
        path: paths.MOVIES,
        exact: true,
        component: MovieList
    }r
]

export {paths};