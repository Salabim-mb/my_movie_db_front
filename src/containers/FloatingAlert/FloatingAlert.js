import React, { useContext } from "react";
import {AlertContext} from "../../context/AlertContext";
import {Alert} from "react-bootstrap";
import "./FloatingAlert.css";

const FloatingAlert = () => {
    const context = useContext(AlertContext);

    return context.open && (
        <div className="alertMsg--scale">
            <div className="alertMsg">
                <Alert
                    className="alertMsg__alert"
                    variant={context.variant}
                    onClick={() => context.changeVisibility(false)}
                    dismissible
                >
                    {context.message}
                </Alert>
            </div>
        </div>
    )
};

export default FloatingAlert;