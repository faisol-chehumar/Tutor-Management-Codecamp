import React, { Component } from 'react'
import { Table } from 'antd'

import LinkDetail from './LinkDetail'

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: (text, record) => (
    <div>
      {console.log(record)}
      <LinkDetail
        linkPath = {'/staff/' + record.staffId}
        imagePath = {record.imagePath}
        imageDefault = {'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'}
        title = {`${record.firstname} ${record.lastname}`}
      />
    </div>
  )
}, {
  title: 'Email',
  dataIndex: 'email',
}, {
  title: 'Manday Rate',
  dataIndex: 'mandayRate',
  render: (text, record) => {
    
  }
}];



// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    name: record.name,
  }),
}

class ListTable extends Component {
  
  render() {
    const data = this.props.dataSource
    return (
      <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 240 }}
      />
    )
  }
}

export default ListTable