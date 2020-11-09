import React, {useState} from "react";
import {Alert, Button, Card, Col, Form, Row} from "react-bootstrap";
import {backend} from "../../constants/backend";
import {getHeaders} from "../../utils/CORSHeaders";
import "./LoginPage.css";
import {IndexLinkContainer} from 'react-router-bootstrap';
import {paths} from "../../constants/routes";
import {Redirect} from "react-router";

const loginUser = async (data) => {
    let url = `${backend.LOGIN}`;
    let headers = getHeaders();

    let res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    });

    if (res.status === 200 || res.status === 201) {
        return await res.json();
    } else {
        throw res.status;
    }
};

const LoginPage = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setError(false);
        setValidated(true);
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
        } else {
            setDisabled(true);
            try {
                let {token} = await loginUser(data);
                // need to create context
                setCorrect(true);
                setTimeout(() => setRedirect(true), 3000);
            } catch(e) {
                console.log(e);
                setError(true);
            } finally {
                setDisabled(false);
            }
        }
    }

    return (
        <Card className="card__container">
            <Card.Header className="card__header">
                <Card.Title as="h3">Sign in</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={submitForm}>
                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            required
                            placeholder="johndoe@example.com"
                            value={data.email}
                            onChange={e => setData({...data, email: e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Correct email must be provided
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            minLength={8}
                            required
                            placeholder="Your password"
                            name="password"
                            value={data.password}
                            onChange={e => setData({...data, password: e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Correct password must be provided
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="justify-content-end d-flex">
                        <Button
                            type="submit"
                            disabled={disabled}
                            variant="success"
                        >
                            {disabled ? "Loading..." : "Log in!"}
                        </Button>
                    </div>
                    <IndexLinkContainer to={paths.REGISTER}>
                        <Card.Link>Do not have an account? Sign up!</Card.Link>
                    </IndexLinkContainer>
                    {error && <Alert variant="danger">Something went wrong while trying to login user</Alert>}
                    {correct && <Alert variant="success">Registered successfully. Redirecting...</Alert>}
                    {redirect && <Redirect to={paths.MAIN}/>}
                </Form>
            </Card.Body>
        </Card>
    )
};

export default LoginPage;