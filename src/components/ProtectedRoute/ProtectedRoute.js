import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute ({ component: Component, ...props }) {
    return (
        <Route {...props}>
            {() =>
                props.loggedIn ? <Component key={props.path} {...props} /> : <Redirect to="/" />
            }
        </Route>
    );
}