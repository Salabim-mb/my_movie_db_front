import React, {useContext, useState} from "react";
import {Alert, Button, Card, Col, Form, Row} from "react-bootstrap";
import {backend} from "../../constants/backend";
import {getHeaders} from "../../utils/CORSHeaders";
import "./RegisterPage.css";
import {IndexLinkContainer} from 'react-router-bootstrap';
import {paths} from "../../constants/routes";
import {Redirect} from "react-router";
import {UserContext} from "../../context/UserContext";

const registerUser = async (data) => {
    let url = `${backend.PLAIN}register/`;
    let headers = getHeaders();

    let res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
            userName: data.name,
            userSurname: data.surname,
            userEmail: data.email,
            userPassword: data.password
        })
    });

    if (res.status === 200 || res.status === 201) {
        return await res.json();
    } else {
        throw res.status;
    }
};

const RegisterPage = () => {
    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        password_R: ""
    });
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const user = useContext(UserContext);

    const submitForm = async (e) => {
        e.preventDefault();
        setError(false);
        setValidated(true);
        if (e.currentTarget.checkValidity() === false || data.password !== data.password_R) {
            e.stopPropagation();
        } else {
            setDisabled(true);
            try {
                let {userToken, userName, userSurname, userEmail} = await registerUser(data);
                let userData = {
                    name: userName,
                    surname: userSurname,
                    email: userEmail
                };
                user.login(userToken, userData);
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

    const handlePassword = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    return (
        <Card className="card__container">
            <Card.Header className="card__header">
                <Card.Title as="h3">Sign up</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={submitForm}>
                    <Row>
                        <Col>
                            <Form.Group controlId="firstname">
                                <Form.Label>First name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="John"
                                    value={data.name}
                                    onChange={e => setData({...data, name: e.target.value})}
                                />
                                <Form.Control.Feedback type="invalid">
                                    First name must be provided
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="lastname">
                                <Form.Label>Last name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Doe"
                                    required
                                    value={data.surname}
                                    onChange={e => setData({...data, surname: e.target.value})}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Last name must be provided
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
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
                            isInvalid={data.password && data.password_R && data.password !== data.password_R}
                            placeholder="Your password"
                            name="password"
                            value={data.password}
                            onChange={handlePassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            Password must be at least 8 characters long
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="passwordR">
                        <Form.Label>Repeat password:</Form.Label>
                        <Form.Control
                            type="password"
                            required
                            minLength={8}
                            isInvalid={data.password_R && data.password && data.password !== data.password_R}
                            placeholder="Your password again"
                            name="password_R"
                            value={data.password_R}
                            onChange={handlePassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            Passwords must be equal
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="justify-content-end d-flex">
                        <Button
                            type="submit"
                            disabled={disabled}
                            variant="success"
                        >
                            {disabled ? "Loading..." : "Sign me up!"}
                        </Button>
                    </div>
                    <IndexLinkContainer to={paths.LOGIN}>
                        <Card.Link>Already have an account? Sign in!</Card.Link>
                    </IndexLinkContainer>
                    {error && <Alert variant="danger">Something went wrong while trying to register user</Alert>}
                    {correct && <Alert variant="success">Registered successfully. Redirecting...</Alert>}
                    {redirect && <Redirect to={paths.USER_PAGE}/>}
                </Form>
            </Card.Body>
        </Card>
    )
};

export default RegisterPage;