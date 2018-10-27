import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Button, Row, Table } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { fetchCustomers } from '../../actions/customersActions'
import LinkDetail from '../../components/ListTable/LinkDetail'
import color from '../../styles/color'

const ButtonGroup = styled.div`
  margin-bottom: 1.5rem;

  button {
    margin-right: 0.5rem;
  }
`

const TableList = styled(Table)`
  background-color: ${color.white}
  border: 1px solid ${color.shadow}

  // .ant-table-thead > tr > th {
  //   background-color: ${color.gray} !important
  // }

  .ant-pagination {
    margin-right: 1rem !important
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

  async componentDidMount() {
    try {
      this.props.customersList.length === 0 && await this.props.fetchCustomers()
    } catch (error) {
      console.error('Fetch error', error)
    }
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
            imageDefault = {'https://res.cloudinary.com/dbzxmgk2h/image/upload/v1540544187/003-worker-1.png'}
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
        <TableList
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