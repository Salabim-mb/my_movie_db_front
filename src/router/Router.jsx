import React from 'react';
import routes from "../constants/routes"
import {Route, Switch, useLocation} from "react-router";

const Router = (props) => {
    // nazwa = (props) => {...}, argumentów używamy props.arg1, props.arg2 itd
    // nazwa = ({arg1, arg2}) => {...}, argumentów używamy arg1, arg2 itd

    // useLocation korzysta z window.location
    const location = useLocation();

    return (
        // poniżej arrow function, zamiast tego można by napisać function() {...}, ale to czasami psuje odniesienie z this, więc ja np nie lubię xd
        () => {
            return (
                <Switch location={location} key={location.pathname}>
                    {routes.map(
                        ({component: Component, path, ...rest}) => {
                            return (
                                <Route path={path} key={path} {...rest}>
                                    <Component {...props} {...rest} />
                                </Route>
                            );
                        }
                    )}
                </Switch>
            );
        }
    )
};

export default Router;