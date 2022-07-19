import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from "../pages/home";
import Login from "../pages/login";
import Cadastrar from "../pages/cadastrar";
import Produto from "../pages/produto";
import PrivateRouter from "../components/privateRouter";


const RoutesApp = () => {
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
           </Switch>
       </Router>
    )
}
export default RoutesApp;