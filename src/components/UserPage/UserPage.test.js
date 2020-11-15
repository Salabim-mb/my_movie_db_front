import React from "react";
import UserPage from "./UserPage";
import {fireEvent, waitForElement, render} from '@testing-library/react';
import {MemoryRouter, Router} from "react-router-dom";
import {createMemoryHistory} from 'history';
import {UserContext} from "../../context/UserContext";
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
    let context;

    beforeAll(() => {

    });

    beforeEach(() => {
        jest.clearAllMocks();
        context = {
            token: "123",
            data: {
                name: "Jan",
                surname: "Kowalski",
                email: "jkowal@wp.pl"
            }
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

    it("should render data if context is defined", async() => {
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

    it("should render error on missing context", async() => {
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