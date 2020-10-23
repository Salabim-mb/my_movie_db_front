import React, {useEffect, useState} from "react";
import Page from "../Page";
import MovieCard from "./components/MovieCard";
import {Alert, Spinner} from "react-bootstrap";
import {backend} from "../../constants/backend";

const getMovies = async () => {
    // jeszcze nie wiemy jakie będą headery do zapytania, ale piszę na czuja
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json", // będziemy wysyłać dane jsonem
    };
    // zmienna domain jest zła, tu normalnie będzie url, ale trzymamy go w pliku .env
    // o .env nie chce mi się pisać za bardzo, wytłuamczę na żywo że to są
    // zmienne środowiskowe
    const url = backend.MOVIES;
    // bez await dostaniemy Promise, czyli obietnicę że to zostanie wypełnione
    // nie chcemy działać na promisach, więc dajemy await żeby poczekać aż promise zostanie
    // rozwiązany, po czym działamy na pierwszej "warstwie" odpowiedzi, czyli
    // metadanych (status HTTP itd) oraz body jako kolejny promise
    let res = await fetch(url, {
        headers,
        method: "GET"
        // do GETa nie potrzeba body, ale przy innych metodach czasami tak. W związku z tym wrzucamy wtedy
        // body: JSON.stringify( obiekt_przekazany_jako_argument )
        // powyższa metoda zamienia obiekt na jsona
    });

    if (res.status === 200) { // OK
        return await res.json(); // return await oznacza, że body naszej odpowiedzi będzie zparsowane
    } else {
        throw res.status; // jeżeli status nie jest ok to go łapiemy w bloku try/catch metody loadMovieList()
    }
};

const MovieList = () => {
   /*
       poniżej pokazany jest sposób zapisu stanu komponenetu funkcyjnego, taka składnia zastępuje konstruktor
       komponent klasowy (taki sam) umieszczę w MovieListClassComponent.jsx
       loading, error - boolean (stan początkowy false)
       movieList - lista, dlatego mamy useState([])
    */
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        // napisanie wewnętrznej metody pozwoli na użycie asynchroniczności
        // loadMovieList jest naszym wrapperem do fetcha
        const loadMovieList = async () => {
            setLoading(true);
            try {
                // czekamy se na odpowiedź z GET'a, ewentualnie na throw statusu HTTP
                // (najczęściej będzie to 400 Bad Request xd)
                let res = await getMovies();
                // mamy odpowiedź, teraz trzeba ją zmapować, bo backend może używać innych nazw pól

                setMovieList( res );

            } catch(e) {
                // nie wyszło z GET'em, więc można wypisać na konsolę to co rzuciliśmy w getMovies()
                // i ustawić flagę error na true
                console.log(e);
                setError(true);
            } finally {
                // niezależnie od wyniku GET'a, kończymy ładowanie
                setLoading(false);
            }
        };
        // wywołujemy funkcję, co prawda jest asynchroniczna, ale można to pominąć, bo mamy oczekiwanie w środku
        loadMovieList();
    }, []);

    // metoda na pokazanie alertu kiedy ustawi się error = true
    const renderErrorAlert = () => {
        return <Alert variant="danger">Something went wrong while trying to get movie list.</Alert>
    };

    // metoda na pokazanie spinnera ładowania kiedy loading = true
    const renderSpinner = () => {
        return <Spinner animation="border" role="status" />
    };

    const refreshMovieList = (id) => {
        let movies = movieList.filter(item => item.id !== id);
        setMovieList(movies)
    }

    return (
        <Page>
            {/*{ można wyszukiwarkę dopisać, czysto frontendowa }*/}
            {/*{ tutaj będzie lista, czyli zmapowana movieList, ale najpierw error i loading }*/}
            {
                error ? renderErrorAlert() :
                loading ? renderSpinner() :
                movieList.map((item) => (
                    <MovieCard key={item?.id} movie={item} setlist={refreshMovieList}/>
                ))
            }
        </Page>
    )
};

export default MovieList;