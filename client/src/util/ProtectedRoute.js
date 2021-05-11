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
                if(auth.authenticated === true) {
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


// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       authenticated === true ? <Redirect to="/" /> : <Component {...props} />
//     }
//   />
// );

// const mapStateToProps = (state) => ({
//   authenticated: state.user.authenticated
// });

// AuthRoute.propTypes = {
//   user: PropTypes.object
// };

// export default connect(mapStateToProps)(AuthRoute);
