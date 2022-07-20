import React, {useState} from 'react';
import {Button, Col, Form, Input, Row} from "antd";

export default function FormUser(values){
    const [username, setUserName ]= useState()
    const [permissao, setPermissao]= useState()
    const [password, setPassword ]= useState()

  return(
      <>
          <Form
              layout='vertical'
              initialValues={{
                  remember: true,
              }}
              onFinish={values}
          >

              <Row gutter={ 18 }>
                  <Col className="gutter-row" span={12} >
                      <Form.Item
                          label="Nome"
                          name="username"
                          rules={[
                              {
                                  required: true,
                                  message: 'Please input your username!',
                              },
                          ]}
                      >
                          <Input className='imput-item' onChange={ e => setUsername(e.target.value)} value={username}/>
                      </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={12} >
                      <Form.Item
                          label="Permissão"
                          name="permissao"
                          rules={[
                              {
                                  required: true,
                                  message: 'Please input your email!',
                              },
                          ]}
                      >
                          <Input  className='imput-item' />
                      </Form.Item>
                  </Col>
              </Row>
              <Row gutter={ 18 }>
                  <Col className="gutter-row" span={12}>
                      <Form.Item
                          label="Senha"
                          name="password"
                          rules={[
                              {
                                  required: true,
                                  message: 'Please input your password!',
                              },
                          ]}
                      >
                          <Input.Password  className='imput-item'/>
                      </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={12} >
                      <Form.Item
                          label="Confirmar senha"
                          name="confimarPassword"
                          rules={[
                              {
                                  required: true,
                                  message: 'Please confirm your password!',
                              },
                          ]}
                      >
                          <Input.Password  className='imput-item'/>
                      </Form.Item>
                  </Col>
              </Row>
              <Row gutter={[16, 24]}>
                  <Col className="gutter-row" span={24} >
                      <Form.Item>
                          <Button  className='Button-login'  type="primary" htmlType="submit">
                              Salvar Usuario
                          </Button>
                      </Form.Item>
                  </Col>
              </Row>
          </Form>
      </>
  )
}
