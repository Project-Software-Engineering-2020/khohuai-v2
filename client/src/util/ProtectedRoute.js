import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProtectedRoute({component: Component, ...rest}) {

    //status user login
    const auth = useSelector(state => state.auth);
    return (
        <Route 
            {...rest}
            component={(props) => {
                // check login
                if(auth.status === true && (auth.role === "user" || "admin")) {
                    return <Component {...props} />
                }
                else{
                    return <Redirect to="/login" />
                }
            }}
        />
     
    )
}

export default ProtectedRoute
