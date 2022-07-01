import React, {useEffect} from 'react'

import './index.css'
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Api from "../../services/Api";

function Home (){
    // const { signout } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        Api.get("produto").then(console.log).catch(console.log)
    })

    return(
        <>
            <div className="container-home">

                <Button Text="Sair">
                    Sair
                </Button>

            </div>
        </>
    )
}
export default Home;