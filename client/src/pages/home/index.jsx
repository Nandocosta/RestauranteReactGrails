import React from 'react'

import './index.css'
import {Button} from "antd";

function Home (){

    return(
        <>
            <div className="container-home">
                <Button Text="Sair" onClick="">
                    Sair
                </Button>
            </div>
        </>
    )
}
export default Home;