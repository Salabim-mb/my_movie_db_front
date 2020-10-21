import React from "react";
import MovieCard from "./components/MovieCard";
import Page from "../Page";
import {Alert, Spinner} from "react-bootstrap";
import {backend} from "../../constants/backend";

class MovieListClassComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            error: false,
            movieList: []
        }
    };

    componentDidMount() {
        const loadMovieList = async () => {
            this.setState({loading: true});
            try {
                // czekamy se na odpowiedź z GET'a, ewentualnie na throw statusu HTTP
                // (najczęściej będzie to 400 Bad Request xd)
                let res = await this.getMovies();
                // mamy odpowiedź, teraz trzeba ją zmapować, bo backend może używać innych nazw pól
                this.setState({ movieList: this.mapMovies(res) });
            } catch(e) {
                // nie wyszło z GET'em, więc można wypisać na konsolę to co rzuciliśmy w getMovies()
                // i ustawić flagę error na true
                console.log(e);
                this.setState({error: true});
            } finally {
                // niezależnie od wyniku GET'a, kończymy ładowanie
                this.setState({loading: false});
            }
        };
        // wywołujemy funkcję, co prawda jest asynchroniczna, ale można to pominąć, bo mamy oczekiwanie w środku
        loadMovieList();
    }

    mapMovies = (data) => data.map({
        //... pola do używania w movieListm o ile używane są inne niż te z odpowiedzi od backendu
    });

    getMovies = async() => {
        let url = backend.MOVIES;
        let headers = {
            "Content-Type": "application/json"
        };

        let res = await fetch(url, {
            headers,
            method: "GET"
        });

        if (res.status === 200) {
            return await res.json();
        } else {
            throw res.status;
        }


    };

    renderErrorAlert = () => {
        return <Alert variant="danger">Something went wrong while trying to get movie list.</Alert>
    };

    renderSpinner = () => {
        return <Spinner animation="border" role="status" />
    };

    render() {
        let {loading, error, movieList} = this.state;
        let {renderErrorAlert, renderSpinner} = this;

        return (
            <Page>
                {/*{ można wyszukiwarkę dopisać, czysto frontendowa }*/}
                {/*{ tutaj będzie lista, czyli zmapowana movieList, ale najpierw error i loading }*/}
                {
                    error ? renderErrorAlert() :
                        loading ? renderSpinner() :
                            movieList.map((item) => (
                                <MovieCard key={item.id} movie={item} />
                            ))
                }
            </Page>
        )
    }
};

export default MovieListClassComponent;