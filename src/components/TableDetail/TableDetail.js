import React from 'react'
import { Table, Divider } from 'antd'

const columns = [{
  title: 'DAY',
  dataIndex: 'day',
}, {
  title: 'AM',
  dataIndex: 'am',
}, {
  title: 'PM',
  dataIndex: 'pm',
}, {
  title: 'STATUS',
  dataIndex: 'status',
}]

const TableDetail = ({title, data}) => (
  <div>
    {console.log(title)}
    <Divider orientation="left"><h3>{title}</h3></Divider>
    <Table pagination={false} columns={columns} dataSource={data} size="small" />
  </div>
)

export default TableDetail