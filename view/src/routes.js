import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import Index from "./components/home";

const Routes = (props) => {
    return (
        <Switch>
            <Route path="/">
                <Index />
            </Route>
        </Switch>
    )
}


export default Routes;