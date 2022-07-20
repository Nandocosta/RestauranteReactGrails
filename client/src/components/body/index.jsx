import React from 'react'

import {
    HomeOutlined,
    UserOutlined,
    ShopOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

import './index.css';
import {Link} from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function Body( {children, telaSelected} ) {

    const enumSelecteds = {
        Home: "1",
        Produtos: "2",
        Usuario: "3",
    }
    return(
        <div>
            <Layout >
                <Sider className="style-sider-menu" >
                    <div className="logo" />
                    <Menu
                        className="style-menu"
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[enumSelecteds[telaSelected]]}>
                        <Menu.Item key="1" icon={<HomeOutlined/>}>
                            <Link to="/"> Home </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<ShopOutlined/>}>
                            <Link to="/produto"> Produtos </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined/>}>
                            <Link to="/usuario"> Usuario </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout-body">
                    {/*<Header className="site-layout-header">*/}
                    {/*    <div className='seach-container'>*/}
                    {/*        <input className='input-search' type="text" name='search'/>*/}
                    {/*        <button className='input-searh-button'>*/}
                    {/*            <SearchOutlined />*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</Header>*/}
                    <Content className="site-layout-background" >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}