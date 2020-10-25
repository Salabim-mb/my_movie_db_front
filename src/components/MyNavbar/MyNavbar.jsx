import React from "react";
import {Button, Nav, Navbar} from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
// Normalnie powinno się używać ścieżek absulotnych (przyjmuje się, że folderem domowym projektu jest src)
// tzn ścieżka powinna wyglądać "constants/routes" zamiast "../..itd",
// ale nie wiem czemu to nie działa, a nie chce mi się grzebać w takich pierdołach xd
import {paths} from "../../constants/routes";
import {useLocation} from "react-router";

// Można wrzucić to w () => { return (content) }, ale poniższy zapis () => () jest równoznaczny,
// jeżeli nie chcemy pchać jakiejś wielkiej logiki, to "return" można pominąć

// przykład "klasy" funkcyjnej (nie ma własnego stanu ani logiki za bardzo, ale zależy nam na prostocie,
// bo będzie na każdej stronie i nie będzie odświeżana :)

// komponenty z wielkiej litery (te importowane wyżej) pochodzą z pakietu react-bootstrap, który ma predefiniowane style,
// a te zaimportowałem wcześniej ;)

const MyNavbar = () => {
    let location = useLocation();

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
                    </Navbar.Collapse>
                )
            }
        </Navbar>
    )
};
// ^ średnik na końcu można pominąć -- co prawda będzie podkreślone, ale nic się nie stanie. JavaScript jest super <3

export default MyNavbar;