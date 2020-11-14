export const getHeaders = (token = null) => {
    let data = {
        "Content-Type": "application/json"
    };

    if (token !== null) {
        data = {...data, "Token": token}
    }

    return data;
};