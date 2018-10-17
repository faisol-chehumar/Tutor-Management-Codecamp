import React, { Component } from 'react'
import { Table } from 'antd'

import LinkDetail from './LinkDetail' 

// rowSelection object indicates the need for row selection


class ListTable extends Component {
  
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.props.listTableHandle(selectedRows.map(row => ({
          id: row.key,
          name: row.name,
          email: row.email
        })))
      },
      getCheckboxProps: record => ({
        name: record.name,
      })
    }

    const data = this.props.dataSource

    return (
      data.length > 0 ?
      <Table
          size="small"
          rowSelection={rowSelection}
          columns={Object.keys(data[0]).filter(key => key !== 'key' && key !== 'imagePath').map((key, index) => {
            return index === 0 ? {
                title: key.toUpperCase(),
                dataIndex: key,
                render: (text, record) => (
                  <LinkDetail
                    linkPath = {'/staff/' + record.key}
                    imagePath = {record.imagePath}
                    imageDefault = {'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'}
                    title = {record.name}
                  />
                )
              } : { title: key.toUpperCase(), dataIndex: key }
          })}
          dataSource={data}
          pagination={{ pageSize: 10 }}
      /> : <div>Loading</div>
    )
  }
}

export default ListTable