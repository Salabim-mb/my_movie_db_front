import React from 'react';
import {render, fireEvent, waitForElement} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import LoginPage from "./LoginPage";
import {MemoryRouter} from "react-router";
import {Router} from "react-router-dom";
import {paths} from "../../constants/routes";

const renderWithRouter = (
    ui,
    {
        route = "/login",
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

describe("LoginPage", () => {
    let apiFail;
    let token;
    let data;
    let invalid;

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                if (apiFail) {
                    resolve({status: 500})
                } else {
                    if (invalid) {
                        resolve({status: 400});
                    } else {
                        resolve({status: 200, json: () => Promise.resolve(token)})
                    }
                }
            });
        });
    });

    beforeEach(() => {
        invalid = false;
        apiFail = false;
        jest.clearAllMocks();
        token = "123";
        data = {
            email: "qwe@qwe.qwe",
            password: "zaq1@WSX"
        };
    });

    it("should match snapshot", () => {
        const {container} = render(
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    it("should log in correctly", async () => {
        const {history, getByLabelText, getByText} = renderWithRouter(
            <LoginPage />
        );

        fireEvent.change(getByLabelText("Email"), {
            target: {value: data.email}
        });
        fireEvent.change(getByLabelText("Password"), {
            target: {value: data.password}
        });
        fireEvent.click(getByText("Log in!"));

        await waitForElement(() => getByText("Login successful", {exact: false}));

        expect(getByText("Login successful", {exact: false})).toBeInTheDocument();
        await expect(history.location.pathname).toBe(paths.LOGIN);

    });

    it("should render error on invalid credentials", async () => {
        invalid = true;
        const {history, getByLabelText, getByText} = renderWithRouter(
            <LoginPage />
        );

        fireEvent.change(getByLabelText("Email"), {
            target: {value: data.email}
        });
        fireEvent.change(getByLabelText("Password"), {
            target: {value: data.password}
        });
        fireEvent.click(getByText("Log in!"));

        await waitForElement(() => getByText("Something went wrong", {exact: false}));

        expect(getByText("Something went wrong", {exact: false})).toBeInTheDocument();
        await expect(history.location.pathname).not.toBe(paths.USER_PAGE);
    });

    it("should render alert on api fail", async () => {
        apiFail = true;
        const {history, getByLabelText, getByText} = renderWithRouter(
            <LoginPage />
        );

        fireEvent.change(getByLabelText("Email"), {
            target: {value: data.email}
        });
        fireEvent.change(getByLabelText("Password"), {
            target: {value: data.password}
        });
        fireEvent.click(getByText("Log in!"));

        await waitForElement(() => getByText("Something went wrong", {exact: false}));

        expect(getByText("Something went wrong", {exact: false})).toBeInTheDocument();
        await expect(history.location.pathname).not.toBe(paths.USER_PAGE);
    });

    it("should redirect to register page", () => {
        const {history, getByText} = renderWithRouter(
            <LoginPage />
        );
        fireEvent.click(getByText("Don't have an account", {exact: false}));
        expect(history.location.pathname).toBe(paths.REGISTER)
    });
});