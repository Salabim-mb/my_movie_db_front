const backend_path = process.env.REACT_APP_BACKEND_PATH;

export const backend = {
    MOVIES: backend_path + "movies/",
    USERS: backend_path + "user/",
    LOGIN: backend_path + "login/",
    PLAIN: backend_path,
};