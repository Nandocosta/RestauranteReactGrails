import React, {useEffect, useState} from 'react'

import Body from "../../components/body";

import Api from "../../services/Api";
import Auth from "../../security/Auth";
import {Button, Col, Form, message, Modal, notification, Row, Select} from "antd";
import Tabela from "../../components/tabela";

const { Option } = Select;

function Usuario(){

    const [usuarios, setUsuarios ] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
    const [ idUsuario, setIdUsuario] = useState(null)
    const [form] = Form.useForm()
    const labelPermissoes = {
        ROLE_ADMIN: 'administrador',
        ROLE_USER: 'usuario'
    }
    const showModalEdit = (values) => {
        form.setFieldsValue(values)
        setIsModalVisible(true)
        setIdUsuario(values.id)
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const getUsuarios = () => {
        Api
            .get("usuario", {
                headers: {
                    'Authorization': `Bearer ${Auth.getToken()}`
                }
            })
            .then((respond)=>{
                const {data: {listaDeUsuarios}} = respond
                setUsuarios(listaDeUsuarios)
            })
            .catch(console.log)
    }
    const editarUsuario = (values) => {

        const { password, confirmPassword } = values
        console.log(values)

        if(password !== confirmPassword) {

            message.error('Senhas diferentes');
        }

        Api.put(`usuario/${idUsuario}`, values,{
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        })
            .then(()=>{
                notification["success"]({
                    message: 'Usuario editado'
                })
                getUsuarios()
                setIsModalVisible(false)
            })
            .catch(()=>{
                notification["error"]({
                    message: 'Erro ao tentar editar usuario'
                });
            })
        setIdUsuario(null)
        form.resetFields()
    };

    useEffect(() => {
        getUsuarios()
    },[])

    const addUsuario = (values) => {
        const { password, confirmPassword } = values
        console.log(values)

        if(password !== confirmPassword) {

            message.error('Senhas diferentes');
        }
        Api.post("usuario", values,{
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        })
            .then(()=>{
                notification["success"]({
                    message: 'Usuario criado'
                })
                getUsuarios()
                setIsModalVisibleAdd(false)
                form.resetFields()
            })
            .catch(()=>{
                notification["error"]({
                    message: 'Erro ao tentar criar usuario'
                });
            })
    }
    const deleteUsuario = (usuarios) => {
        console.log(usuarios)
        Api.delete(`usuario/${usuarios.id}`, {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        })
            .then(()=>{
                notification["success"]({
                    message: 'Usuario deletado'
                })
                getUsuarios()
            })
            .catch(()=>{
                notification["error"]({
                    message: 'Erro ao tentar deletar usuario'
                });
            })
    }

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Permissão',
            dataIndex: '',
            key: 'permissoes',
            render: (col,_) => {
                if(col && col.permissoes){
                    return col.permissoes.map( perm => labelPermissoes[perm.nome] ).join(', ');
                }
                return '';
            },
        },
        {
            title: 'Ações',
            dataIndex: '',
            key: 'x',
            render: (_,row) => {
                return (
                    <>
                        <Button onClick={()=>deleteUsuario(row)}>Excluir</Button>
                        <Button onClick={()=>showModalEdit(row)}>Editar</Button>
                    </>
                )
            },
        },
    ];

  return (
      <>
          <Body>
              <div>Usuarios</div>
              <Row justify={'end'} style={{marginBottom:"20px"}}>
                  <Col>
                      <Button onClick={()=> setIsModalVisibleAdd(true)}>Adicionar Usuario</Button>
                  </Col>
              </Row>
              <Tabela data={usuarios} columns={columns}/>
          </Body>
          <Modal title="Editar" visible={isModalVisible} onOk={()=>form.submit()} onCancel={handleCancel} >
              <Form form={form} onFinish={editarUsuario}>
                  <Form.Item
                      name="username"
                      label="Nome"
                  >
                      <input />
                  </Form.Item>
                  <Form.Item
                      name="permissoes"
                      label="Permissão"
                  >
                      <Select mode="tags" style={{ width: '50%' }} placeholder="Permissao" >
                          {Object.keys(labelPermissoes).map((key) => {
                              return <Option key={key}>{labelPermissoes[key]}</Option>
                          })}
                      </Select>
                  </Form.Item>
                  <Form.Item
                      name="password"
                      label="Senha"
                  >
                      <input type="password"/>
                  </Form.Item>
                  <Form.Item
                      name="confirmPassword"
                      label="Confirmar Senha"
                  >
                      <input type="password" />
                  </Form.Item>
              </Form>
          </Modal>
          <Modal title="Adicionar Usuario" visible={isModalVisibleAdd} onOk={()=>form.submit()} onCancel={()=> setIsModalVisibleAdd(false)}>
              <Form form={form} onFinish={addUsuario}>
                  <Form.Item
                      name="username"
                      label="Nome"
                  >
                      <input />
                  </Form.Item>
                  <Form.Item
                      name="permissoes"
                      label="Permissão"
                  >
                      <Select mode="tags" style={{ width: '50%' }} placeholder="Tags Mode" >
                          {Object.keys(labelPermissoes).map((key) => {
                              return <Option key={key}>{labelPermissoes[key]}</Option>
                          })}
                      </Select>
                  </Form.Item>
                  <Form.Item
                      name="password"
                      label="Senha"
                  >
                      <input type="password" />
                  </Form.Item>
                  <Form.Item
                      name="confirmPassword"
                      label="Confirmar Senha"
                  >
                      <input type="password" />
                  </Form.Item>
              </Form>
          </Modal>
      </>
  )
}
export default Usuario;