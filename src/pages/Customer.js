import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCustomers } from '../actions/customersActions'
import { Col, Button, Row, Divider, Table } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LinkDetail from '../components/ListTable/LinkDetail'

const ButtonGroup = styled.div`
  margin-bottom: 1.5rem;

  button {
    margin-right: 0.5rem;
  }
`


class Course extends Component {
  state = {
    sortedInfo: null
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    this.setState({
      sortedInfo: sorter
    })
  }

  componentDidMount() {
    this.props.fetchCustomers()
  }
  
  render() {
    let { sortedInfo } = this.state
    let { customersList } = this.props
    console.log(customersList)
    
    sortedInfo = sortedInfo || {}
    
    const columns = [{
      title: 'Course Title',
      dataIndex: 'firstname',
      key: 'firstname',
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
      render: (text, record) => (
        <div>
            <LinkDetail
            linkPath = {'customers/' + record.customerId}
            imagePath = {record.imagePath}
            imageDefault = {'https://png2.kisspng.com/20180404/wpw/kisspng-computer-icons-users-group-internet-forum-user-avatar-5ac45a994caa27.692612531522817689314.png'}
            title = {`${record.firstname} ${record.lastname}`}
            />
        </div>
      )
    }, {
      title: 'Actived Status',
      dataIndex: 'activedStatus',
      key: 'activedStatus',
      render: (text, record) => <div>{record.activedStatus === 1 ? 'YES' : 'NO'}</div>
    }, {
      title: 'Child Age',
      dataIndex: 'childAge',
      key: 'childAge',
      render: (text, record) => <div>{record.childAge}</div>
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => <div>{record.email}</div>
    }, {
      title: 'Tel',
      dataIndex: 'tel',
      key: 'tel',
      render: (text, record) => <div>{record.tel}</div>
    }, {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="" onClick={ e => console.log('Make send email feature!')}>Send Email</a>
          <Divider type="vertical" />
          <a href="" onClick={ e => console.log('Make edit feature!')}>Edit</a>
          <Divider type="vertical" />
          <a href="" onClick={ e => console.log('Make delete feature!')}>Delete</a>
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
    console.log(this.props.customersList)
    return (
      <div>
        <h1>CUSTOMERS BOARD</h1>
        <Row>
          <Col span={12}>
            <ButtonGroup>
              <Link to="customers/create"><Button icon="plus-circle">Add customers</Button></Link>
              <Button icon="minus-circle">Send Email</Button>
              <Button icon="minus-circle">Delete All</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Table
          rowKey={record => record.key}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={customersList}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  customersList: state.items.customers,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchCustomers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course)