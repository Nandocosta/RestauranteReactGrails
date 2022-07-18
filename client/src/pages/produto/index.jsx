import React, {useEffect, useState} from 'react'

import "./index.css"

import Body from "../../components/body";
import Tabela from "../../components/tabela";
import Api from "../../services/Api";
import Auth from "../../security/Auth";
import {Button, Col, notification, Row} from "antd";

const Produto = () => {

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
    },[])

    const deleteProduto = (produto) => {
        console.log(produto)
      Api.delete(`produto/${produto.id}`, {
              headers: {
                  'Authorization': `Bearer ${Auth.getToken()}`
              }
          })
          .then(()=>{
              notification["success"]({
                  message: 'Produto deletado'
              });
          })
          .catch(()=>{
              notification["error"]({
                  message: 'Erro ao tentar deletar produto'
              });
          })
    }

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
            render: (_,row) => {
                return (
                    <>
                        <Button onClick={()=>deleteProduto(row)} >Excluir</Button>
                        <Button >Editar</Button>
                    </>
                )
            },
        },
    ];

    return(
        <>
            <Body>
                <Row justify={'end'} style={{marginBottom:"20px"}}>
                    <Col>
                        <Button >Adcionar Produto</Button>
                    </Col>
                </Row>
                <Tabela data={produtos} columns={columns} />
            </Body>
        </>
    )

}
export default Produto