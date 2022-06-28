import React from "react";

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import './index.css'
import {Link} from "react-router-dom";

const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <>
            <div className="div-form">
                <Form
                    layout='vertical'
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <br/>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Senha"
                        />
                    </Form.Item>
                    <Form.Item className="item-buttom">
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Login
                        </Button>
                        <br/>
                        <a><Link to='/cadastrar' className='cadastro'> Cadastre-se</Link></a>
                    </Form.Item>

                </Form>
            </div>
        </>

    );
};
export default Login;