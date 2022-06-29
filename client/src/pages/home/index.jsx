import React from 'react'

import './index.css'
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Home (){
    const { signout } = useAuth();
    const navigate = useNavigate();

    return(
        <>
            <div className="container-home">

                <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
                    Sair
                </Button>

            </div>
        </>
    )
}
export default Home;