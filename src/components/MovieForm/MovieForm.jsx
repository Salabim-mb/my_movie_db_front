import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Page from "../Page";
import {fileToBase64} from "../../utils/FileToBase64";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./MovieForm.css";
import {backend} from "../../constants/backend";
import {getHeaders} from "../../utils/CORSHeaders";

const sendMovie = async (method, data, id) => {
    let baseUrl = backend.MOVIES;
    if (method === "PUT") {
        baseUrl += `${id}/`;
    }
    const headers = getHeaders();
    let res = await fetch(baseUrl, {
        method: method,
        headers,
        body: JSON.stringify(data)
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        throw res.status;
    }
};

const getMovieDetails = async (id) => {
    let baseUrl = backend.MOVIES + id + "/";
    const headers = getHeaders();

    let res = await fetch(baseUrl, {
        method: "GET",
        headers
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        throw res.status;
    }
};

const mapResponseData = (source) => ({
    name: source.movieName,
    genre: source.movieGenre,
    director: source.movieDirector,
    description: source.movieDescription,
    releaseYear: new Date( source.movieReleaseYear ),
    image: source?.movieImage || null
});

const MovieForm = () => {
    const [data, setData] = useState({
        name: "",
        director: "",
        genre: "",
        releaseYear: undefined,
        image: null,
        description: ""
    });
    const [photoLabel, setPhotoLabel] = useState(null);
    const [method, setMethod] = useState("POST");
    const [loading, setLoading] = useState(false);
    const [photoError, setPhotoError] = useState(false);
    const [error, setError] = useState(false);
    const [getError, setGetError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [resCorrect, setResCorrect] = useState(false);
    const [disabled, setDisabled] = useState(false);

    let fileInput = React.createRef();

    const location = useParams();

    useEffect(() => {
        const loadMovie = async () => {
            setLoading(true);
            try {
                let res = await getMovieDetails(location.id);
                setData(mapResponseData(res));
                setMethod("PUT");
            } catch(e) {
                console.log(e);
                setGetError(true);
            } finally {
                setLoading(false);
            }
        };
        if (location?.id) {
            loadMovie();
        }
    }, [location.id]);

    const prepareData = () => ({
        movieTitle: data.title,
        movieDirector: data.director,
        movieGenre: data.genre,
        movieReleaseYear: data.releaseYear.toISOString(),
        movieDescription: data.description,
        movieImage: data.image
    });

    const handleSubmit = async (event) => {
        setError(false);
        setDisabled(true);
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setValidated(true);
            try {
                prepareData();
                await sendMovie(method, data, location?.id);
                setResCorrect(true);
            } catch(e) {
                console.log(e);
                setError(true);
            }
        }
        setDisabled(false);
    };

    const onPhotoChange = async () => {
        setPhotoError(false);
        const file = fileInput.current?.files?.[0];
        try {
            let b64 = await fileToBase64(file);
            setData({...data, image: b64});
            setPhotoLabel(file.name);
        } catch(e) {
            setPhotoError(true);
        }
        fileInput = null;
    };

    return (
        <Page>
            {
                loading ? (
                <div className="spinner">
                    <Spinner animation="border" role="status" />
                </div>
                ) : getError ? (
                    <Alert variant="danger">Something went wrong while trying to get movie data.</Alert>
                ) : (
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Movie title</Form.Label>
                            <Form.Control
                                value={data.name}
                                onChange={(e) => setData({...data, name: e.target.value})}
                                name="name"
                                required
                                placeholder="Interstellar"
                                type="text"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide movie title
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Director</Form.Label>
                            <Form.Control
                                value={data.director}
                                onChange={(e) => setData({...data, director: e.target.value})}
                                name="director"
                                required
                                placeholder="Christopher Nolan"
                                type="text"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide movie director
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                value={data.genre}
                                onChange={(e) => setData({...data, genre: e.target.value})}
                                name="genre"
                                required
                                placeholder="Sci-Fi"
                                type="text"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide genre
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="relY">Year of release</Form.Label>
                            <DatePicker
                                id="relY"
                                className="form-control"
                                placeholderText="2014"
                                dateFormat="yyyy"
                                selected={data.releaseYear}
                                onChange={(e) => setData({...data, releaseYear: e})}
                                showYearPicker
                                required
                                minDate={(new Date()).setFullYear(1900)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a release year
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={data.description}
                                onChange={(e) => setData({...data, description: e.target.value})}
                                name="description"
                                required
                                placeholder="Very cool movie!"
                                as="textarea"
                                rows={3}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a short description
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Movie poster</Form.Label>
                            <Form.File
                                className="text-nowrap text-truncate"
                                ref={fileInput}
                                custom
                                onChange={onPhotoChange}
                                label={photoLabel || method === "POST" ? "Choose photo..." : "Previous photo"}
                                accept="image/*"
                                data-browse="Add poster"
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="success"
                            disabled={disabled}
                        >
                            {disabled ? "Loading..." : method === "POST" ? "Add movie" : "Update movie"}
                        </Button>
                        {photoError && <Alert variant="danger">Photo could not be uploaded. Please try again.</Alert>}
                        {resCorrect && <Alert variant="success">Movie added successfully.</Alert>}
                        {error && <Alert variant="danger">Something went wrong while adding your movie.</Alert>}
                    </Form>
                )
            }
        </Page>
    )
};

export default MovieForm;