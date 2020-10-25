import React from "react";
import MovieForm from "./MovieForm";
import {render, fireEvent, waitForElement} from '@testing-library/react';
import {paths} from "../../constants/routes";
import {createMemoryHistory} from 'history';
import {MemoryRouter, Router} from "react-router";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: 1
    })
}));

let reactRouterDom = require("react-router-dom");

describe("MovieForm POST", () => {
    let postFail;
    let movieData;

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                if (postFail) {
                    resolve({status: 500});
                } else {
                    resolve({status: 201, json: () => Promise.resolve({})});
                }
            });
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
        reactRouterDom.useParams = () => ({

        });
        movieData = {
            id: 1,
            movieName: "Interstellar",
            movieGenre: "Sci-Fi",
            movieDirector: "Christopher Nolan",
            movieReleaseDate: new Date(),
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

    it("should post movie and get response", async () => {
        const {getByLabelText, getByPlaceholderText, getByText} = render(
            <MemoryRouter>
                <MovieForm />
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText("Movie title"), {
            target: {value: movieData.movieName}
        });
        fireEvent.change(getByLabelText("Director"), {
            target: {value: movieData.movieDirector}
        });
        fireEvent.change(getByLabelText("Genre"), {
            target: {value: movieData.movieGenre}
        });
        fireEvent.change(getByPlaceholderText("2014"), {
            target: { value: movieData.movieReleaseDate}
        });
        fireEvent.change(getByLabelText("Description"), {
            target: {value: movieData.movieDescription}
        });

        fireEvent.click(getByText("Add movie"));

        await waitForElement(() => getByText("Movie added successfully.", {exact: false}));

        expect(getByText("Movie added successfully", {exact: false})).toBeInTheDocument();
    });

    it("should render error on api fail", async () => {
        postFail = true;
        const {getByLabelText, getByPlaceholderText, getByText} = render(
            <MemoryRouter>
                <MovieForm />
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText("Movie title"), {
            target: {value: movieData.movieName}
        });
        fireEvent.change(getByLabelText("Director"), {
            target: {value: movieData.movieDirector}
        });
        fireEvent.change(getByLabelText("Genre"), {
            target: {value: movieData.movieGenre}
        });
        fireEvent.change(getByPlaceholderText("2014"), {
            target: { value: movieData.movieReleaseDate}
        });
        fireEvent.change(getByLabelText("Description"), {
            target: {value: movieData.movieDescription}
        });

        fireEvent.click(getByText("Add movie"));

        await waitForElement(() => getByText("Something went wrong while adding your movie."));

        expect(getByText("Something went wrong while adding your movie.")).toBeInTheDocument();
    });
});

describe("MovieForm GET & PUT", () => {
    let getFail;
    let putFail;
    let movieData;



    beforeAll(() => {

        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                switch(init.method) {
                    case "PUT":
                        if (putFail) {
                            resolve({status: 500});
                        } else {
                            resolve({status: 200, json: () => Promise.resolve({})});
                        }
                        break;
                    case "GET":
                        if (getFail) {
                            resolve({status: 500});
                        } else {
                            resolve({status: 200, json: () => Promise.resolve(movieData)});
                        }
                        break;
                    default:
                        reject({});
                }
            });
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
        reactRouterDom.useParams = () => ({
            id: 1
        });
        movieData = {
            id: 1,
            movieName: "Interstellar",
            movieGenre: "Sci-Fi",
            movieDirector: "Christopher Nolan",
            movieReleaseDate: new Date(),
            movieImage: "",
            movieDescription: "Very cool movie!"
        }
    });

    it("should match snapshot filled", async () => {
        const {container, getByLabelText} = render(
            <MemoryRouter>
                <MovieForm />
            </MemoryRouter>
        );

        await waitForElement(() => getByLabelText("Movie title"));

        expect(container).toMatchSnapshot();
    });

    it("should render correct alert message when submitted", async () => {
        const {getByLabelText, getByText} = render(
            <MemoryRouter>
                <MovieForm />
            </MemoryRouter>
        );

        await waitForElement(() => getByLabelText("Movie title"));
        expect(getByLabelText("Movie title").value).toBe(movieData.movieName);

        fireEvent.change(getByLabelText("Movie title"), {
            target: {value: "asdf"}
        });
        fireEvent.click(getByText("Update movie"));

        await waitForElement(() => getByText("Movie updated successfully.", {exact: false}));
        expect(getByText("Movie updated successfully.", {exact: false})).toBeInTheDocument();
    });
});