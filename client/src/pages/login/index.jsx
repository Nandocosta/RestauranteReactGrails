import React, {useContext, useState} from "react";

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import './index.css'
import {Link} from "react-router-dom";
import Api from "../../services/Api";
import Auth from "../../security/Auth"


const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    // const {login } = useContext (AuthContext);

    const onFinish = (values) => {
        // console.log('Received values of form: ', values)
        const {username, password } = values

        Api.post("login", {username, password} ).then( response => {
            const { data } = response
            Auth.setAuth(data)
            window.location.assign('/')
        })
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
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            onChange={ e => setUsername(e.target.value)} value={username}
                        />
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
                            onChange={ e => setPassword(e.target.value)} value={password}
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