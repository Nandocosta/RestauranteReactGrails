import React from 'react'

import {Button, Form, Input, message, Select} from 'antd'
import {Link} from "react-router-dom";

import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Api from "../../services/Api";
import {Option} from "antd/es/mentions";

const Cadastrar = () => {


    const onFinish = (values) => {

        const {username, password, confimarPassword} = values

        if(password !== confimarPassword) {
            message.error('Senhas diferentes');
        } else {
            Api.post('usuario',{username, password},{
                'Content-Type': 'application/json'
            })
                .then(() =>{
                    window.location = "/login"
                })
                .catch(e =>{console.log("falha no Cadastro")})
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <>
            <div className="div-form">
                <Form
                    layout='vertical'
                    initialValues={{
                        remember: true,
                    }}
                    onFinish = {onFinish}
                    onFinishFailed = {onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            className='imput-item'
                            placeholder="Usuario"
                        />
                    </Form.Item>
                    <br/>
                    <Form.Item
                        name="Permissao"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select defaultValue="Option2-1">
                            <Option value="Option2-1">Usuario</Option>
                            <Option value="Option2-2">Administrador</Option>
                        </Select>

                    </Form.Item>
                    <br/>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            className='imput-item'
                            placeholder="Senha"
                        />
                    </Form.Item>
                    <br/>
                    <Form.Item
                        name="confimarPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            className='imput-item'
                            placeholder="Confirmar senha"
                        />
                    </Form.Item>
                    <Form.Item className="item-buttom">
                        <Button  className='Button-login'  type="primary" htmlType="submit">
                            Registrar
                        </Button><br/>
                        <Link to='/' >J?? tenho uma conta? clique aqui</Link>
                    </Form.Item>

                </Form>

            </div>


        </>
    )
}
export default Cadastrar;