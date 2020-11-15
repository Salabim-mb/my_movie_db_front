import React, {useContext} from "react";
import {Button, Nav, Navbar} from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
// Normalnie powinno się używać ścieżek absulotnych (przyjmuje się, że folderem domowym projektu jest src)
// tzn ścieżka powinna wyglądać "constants/routes" zamiast "../..itd",
// ale nie wiem czemu to nie działa, a nie chce mi się grzebać w takich pierdołach xd
import {paths} from "../../constants/routes";
import {useHistory} from "react-router";
import {UserContext} from "../../context/UserContext";
import {backend} from "../../constants/backend";
import {getHeaders} from "../../utils/CORSHeaders";

// Można wrzucić to w () => { return (content) }, ale poniższy zapis () => () jest równoznaczny,
// jeżeli nie chcemy pchać jakiejś wielkiej logiki, to "return" można pominąć

// przykład "klasy" funkcyjnej (nie ma własnego stanu ani logiki za bardzo, ale zależy nam na prostocie,
// bo będzie na każdej stronie i nie będzie odświeżana :)

// komponenty z wielkiej litery (te importowane wyżej) pochodzą z pakietu react-bootstrap, który ma predefiniowane style,
// a te zaimportowałem wcześniej ;)
const logoutUser = async(token) => {
    let url = `${backend.PLAIN}login/`;
    let res = await fetch(url, {
        method: "DELETE",
        headers: getHeaders(token)
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        throw res.status;
    }
};


const MyNavbar = () => {
    let user = useContext(UserContext);
    let location = useHistory();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logoutUser(user.token);
        } catch(e) {
            console.log(e);
        } finally {
            user.logout();
            location.push(paths.MAIN)
        }
    };

    return (
        <Navbar bg="dark" variant="dark">
            <IndexLinkContainer to={paths.MAIN}>
                <Nav.Link className="mr-5">
                    <Navbar.Brand>
                        MyMovieDB
                    </Navbar.Brand>
                </Nav.Link>
            </IndexLinkContainer>
            <Nav className="mr-auto">
                {/*{ "logo" apki, zamykane w IndexLinkContainer, żeby nie odświeżało po kliknięciu (ale nie jest to jedyna metoda) ;) }*/}
                <IndexLinkContainer to={paths.MOVIES}>
                    <Nav.Link>
                        Movie list
                    </Nav.Link>
                </IndexLinkContainer>
                {
                    user?.token ? (
                        <IndexLinkContainer to={paths.USER_PAGE}>
                            <Nav.Link>
                                User Page
                            </Nav.Link>
                        </IndexLinkContainer>
                    ) : (
                        <div>
                        </div>
                    )
                }
            </Nav>
            {/*{ justify-content-end to bootstrap, wrzucamy go w property className. Dzięki temu nasz komponent będzie wyrównany do prawej }*/}
            {
                location.pathname !== paths.NEW_MOVIE &&
                location.pathname !== paths.EDIT_MOVIE && (
                    <Navbar.Collapse className="justify-content-end">
                        <IndexLinkContainer to={paths.NEW_MOVIE}>
                            <Button variant="success">
                                + Add movie
                            </Button>
                        </IndexLinkContainer>
                        {
                            user?.token ? (
                                <Button variant="light" onClick={handleLogout}>
                                    Log out
                                </Button>
                            ) : (
                                <IndexLinkContainer to={paths.LOGIN}>
                                    <Button variant="light">
                                        Log in
                                    </Button>
                                </IndexLinkContainer>
                            )

                        }

                    </Navbar.Collapse>
                )
            }
        </Navbar>
    )
};
// ^ średnik na końcu można pominąć -- co prawda będzie podkreślone, ale nic się nie stanie. JavaScript jest super <3

export default MyNavbar;