import React from 'react'

import {Button, Form, Input} from 'antd'
import {Link} from "react-router-dom";

import './index.css'
import {LockOutlined, UserOutlined} from "@ant-design/icons";

const Cadastrar = () => {

    return(
        <>
            <div className="div-form">
                <Form
                    layout='vertical'
                    initialValues={{
                        remember: true,
                    }}
                    onFinish
                    onFinishFailed
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
                        <Link to='/login' >Já tenho uma conta? clique aqui</Link>
                    </Form.Item>

                </Form>

            </div>


        </>
    )
}
export default Cadastrar;