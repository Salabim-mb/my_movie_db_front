import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";
import "./UserPage.css"
import Card from "react-bootstrap/Card";
import {IndexLinkContainer} from "react-router-bootstrap";
import {paths} from "../../constants/routes";
import Button from "react-bootstrap/Button";
import {Alert} from "react-bootstrap";

const UserPage = () => {
    let user = useContext(UserContext);
    const [getError, setGetError] = useState(false);

    useEffect(() => {
        if (user.data === undefined) {
            setGetError(true);

        }
    }, []);

    return (getError ? (
            <Alert variant="danger">Something went wrong while trying to fetch user data.</Alert>
        ) : (
            <div className="userBoxCard">
                <div className="card mb-3">
                    <div className="row no-gutters">
                        <div className="ThumbnailImage">
                            <Card.Img alt="User icon"
                                      src="https://cdn4.iconfinder.com/data/icons/user-actions-14/24/user_movie_video_account_profile-512.png"/>
                        </div>

                        <div className="Button">
                            <IndexLinkContainer to={paths.MOVIES}>
                                <Button variant="primary" size="sm">Movies</Button>
                            </IndexLinkContainer>
                        </div>
                        <div className="col-sm-9">
                            <div className="userCard">
                                <div className="card-body">
                                    <Card.Title className="userText">
                                        {user?.data?.name}
                                    </Card.Title>

                                    <Card.Subtitle className="userText text-muted">
                                        {user?.data?.surname}
                                    </Card.Subtitle>
                                    <hr/>
                                    <Card.Text className="userText">
                                        {user?.data?.email}
                                    </Card.Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
};

export default UserPage;