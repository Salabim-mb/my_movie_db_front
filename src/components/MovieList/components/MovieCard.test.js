import React from "react";
import MovieCard from "./components/MovieCard";
import {render, waitForElement} from '@testing-library/react';



describe("MovieCard", () => {
    let apiFail;
    let res;

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve) => {
                if (apiFail) {
                    resolve({status: 500});
                } else {
                    resolve({status: 200, json: () => Promise.resolve(res)});
                }
            });
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
        MovieCard.mockImplementation((props) => <div>{props?.movie?.title}</div>);
        apiFail = false;
        res = [
            {
                id: 1,
                title: "Titanic"
            }, {
                id: 2,
                title: "Batman"
            }
        ]
    });

    it("should match snapshot", async () => {
        const {container, getByText} = render(
            <MemoryRouter>
                <MovieList />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Titanic"));

        expect(container).toMatchSnapshot();
    });

    it("should fetch correct data", async () => {
        const {getByText, queryByText} = render(
            <MemoryRouter>
                <MovieList />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Titanic"));

        expect(getByText("Titanic")).toBeInTheDocument();
        expect(queryByText("Something went wrong", {exact: false})).toBe(null);
        //expect(queryByText("Something went wrong", {exact: false})).not.toBeInTheDocument();
    });

    it ("should render error alert", async () => {
        apiFail = true;

        const {getByText, queryByText} = render(
            <MemoryRouter>
                <MovieList />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Something went wrong", {exact: false}));

        expect(getByText("Something went wrong", {exact: false})).toBeInTheDocument();
        expect(queryByText("Batman")).not.toBeInTheDocument();
    });
});