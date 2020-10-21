import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import './MovieCard.css';
import {paths} from "../../../constants/routes";
import {IndexLinkContainer} from "react-router-bootstrap";

const MovieCard = ({movie}) => (
    <div className="card mb-3">
        <div className="row no-gutters">
            <div className="ThumbnailImage">
                <Card.Img src={movie.movieImage}/> {/*{movie.movieImage}*/}
            </div>
            <div className="Button">
                <IndexLinkContainer to={paths.NEW_MOVIE+"/"+movie.id}>
                    <Button variant="warning" size="sm">Edit</Button>
                </IndexLinkContainer>
                <div className="ButtonRemove">
                    <Button variant="danger" size="sm">Remove</Button>
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
                            {movie.movieReleaseYear}
                        </Card.Text>
                        <hr/>
                        <p className="card-text">{movie.movieDescription} </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

);


export default MovieCard;