import React, { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "../pages/home";
import Login from "../pages/login";
import Cadastrar from "../pages/cadastrar";

const Private = ({ Item }) => {
    const { signed } = {signed : true};

    return signed > 0 ? <Item /> : <login />;
};

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