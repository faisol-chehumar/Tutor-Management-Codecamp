import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  fetchLocations } from '../actions/locationsActions'
import { Table, Divider, Button, Avatar, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ButtonGroup = styled.div`
  margin-bottom: 1.5rem;

  button {
    margin-right: 0.5rem;
  }
`

class Location extends Component {
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
    this.props.fetchLocations()
  }
  
  render() {
    let { sortedInfo } = this.state
    let { locationList } = this.props
    
    sortedInfo = sortedInfo || {}
    
    const columns = [{
      title: 'Address Name',
      dataIndex: 'addressTitle',
      key: 'addressTitle',
      sorter: (a, b) =>  {a = a.addressTitle || ''
      b = b.addressTitle || ''
      return a.localeCompare(b)},
      sortOrder: sortedInfo.columnKey === 'addressTitle' && sortedInfo.order,
      render: (text, record) => (
        <div>
          <Link to={'locations/' + record.locationId}>
            <Avatar style={{ marginRight: 5 }} size="large" src={record.imagePath} />
            {`${record.addressTitle} ${record.addressTitle}`}
          </Link>
        </div>
      )
    }, {
      title: 'Contract',
      dataIndex: 'contract'
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
            <ButtonGroup>
              <Button icon="plus-circle">Add Location</Button>
              <Button icon="minus-circle">Send Email</Button>
              <Button icon="minus-circle">Delete All</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Table
          rowKey={record => record.key}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={locationList}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locationList: state.items.locations,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchLocations
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)