import React from "react";
import MovieForm from "./MovieForm";
import {render, fireEvent, waitForElement} from '@testing-library/react';
import {paths} from "../../constants/routes";
import {createMemoryHistory} from 'history';
import {MemoryRouter, Router} from "react-router";
import {backend} from "../../constants/backend";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: 1
    })
}));

const reactRouterDom = require("react-router-dom");

const renderWithParamPath = (
    ui,
    {
        route = "/" + paths.NEW_MOVIE + "1/",
        history = createMemoryHistory({initialEntries: [route]})
    } = {}
) => {
    return {
        ...render(
            <Router history={history}>{ui}</Router>
        ),
        history
    };
};

describe("MovieForm", () => {
    let getFail;
    let postFail;
    let putFail;
    let movieData;
    let fillData = () => {};

    beforeAll(() => {
        fillData = (getFn, data) => {

        };
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                if (input === `${backend.MOVIES}new/1`) {
                    if (getFail) {
                        resolve({status: 500});
                    } else {
                        resolve({status: 200, json: () => Promise.resolve(movieData)});
                    }
                } else {
                    switch(init.method) {
                        case "POST":
                            if (postFail) {
                                resolve({status: 500});
                            } else {
                                resolve({status: 200, json: () => Promise.resolve({})});
                            }
                            break;
                        case "PUT":
                            if (putFail) {
                                resolve({status: 500});
                            } else {
                                resolve({status: 200, json: () => Promise.resolve({})});
                            }
                            break;
                        default:
                            reject({});
                    }
                }
            });
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
        movieData = {
            id: 1,
            movieName: "Interstellar",
            movieGenre: "Sci-Fi",
            movieDirector: "Christopher Nolan",
            movieReleaseDate: "2014-01-01",
            movieImage: "",
            movieDescription: "Very cool movie!"
        }
    });

    it("should match snapshot", async () => {
        const {container, getByText} = render(
            <MemoryRouter>
                <MovieForm />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Genre"));

        expect(container).toMatchSnapshot();
    });

    it("should render get error", async () => {
        getFail = true;
        const {getByText, queryByText} = renderWithParamPath(
            <MovieForm />
        );

        await waitForElement(() => queryByText("Something went wrong", {exact: false}));

        expect(getByText("Something went wrong", {exact: false})).toBeInTheDocument();
    });
});