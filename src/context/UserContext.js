import React, {useState, useEffect} from 'react';
import Cookies from "universal-cookie";
import {getHeaders} from "../utils/CORSHeaders";
import {backend} from "../constants/backend";

export const UserContext = React.createContext({
    token: undefined,
    data: undefined,
    login: () => {},
    logout: () => {}
});
const cookies = new Cookies();

const getUserData = async (token) => {
    const url = `${backend.USERS}data/`;
    const response = await fetch(url, {
        method: "GET",
        headers: getHeaders(token),
    });

    if (response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }
};

export const UserProvider = (props) => {
    const [token, setToken] = useState(cookies.get("token"));
    const [data, setData] = useState(cookies.get("data"));

    useEffect(() => {
        const fetchUserData = async() => {
            try {
                const res = await getUserData(token);
                setData(res.data);
                cookies.set("data", res.data, {
                    path: "/",
                    expires: setCookieDate()
                });
            } catch(e) {
                console.log(e);
            }
        }
        if (token) {
            fetchUserData();
        }
    }, [token]);

    const user = {
        token,
        data,
        changeToken: (newToken) => {
            cookies.set("token", newToken, {
                path: "/",
                expires: setCookieDate()
            });
            setToken(newToken);
        },
        changeData: (newData) => {
            cookies.set("data", newData, {
                path: "/",
                expires: setCookieDate()
            });
            setData(newData);
        },
        login: (newToken, newData) => {
            user.changeToken(newToken);
            user.changeData(newData);
        },
        logout: () => {
            cookies.remove("token", { path: "/" });
            cookies.remove("data", { path: "/" });
            setToken(undefined);
            setData(undefined);
        }
    };

    return <UserContext.Provider value={user} {...props} />;
};

const setCookieDate = () => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
};