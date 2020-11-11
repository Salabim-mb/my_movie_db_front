export const getHeaders = (token = null) => {
    let data = {
        "Content-Type": "application/json"
    };

    if (token !== null) {
        data = {...data, "token": token}
    }

    return data;
};