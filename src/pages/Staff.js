import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  fetchStaff } from '../actions/staffActions'
import { Table, Divider, Tag, Button, Avatar, Slider, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ButtonGroup = styled.div`
  margin-bottom: 1.5rem;

  button {
    margin-right: 0.5rem;
  }
`

class Staff extends Component {
  state = {
    sortedInfo: null,
    mandayMin: 800,
    mandayMax: 8000
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    this.setState({
      sortedInfo: sorter
    })
  }

  componentDidMount() {
    this.props.fetchStaff()
  }
  
  render() {
    let { sortedInfo, mandayMin, mandayMax } = this.state
    let { staffList } = this.props
    
    sortedInfo = sortedInfo || {}
    
    const columns = [{
      title: 'Name',
      dataIndex: 'firstname',
      key: 'firstname',
      sorter: (a, b) => a.firstname.length - b.firstname.length,
      sortOrder: sortedInfo.columnKey === 'firstname' && sortedInfo.order,
      render: (text, record) => (
        <div>
          <Link to={'staff/' + record.staffId}>
            <Avatar style={{ marginRight: 5 }} size="large" src={record.staffImage} />
            {`${record.firstname} ${record.lastname}`}
          </Link>
        </div>
      )
    }, {
      title: 'Role',
      render: (record) => <div>{record.role.map(tag => <Tag color="blue" key={tag}>{(tag.title === 'tch' ? 'Teacher' : 'TA' )}</Tag>)}</div>
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order
    }, {
      title: 'Tel',
      dataIndex: 'tel',
    }, {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="/">Invite</a>
          <Divider type="vertical" />
          <a href="/">Edit</a>
          <Divider type="vertical" />
          <a href="/">Delete</a>
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
      <div>
        <Row>
          <Col span={12}>
            <span style={{ marginRight: 6 }}>Manday Rate: </span>
            <Slider style={{ width: '50%' }} range defaultValue={[800, 3000]} min={mandayMin} max={mandayMax} />
          </Col>
          <Col span={12}>
            <ButtonGroup>
              <Button icon="plus-circle">Add Staff</Button>
              <Button icon="minus-circle">Send Email</Button>
              <Button icon="minus-circle">Delete All</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Table
          rowKey={record => record.key}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={staffList}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  staffList: state.items.staff,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchStaff
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staff)