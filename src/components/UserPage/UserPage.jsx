import React, {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";
import "./UserPage.css"
import Card from "react-bootstrap/Card";
import {IndexLinkContainer} from "react-router-bootstrap";
import {paths} from "../../constants/routes";
import Button from "react-bootstrap/Button";
import {Alert} from "react-bootstrap";

const UserPage = () => {
    let user = useContext(UserContext);
    /*const [data, setData] = useState({
        name: "Krzysztof",
        surname: "Anderson",
        email: "qwe@qwe.qwe",
    });*/
    return (
        <div className="userCard">
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="ThumbnailImage">
                        <Card.Img alt="User icon" src="https://cdn4.iconfinder.com/data/icons/user-actions-14/24/user_movie_video_account_profile-512.png"/>
                    </div>

                    <div className="col-sm-9">
                        <div className="MovieCard">
                            <div className="card-body">
                                <Card.Title className="userText">
                                    {user.name}
                                </Card.Title>

                                <Card.Subtitle className="userText text-muted">
                                    {user.surname}
                                </Card.Subtitle>
                                <hr/>
                                <Card.Text className="userText">
                                    {user.email}
                                </Card.Text>


                            </div>
                        </div>
                    </div>
                </div>
                {
                    // error && <Alert variant="danger">Something went wrong while trying to delete this movie.</Alert>
                }
            </div>
        </div>
    )
};

export default UserPage;