import MovieForm from "../components/MovieForm/MovieForm";
import MovieList from "../components/MovieList";
import RegisterPage from "../components/RegisterPage/RegisterPage";

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
        path: paths.NEW_MOVIE,
        exact: true,
        component: MovieForm
    },
    {
        path: paths.EDIT_MOVIE,
        exact: true,
        component: MovieForm
    },
    {
        path: paths.MOVIES,
        exact: true,
        component: MovieList
    },
    {
        path: paths.REGISTER,
        exact: true,
        component: RegisterPage
    }
]

export {paths};