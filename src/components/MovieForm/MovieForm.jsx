import React, {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {useParams} from "react-router-dom";

const MovieForm = () => {
    const [data, setData] = useState({
        name: "",
        director: "",
        genre: "",
        releaseYear: "",
        image: null,
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);

    const photo = React.createRef();

    const location = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setValidated(true);
        }
    };

    return (
        <Card>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="name">
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
                <Form.Group controlId="name">
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
                <Form.Group controlId="name">
                    <Form.Label>Year of release</Form.Label>
                    <Form.Control
                        value={data.releaseYear}
                        onChange={(e) => setData({...data, releaseYear: e.target.value})}
                        name="releaseYear"
                        required
                        placeholder="2048"
                        type="date"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a release year
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={data.description}
                        onChange={(e) => setData({...data, description: e.target.value})}
                        name="description"
                        required
                        placeholder="Very cool movie"
                        type="textarea"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a short description
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="poster">
                    <Form.Label>Movie poster</Form.Label>
                    <Form.File
                        accept="image/*"
                        ref={photo}
                    />
                </Form.Group>
                <Button type="submit" variant="success">Add movie</Button>
            </Form>
        </Card>
    )
};

export default MovieForm;