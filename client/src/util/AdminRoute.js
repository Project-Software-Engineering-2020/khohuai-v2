import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

function AdminRoute({component: Component, ...rest}) {

    //status user login
    const auth = useSelector(state => state.auth);
    return (
        <Route 
            {...rest}
            component={(props) => {
                // check login
                if(auth.status === true && auth.role ===  "admin") {
                    return <Component {...props} />
                }
                else{
                    return <Redirect to="/login" />
                }
            }}
        />
     
    )
}

export default AdminRoute;
