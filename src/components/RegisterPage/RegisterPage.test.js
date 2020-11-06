import React from "react";
import {MemoryRouter} from "react-router";
import RegisterPage from "./RegisterPage";
import {createMemoryHistory} from 'history';
import {render, fireEvent, waitForElement} from '@testing-library/react';
import {Router} from "react-router-dom";
import {paths} from "../../constants/routes";

const renderWithRouter = (
    ui,
    {
        route = "/register",
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

describe("RegisterPage", () => {
    let apiFail;
    let token;
    let data;

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                if (apiFail) {
                    Promise.resolve({status: 500})
                } else {
                    Promise.resolve({status: 201, json: () => Promise.resolve({token: token})});
                }
            });
        });
    });

    beforeEach(() => {
        apiFail = false;
        jest.clearAllMocks();
        token = "123";
        data = {
            name: "Jan",
            surname: "Kowalski",
            email: "j.kowal@wp.pl",
            password: "zaq1@WSX",
            repeat_password: "zaq1@WSX"
        }
    });

    it("should match snapshot", () => {
        const {container} = render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    it("should block from posting if passwords dont match", () => {
        const {getByText, getByLabelText} = render(
            <MemoryRouter>
                <RegisterPage/>
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText("Name"), {
            target: {value: data.name}
        });
        fireEvent.change(getByLabelText("Surname"), {
            target: {value: data.surname}
        });
        fireEvent.change(getByLabelText("Email"), {
            target: {value: data.email}
        });
        fireEvent.change(getByLabelText("Password"), {
            target: {value: data.password}
        });
        fireEvent.change(getByLabelText("Repeat password"), {
            target: {value: data.repeat_password + "1"}
        });

        fireEvent.click(getByText("Sign me up"));

        expect(getByText("Passwords don't match!")).toBeInTheDocument();
        expect(fetch).toHaveBeenCalledTimes(0);
    });

    it("should register correctly", async () => {
        const {getByText, getByLabelText} = render(
            <MemoryRouter>
                <RegisterPage/>
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText("Name"), {
            target: {value: data.name}
        });
        fireEvent.change(getByLabelText("Surname"), {
            target: {value: data.surname}
        });
        fireEvent.change(getByLabelText("Email"), {
            target: {value: data.email}
        });
        fireEvent.change(getByLabelText("Password"), {
            target: {value: data.password}
        });
        fireEvent.change(getByLabelText("Repeat password"), {
            target: {value: data.repeat_password}
        });

        fireEvent.click(getByText("Sign me up"));

        await waitForElement(() => getByText("Registered successfully", {exact: false}));

        expect(getByText("Registered successfully", {exact: false})).toBeInTheDocument();
    });

    it("should view alert on api fail", async () => {
        apiFail = true;
        const {getByText, getByLabelText} = render(
            <MemoryRouter>
                <RegisterPage/>
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText("Name"), {
            target: {value: data.name}
        });
        fireEvent.change(getByLabelText("Surname"), {
            target: {value: data.surname}
        });
        fireEvent.change(getByLabelText("Email"), {
            target: {value: data.email}
        });
        fireEvent.change(getByLabelText("Password"), {
            target: {value: data.password}
        });
        fireEvent.change(getByLabelText("Repeat password"), {
            target: {value: data.repeat_password}
        });

        fireEvent.click(getByText("Sign me up"));

        await waitForElement(() => getByText("Something went wrong", {exact: false}));

        expect(getByText("Something went wrong", {exact: false})).toBeInTheDocument();
    });

    it("should redirect to login page", () => {
        const {history, getByText} = renderWithRouter(
            <RegisterPage />
        );

        fireEvent.click(getByText("Already have an account?", {exact: false}));

        expect(history.location.pathname).toBe(paths.LOGIN);
    });
});