import React from "react";
import MovieCard from "./MovieCard";
import {fireEvent, render, waitForElement} from '@testing-library/react';
import {MemoryRouter} from "react-router";
import {createMemoryHistory} from 'history';
import MyNavbar from "../../MyNavbar";
import {paths} from "../../../constants/routes";
import {Router} from "react-router-dom";
import {backend} from "../../../constants/backend";


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

describe("MovieCard", () => {
    let apiFail;
    let res;
    let data;
    let setList;

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

        apiFail = false;
        setList = jest.fn();
        res = [
            {
                id: 1,
                title: "Titanic"
            }, {
                id: 2,
                title: "Batman"
            }
        ];
        data =
            {
                id: 3,
                movieName: "KOD NIEŚMIERTELNOŚCI",
                movieDirector: "Duncan Jones",
                movieGenre: "Thriller / Sci-Fi",
                movieReleaseDate: "2011-03-11T00:00:00.605Z",
                movieImage: "someImageInBase64",
                movieDescription: "Kapitan Colter Stevens budzi się, nie pamiętając niczego. Wkrótce odkrywa, że bierze udział w misji, której celem jest złapanie terrorysty podkładającego bomby na terenie Chicago."
            };

    });

    it("should match snapshot", () => {
        const {container} = render(
            <MemoryRouter>
                <MovieCard movie={data} setlist={setList}/>
            </MemoryRouter>

        );

        expect(container).toMatchSnapshot();
    });

    it("should show correct data", () => {
        const {getByText, getByAltText} = render(
            <MemoryRouter>
                <MovieCard movie={data} setlist={setList}/>
            </MemoryRouter>
        );

        expect(getByText("KOD NIEŚMIERTELNOŚCI")).toBeInTheDocument();
        expect(getByText("Duncan Jones")).toBeInTheDocument();
        expect(getByText("Thriller / Sci-Fi")).toBeInTheDocument();
        expect(getByText("2011")).toBeInTheDocument();
        expect(getByText("Thriller / Sci-Fi")).toBeInTheDocument();
        expect(getByAltText("Movie image")).toBeInTheDocument();
        expect(getByText("budzi się, nie pamiętając niczego.", {exact:false})).toBeInTheDocument();


    });

    it("should not called setlist", () => {
        const {} = render(
            <MemoryRouter>
                <MovieCard movie={data} setlist={setList}/>
            </MemoryRouter>
        );
        expect(setList).toHaveBeenCalledTimes(0);
    });

    it("should redirect to edit form", () => {
        const {history, getByText} = renderWithRouter(
                <MovieCard movie={data} setlist={setList}/>
        );

        fireEvent.click( getByText("Edit") );
        expect(history.location.pathname).toBe(paths.NEW_MOVIE+"/" + data.id, {exact: false});
    });

    it("should redirect to edit form", () => {
        const {history, getByText} = renderWithRouter(
            <MovieCard movie={data} setlist={setList}/>
        );

        fireEvent.click( getByText("Edit") );
        expect(history.location.pathname).toBe(paths.NEW_MOVIE+"/" + data.id, {exact: false});
    });

    it("should not find movie", () => {
        const {getByText} = render(
            <MemoryRouter>
                <MovieCard movie={data} setlist={setList}/>
            </MemoryRouter>
        );
        let url = backend.MOVIES + data.id + "/";
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        };
        fireEvent.click( getByText("Remove") );
        expect(fetch).toHaveBeenCalledWith(url, {headers, "method": "DELETE"});
    });

    it("should render error alert on api fail", async () => {
        apiFail = true;
        const {getByText} = render(
            <MemoryRouter>
                <MovieCard movie={data} setlist={setList} />
            </MemoryRouter>
        );

        fireEvent.click(getByText("Remove"));
        await waitForElement(() => getByText("Something went wrong", {exact: false}));
        expect(getByText("Something went wrong", {exact: false})).toBeInTheDocument();
    });

});