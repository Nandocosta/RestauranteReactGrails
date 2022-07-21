import React from 'react';

import { Redirect, Route} from 'react-router-dom'
import Auth from "../../security/Auth";
import {Button, Result} from "antd";
import Body from "../body";

const PrivateRouter = ({children, admin=false, ...rest}) => {

    const isAdmin = function () {
        const rules = Auth.getRules()
        return Array.isArray(rules) && rules.includes('ROLE_ADMIN');
    }
    const token = Auth.getToken()
    const  renderNaoAutorizado = () => (
        <Body>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
            />
        </Body>

    )
    const render = (item) =>{
        if(admin && isAdmin() || !admin){
           return item
        }
        return renderNaoAutorizado()
    }
    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    !!token
                        ? (
                            render(children)
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