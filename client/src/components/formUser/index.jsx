// import React from 'react';
// import {Button, Col, Form, Input, Row, Select} from "antd";
// import {Option} from "antd/es/mentions";
//
// export default function FormUser({onFinish}){
//     // const [username, setUserName ]= useState()
//     // const [permissao, setPermissao]= useState()
//     // const [password, setPassword ]= useState()
//
//
//     const handleChange = (value) => {
//         console.log(`selected ${value}`);
//     };
//
//   return(
//       <>
//           <Form
//               layout='vertical'
//               initialValues={{
//                   remember: true,
//               }}
//               onFinish={onFinish}
//           >
//
//               <Row gutter={ 18 }>
//                   <Col className="gutter-row" span={12} >
//                       <Form.Item
//                           label="Nome"
//                           name="username"
//                           rules={[
//                               {
//                                   required: true,
//                                   message: 'Please input your username!',
//                               },
//                           ]}
//                       >
//                           <Input className='imput-item' />
//                       </Form.Item>
//                   </Col>
//                   <Col className="gutter-row" span={12} >
//                       <Form.Item
//                           label="Permissão"
//                           name="permissao"
//                           rules={[
//                               {
//                                   required: true,
//                                   message: 'Please input your email!',
//                               },
//                           ]}
//                       >
//                           <Select
//                               mode="tags"
//                               style={{
//                                   width: '100%',
//                               }}
//                               placeholder="Tags Mode"
//                               onChange={handleChange}
//                           >
//                               <Option >Administrador</Option>
//                               <Option >Usuario</Option>
//                           </Select>
//                       </Form.Item>
//                   </Col>
//               </Row>
//               <Row gutter={ 18 }>
//                   <Col className="gutter-row" span={12}>
//                       <Form.Item
//                           label="Senha"
//                           name="password"
//                           rules={[
//                               {
//                                   required: true,
//                                   message: 'Please input your password!',
//                               },
//                           ]}
//                       >
//                           <Input.Password  className='imput-item'/>
//                       </Form.Item>
//                   </Col>
//                   <Col className="gutter-row" span={12} >
//                       <Form.Item
//                           label="Confirmar senha"
//                           name="confimarPassword"
//                           rules={[
//                               {
//                                   required: true,
//                                   message: 'Please confirm your password!',
//                               },
//                           ]}
//                       >
//                           <Input.Password  className='imput-item'/>
//                       </Form.Item>
//                   </Col>
//               </Row>
//               <Row gutter={[16, 24]}>
//                   <Col className="gutter-row" span={24} >
//                       <Form.Item>
//                           <Button  className='Button-login'  type="primary" htmlType="submit">
//                               Salvar Usuario
//                           </Button>
//                       </Form.Item>
//                   </Col>
//               </Row>
//           </Form>
//       </>
//   )
// }
