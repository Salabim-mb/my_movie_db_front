import React from 'react';
import routes, {paths} from "../constants/routes"
import {Redirect, Route, Switch, useLocation} from "react-router";
import {UserContext} from "../context/UserContext";

const Router = (props) => {
    // nazwa = (props) => {...}, argumentów używamy props.arg1, props.arg2 itd
    // nazwa = ({arg1, arg2}) => {...}, argumentów używamy arg1, arg2 itd

    // useLocation korzysta z window.location
    const location = useLocation();

    return (
        <UserContext.Consumer>
            {(value) => (
                <Switch location={location} key={location.pathname}>
                    {routes.map(
                        ({
                             component: Component,
                             path,
                             requiresLogin,
                             ...rest
                         }) => {
                            return !requiresLogin || (requiresLogin && value?.token) ? (
                                <Route path={path} key={path} {...rest}>
                                    <Component {...props} {...rest} />
                                </Route>
                            ) : (
                                <Redirect to={paths.MAIN} />
                            );
                        }
                    )}
                </Switch>
            )}
        </UserContext.Consumer>
    )
};

export default Router;