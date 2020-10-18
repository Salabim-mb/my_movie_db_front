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
                    {console.log(location.id)}
                    <Form.Control
                        value={data.name}
                        onChange={(e) => setData({...data, name: e.target.value})}
                        name={data.name}
                        required
                        placeholder="Enter name"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide movie title
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Add movie</Button>
            </Form>
        </Card>
    )
};

export default MovieForm;