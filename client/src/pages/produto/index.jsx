import React from 'react'
import Tabela from "../../components/tabela";
import {Table} from "antd";

const Produto = () => {

    const data = [
        {
            "id": 39,
            "preco": 5.0,
            "nome": "Coxinha"
        },
        {
            "id": 44,
            "preco": 26.0,
            "nome": "Arroz"
        }
    ]

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
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <a>Delete</a>,
        },
    ];

    return(
        <>
            <Tabela data={data} columns={columns}/>

        </>
    )

}
export default Produto