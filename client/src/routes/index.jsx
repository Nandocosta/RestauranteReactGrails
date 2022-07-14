import React, { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "../pages/home";
import Login from "../pages/login";
import Cadastrar from "../pages/cadastrar";
import Auth from "../security/Auth";
import Produto from "../pages/produto";


const Private = ({ Item }) => {
    const token = Auth.getToken()
    return token ? <Item /> : <login />;
};

const RoutesApp = () => {
    return (
       <BrowserRouter>
           <Fragment>
               <Routes>
                   <Route exact path="/home" element={<Private Item={Home} />} />
                   <Route path="/login" element={<Login />} />
                   <Route exact path="/cadastrar" element={<Cadastrar />} />
                   <Route exact path="/produto" element={<Produto />} />
                   {/*<Route path="*" element={<Login />} />*/}
               </Routes>
           </Fragment>
       </BrowserRouter>
    )
}
export default RoutesApp;