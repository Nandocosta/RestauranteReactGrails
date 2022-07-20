import React, {useEffect, useState} from 'react';

import "./index.css"

import Body from "../../components/body";
import Tabela from "../../components/tabela";
import Api from "../../services/Api";
import Auth from "../../security/Auth";
import {Button, Col, Form, Modal, notification, Row} from "antd";


const Produto = () => {

    const [ produtos, setProdutos ] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
    const [form] = Form.useForm()
    const showModalEdit = (values) => {
        form.setFieldsValue(values)
        setIsModalVisible(true)
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getProdutos = () => {
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
    }

    const adicionarProduto = (values) => {
        Api.post("produto", values,{
                headers: {
                    'Authorization': `Bearer ${Auth.getToken()}`
                }
            })
            .then(()=>{
                notification["success"]({
                    message: 'Produto Adicionado'
                })
                getProdutos()
                setIsModalVisibleAdd(false)
            })
            .catch()
    };
    const editarProduto = (values) => {
        Api.put(`produto/${values.id}`, values,{
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        })
            .then(()=>{
                notification["success"]({
                    message: 'Produto editado'
                })
                getProdutos()
                setIsModalVisibleAdd(false)
            })
            .catch(()=>{
                    notification["error"]({
                        message: 'Erro ao tentar editar produto'
                    });
                })
    };


    useEffect(() => {
        getProdutos()
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
            title: 'Ações',
            dataIndex: '',
            key: 'x',
            render: (_,row) => {
                return (
                    <>
                        <Button onClick={()=>deleteProduto(row)}>Excluir</Button>
                        <Button onClick={()=>showModalEdit(row)}>Editar</Button>
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
                        <Button onClick={()=> setIsModalVisibleAdd(true)} >Adicionar Produto</Button>
                    </Col>
                </Row>
                <Tabela data={produtos} columns={columns} />
            </Body>
            <Modal title="Editar" visible={isModalVisible} onOk={()=>form.submit()} onCancel={handleCancel}>
                <Form form={form} onFinish={editarProduto} >
                    <Form.Item
                        name="nome"
                        label="Nome"
                    >
                        <input />
                    </Form.Item>
                    <Form.Item
                        name="preco"
                        label="Preço"
                    >
                        <input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Adicionar Produto" visible={isModalVisibleAdd} onOk={()=>form.submit()} onCancel={()=> isModalVisibleAdd(false)}>
                <Form form={form} onFinish={adicionarProduto}>
                    <Form.Item
                        name="nome"
                        label="Nome"
                    >
                        <input />
                    </Form.Item>
                    <Form.Item
                        name="preco"
                        label="Preço"
                    >
                        <input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )

}
export default Produto