import {render, fireEvent} from '@testing-library/react';
import React from "react";
import {createMemoryHistory} from 'history';
import {MemoryRouter, Router} from "react-router-dom";
import MyNavbar from "./MyNavbar";
import {paths} from "../../constants/routes";

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

    beforeEach(() => {
        jest.clearAllMocks();
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


});