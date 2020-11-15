import React from "react";
import UserPage from "./UserPage";
import {fireEvent, waitForElement, render} from '@testing-library/react';
import {MemoryRouter, Router} from "react-router-dom";
import {createMemoryHistory} from 'history';
import {UserContext} from "../../context/UserContext";
import RegisterPage from "../RegisterPage/RegisterPage";
import {paths} from "../../constants/routes";

const renderWithRouter = (
    ui,
    {
        route = "/user",
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

describe("UserPage", () => {
    let apiFail;
    let context;
    let userData;

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve) => {
                if (apiFail && !context?.data) {
                    resolve({status: 500})
                } else {
                    resolve({status: 200, json: () => Promise.resolve(userData)});
                }
            })
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
        apiFail = false;
        context = {
            token: "123",
            data: {
                name: "Jan",
                surname: "Kowalski",
                email: "jkowal@wp.pl"
            }
        };
        userData = {
            name: "John",
            surname: "Doe",
            email: "jdoe@example.com"
        };
    });

    it("should match snapshot", () => {
        const {container} = render(
            <UserContext.Provider value={context}>
                <MemoryRouter>
                    <UserPage />
                </MemoryRouter>
            </UserContext.Provider>
        );

        expect(container).toMatchSnapshot();
    });

    it("should render data if context is defined and api failed", async() => {
        let apiFail = true;
        const {getByText} = render(
            <UserContext.Provider value={context}>
                <MemoryRouter>
                    <UserPage />
                </MemoryRouter>
            </UserContext.Provider>
        );

        await waitForElement(() => getByText("Jan"));

        expect(getByText("Jan", {exact: false})).toBeInTheDocument();
    });

    it("should render error on missing context and api fail", async() => {
        apiFail = true;
        context.data = undefined;
        const {getByText} = render(
            <UserContext.Provider value={context}>
                <MemoryRouter>
                    <UserPage />
                </MemoryRouter>
            </UserContext.Provider>
        );


        expect(getByText("Something went wrong", {exact: false})).toBeInTheDocument();
    });


    it("should redirect to movies page", () => {
        const {history, getByText} = renderWithRouter(
            <UserContext.Provider value={context}>
                    <UserPage />
            </UserContext.Provider>
        );
        fireEvent.click(getByText("Movies", {exact: false}));

        expect(history.location.pathname).toBe(paths.MOVIES);
    });
});