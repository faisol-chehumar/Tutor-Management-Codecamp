import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {  fetchLocations } from '../../actions/locationsActions'
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

class Location extends Component {
  state = {
    sortedInfo: null
  }

  async componentDidMount() {
    try {
      this.props.locationList.length === 0 && await this.props.fetchLocations() 
    } catch (error) {
      console.error('Fetch error', error)
    }
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    this.setState({
      sortedInfo: sorter
    })
  }


  handleDelete = (id) => {
    console.log('Delete location')
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
          <LinkDetail
            linkPath = {'locations/' + record.locationId}
            imagePath = {record.imagePath}
            imageDefault = {'https://res.cloudinary.com/dbzxmgk2h/image/upload/v1540543818/001-building.png'}
            title = {`${record.addressTitle} ${record.addressTitle}`}
          />
        </div>
      )
    }, {
      title: 'Contact',
      dataIndex: 'contact'
    }, {
      title: 'Tel',
      dataIndex: 'tel',
    }, {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button icon="delete" onClick={ e => this.handleDelete(record.locationId)}>Delete</Button>
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
        <h1>LOCATIONS BOARD</h1>
        <Row>
          <Col span={12}>
            <ButtonGroup>
            <Link to="locations/create"><Button icon="plus-circle">Add Location</Button></Link>
              <Button icon="minus-circle">Bulk Delete</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <TableList
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