import {render, fireEvent} from '@testing-library/react';
import React from "react";
import {createMemoryHistory} from 'history';
import {MemoryRouter, Router} from "react-router-dom";
import MyNavbar from "./MyNavbar";
import {paths} from "../../constants/routes";
import {UserContext} from "../../context/UserContext";
import {backend} from "../../constants/backend";

const renderWithRouter = (
    ui,
    {
        route = "/non-existent-route",
        history = createMemoryHistory({ initialEntries: [route] })
    } = {}
) => {
    return {
        ...render(
            <Router history={history}>{ui}</Router>
        ),
        history
    }
};

describe("MyNavbar", () => {
    let context;
    let apiFail;
    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                if (apiFail) {
                    resolve({status: 500})
                } else {
                    resolve({status: 200, json: () => Promise.resolve("it's ok")})
                }
            })
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
        context = {
            token: "123",
            data: {
                name: "John",
                surname: "Doe",
                email: "jd@jd.jd"
            }
        }
    });

    it("should match snapshot", () => {
        const {container} = render(
            <MemoryRouter>
                <MyNavbar />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });

    it("should redirect to form", () => {
        const {history, getByText} = renderWithRouter(
            <MyNavbar />
        );

        fireEvent.click( getByText("+ Add movie") );
        expect(history.location.pathname).toBe(paths.NEW_MOVIE, {exact: false});
    });

    it("should redirect to main page", () => {
        const {history, getByText} = renderWithRouter(
            <MyNavbar />
        );

        fireEvent.click( getByText("MyMovieDB") );
        expect(history.location.pathname).toBe(paths.MAIN, {exact: false});
    });

    it("should log user out", async () => {
        const {history, getByText} = renderWithRouter(
            <UserContext.Provider value={context}>
                <MyNavbar />
            </UserContext.Provider>
        );
        fireEvent.click(getByText("Log out"));

        await expect(fetch).toHaveBeenCalledWith(`${backend.PLAIN}login/`, {
            method: "DELETE",
            headers: {
                "token": context.token,
                "Content-Type": "application/json"
            }
        });

        expect(context?.token).toBe(undefined);
        expect(history.location.pathname).toBe(paths.MAIN);
    });

    it("should log user out even if api failed", async () => {
        apiFail = true;
        const {history, getByText} = renderWithRouter(
            <UserContext.Provider value={context}>
                <MyNavbar />
            </UserContext.Provider>
        );
        fireEvent.click(getByText("Log out"));

        await expect(fetch).toHaveBeenCalledTimes(1);

        expect(context?.token).toBe(undefined);
        expect(history.location.pathname).toBe(paths.MAIN);
    });


});