const paths = {
    MAIN: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    MOVIES: "/movies",
    NEW_MOVIE: "/movies/new"
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
        exact: true
    }
]

export {paths};