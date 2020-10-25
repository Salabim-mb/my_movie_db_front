import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import './MovieCard.css';
import {paths} from "../../../constants/routes";
import {IndexLinkContainer} from "react-router-bootstrap";
import {backend} from "../../../constants/backend";
import {Alert} from "react-bootstrap";



const removeMovie = async (id) => {

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    };

    const url = backend.MOVIES + id + "/";

    let res = await fetch(url , {
        headers,
        method: "DELETE"

    });

    if (res.status === 200) { // OK
        return await res.json(); // return await oznacza, że body naszej odpowiedzi będzie zparsowane
    } else {
        throw res.status; // jeżeli status nie jest ok to go łapiemy w bloku try/catch metody loadMovieList()
    }

};

const MovieCard = ({movie, setlist}) => {

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);
    const handleRemoveMovie = async (event) => {
        setDisabled(true);
        event.preventDefault();
        try {
            await removeMovie(movie.id);
            setlist(movie.id);
        } catch(e) {
            console.log(e);
            setError(true);
        } finally {
            setDisabled(false);
        }
    };

    return (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="ThumbnailImage">
                    <Card.Img alt="Movie image" src={movie.movieImage}/>
                </div>
                <div className="Button">
                    <IndexLinkContainer to={paths.NEW_MOVIE+"/"+movie.id}>
                        <Button variant="warning" size="sm">Edit</Button>
                    </IndexLinkContainer>
                    <div className="ButtonRemove" onClick={handleRemoveMovie}>
                        <Button variant="danger" size="sm" disabled={disabled}>Remove</Button>
                    </div>
                </div>

                <div className="col-sm-9">
                    <div className="MovieCard">
                        <div className="card-body">
                            <Card.Title>
                                {movie.movieName}
                            </Card.Title>

                            <Card.Subtitle className="mb-2 text-muted">
                                {movie.movieDirector}
                            </Card.Subtitle>
                            <p className="card-text"><small className="text-muted">{movie.movieGenre}</small></p>
                            <Card.Text>
                                {(new Date(movie.movieReleaseDate)).getFullYear()}
                            </Card.Text>
                            <hr/>
                            <p className="card-text">{movie.movieDescription} </p>
                        </div>
                    </div>
                </div>
            </div>
            {
                error && <Alert variant="danger">Something went wrong while trying to delete this movie.</Alert>
            }
        </div>
    )
};


export default MovieCard;