import React from 'react';
import { Table } from 'antd';

export default function Tabela ({columns, data, onChange}) {

    return(
        <Table columns={columns} dataSource={data} onChange={onChange} />
    )
}