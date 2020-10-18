import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import './MovieCard.css';

const MovieCard = ({movie}) => (
    /*
        <Card style={{ width: '' }}>
            <Card.Img variant="left" src="https://fwcdn.pl/fpo/63/51/236351/7198307.6.jpg" />
            <Card.Body>
                <Card.Title>{movie.movieName}</Card.Title>
                <Card.Text>
                    {movie.movieDirector}
                </Card.Text>
                <Card.Body>
                    {movie.movieGenre}
                </Card.Body>
            </Card.Body>
        </Card>*/
    <div className="card mb-3">
        <div className="row no-gutters">
            <div className="col-md-3">
                <Card.Img src="https://fwcdn.pl/fpo/63/51/236351/7198307.6.jpg"/> {/*{movie.movieImage}*/}
            </div>
            <div className="col-sm-8">
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
                            {movie.movieReleaseYear}
                        </Card.Text>
                        <hr/>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer. </p> {/*{movie.movieDescription}*/}
                    </div>
                </div>
            </div>
        </div>
    </div>

);

export default MovieCard;