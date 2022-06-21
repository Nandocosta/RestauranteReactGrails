import React, { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "../pages/home";
import Login from "../pages/login/Login";
import Cadastrar from "../pages/cadastrar";
import useAuth from "../hooks/useAuth";

const Private = ({ Item }) => {
    const {signed} = useAuth();

    return signed > 0 ? <Item /> : <signed/>;
}

const RoutesApp = () => {
    return (
       <BrowserRouter>
           <Fragment>
               <Routes>
                   <Route exact path="/home" element={<Private Item={Home} />} />
                   <Route path="/" element={<Login />} />
                   <Route exact path="/cadastrar" element={<Cadastrar />} />
                   <Route path="*" element={<Login />} />
               </Routes>
           </Fragment>
       </BrowserRouter>
    )
}
export default RoutesApp;