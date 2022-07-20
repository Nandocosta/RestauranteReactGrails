import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from "../pages/home";
import Login from "../pages/login";
import Produto from "../pages/produto";
import Usuario from "../pages/usuario";
import PrivateRouter from "../components/privateRouter";

export default function RoutesApp(){
    return (
       <Router>
           <Switch>
               <Route exact path="/login" component={Login} />
               <PrivateRouter exact path="/">
                   <Home/>
               </PrivateRouter>
               <PrivateRouter exact path="/produto" >
                   <Produto/>
               </PrivateRouter>
               <Router exact path="/usuario" component={Usuario}/>
           </Switch>
       </Router>
    )
}
