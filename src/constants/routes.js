import MovieForm from "../components/MovieForm/MovieForm";
import MovieList from "../components/MovieList";
import LoginPage from "../components/LoginPage/LoginPage";

const paths = {
    MAIN: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    MOVIES: "/movies",
    NEW_MOVIE: "/movies/new",
    EDIT_MOVIE: "/movies/new/:id",
    USER_PAGE: "/user"
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
        path: paths.LOGIN,
        exact: true,
        component: LoginPage
    }
]

export {paths};