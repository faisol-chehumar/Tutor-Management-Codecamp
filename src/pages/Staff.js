import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStaffBegin, fetchStaff } from '../actions/staffActions'
import { Table, Divider, Tag } from 'antd'
import { Link } from 'react-router-dom'

class Staff extends Component {
  componentDidMount() {
    this.props.fetchStaff()
  }
  
  render() {
    const { staffList } = this.props
    console.log(staffList)
    const columns = [{
      title: 'Name',
      dataIndex: 'firstname',
      render: (text, record) => <Link to={'staff/' + record.staffId}>{`${record.firstname} ${record.lastname}`}</Link>
    }, {
      title: 'Role',
      render: (record) => <div>{record.role.map(tag => <Tag color="blue" key={tag}>{(tag.title === 'tch' ? 'Teacher' : 'TA' )}</Tag>)}</div>
    }, {
      title: 'Email',
      dataIndex: 'email',
    }, {
      title: 'Tel',
      dataIndex: 'tel',
    }, {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Edit</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      )
    }]

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      })
    }

    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={staffList} />
    )
  }
}

const mapStateToProps = state => ({
  staffList: state.items.staff,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchStaffBegin,
  fetchStaff
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staff)