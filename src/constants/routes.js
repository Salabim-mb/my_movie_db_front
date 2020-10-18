import MovieForm from "../components/MovieForm/MovieForm";

const paths = {
    MAIN: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    MOVIES: "/movies",
    NEW_MOVIE: "/movies/new",
    EDIT_MOVIE: "/movies/new/:id"
};

export default [
    {
        path: paths.MAIN,
        exact: true
    },
    {
        path: paths.MOVIES,
        exact: true
    },
    {
        path: paths.NEW_MOVIE,
        exact: true,
        component: MovieForm
    },
    {
        path: paths.EDIT_MOVIE,
        exact: true,
        component: MovieForm
    }
]

export {paths};