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
import Tabela from "../tabela";

const { Header, Sider, Content } = Layout;

export default function Body( {children} ) {
    return(
        <div>
            <Layout >
                <Sider className="style-sider-menu" >
                    <div className="logo" />
                    <Menu
                        className="style-menu"
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <HomeOutlined />,
                                label: 'Home',
                            },
                            {
                                key: '2',
                                icon: <ShopOutlined />,
                                label: 'Produtos',
                            },
                            {
                                key: '3',
                                icon: <UserOutlined/>,
                                label: 'Usuario',
                            },
                        ]}
                    />
                </Sider>
                <Layout className="site-layout-body">
                    <Header className="site-layout-header">
                        <div className='seach-container'>
                            <input className='input-search' type="text" name='search'/>
                            <button className='input-searh-button'>
                                <SearchOutlined />
                            </button>
                        </div>
                    </Header>
                    <Content className="site-layout-background" >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}