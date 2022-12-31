import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute ({ children, ...props }) {
    return (
        <Route {...props}>
            { props.loggedIn ? children : <Redirect to="/" /> }
        </Route>
    );
}