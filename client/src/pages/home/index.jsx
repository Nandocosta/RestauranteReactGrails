import React, {useEffect, useState} from 'react';

import Api from "../../services/Api";
import Auth from "../../security/Auth";
import Body from "../../components/body";
import Tabela from "../../components/tabela";

function Home () {

    const [ produtos, setProdutos ] = useState([])

    useEffect(() => {
        Api
            .get("produto", {
                headers: {
                    'Authorization': `Bearer ${Auth.getToken()}`
                }
            })
            .then((respond)=>{
                const { data:{ listaDeProdutos } } = respond
                setProdutos(listaDeProdutos)
            })
            .catch(console.log)

    })
    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Preço',
            dataIndex: 'preco',
            key: 'preco',
        },
    ];

    return (
        <>
            <Body>
                <Tabela data={produtos} columns={columns}/>
            </Body>
        </>
    );
}
export default Home;