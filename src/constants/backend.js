const backend_path = process.env.REACT_APP_BACKEND_PATH;

export const backend = {
    MOVIES: backend_path + "api/v1/movies/",
    USERS: backend_path + "user/"
};