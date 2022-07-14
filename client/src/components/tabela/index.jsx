import { Table } from 'antd';
import React from 'react';

export default function Tabela ({columns, data, onChange}) {

    return(
        <Table columns={columns} dataSource={data} onChange={onChange} />
    )
}