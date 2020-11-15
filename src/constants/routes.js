import MovieForm from "../components/MovieForm/MovieForm";
import MovieList from "../components/MovieList";
import LoginPage from "../components/LoginPage/LoginPage";
import RegisterPage from "../components/RegisterPage/RegisterPage";
import UserPage from "../components/UserPage/UserPage";

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
    }, {
        path: paths.REGISTER,
        exact: true,
        component: RegisterPage
    },
    {
        path: paths.USER_PAGE,
        exact: true,
        component: UserPage,
        requiresLogin: true
    }
]

export {paths};