import React from 'react';

import { Redirect, Route} from 'react-router-dom'
import Auth from "../../security/Auth";

const PrivateRouter = ({children, ...rest}) => {

    const token = Auth.getToken()

    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    !!token
                        ? (
                            children
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: location }
                                }}
                            />
                        ))
            }
        />
    );
}

export default PrivateRouter;