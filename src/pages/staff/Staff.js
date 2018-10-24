import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStaff } from '../../actions/staffActions'
import { Table, Divider, Tag, Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import LinkDetail from '../../components/ListTable/LinkDetail'

const ButtonGroup = styled.div`
  margin-bottom: 1.5rem;

  button {
    margin-right: 0.5rem;
  }
`

class Staff extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  async componentDidMount() {
    this.props.staffList.length === 0 && await this.props.fetchStaff()
  }
  
  render() {
    let { sortedInfo, filteredInfo  } = this.state
    let { staffList } = this.props
    
    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}
    
    const columns = [{
      title: 'Name',
      dataIndex: 'firstname',
      key: 'firstname',
      sorter: (a, b) =>  {
        a = a.firstname || ''
        b = b.firstname || ''
        return a.localeCompare(b)
      },
      sortOrder: sortedInfo.columnKey === 'firstname' && sortedInfo.order,
      render: (text, record) => (
        <div>
          <LinkDetail
            linkPath = {'staff/' + record.staffId}
            imagePath = {record.imagePath}
            imageDefault = {'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'}
            title = {`${record.firstname} ${record.lastname}`}
          />
        </div>
      )
    }, {
      title: 'Role',
      filters: [
        { text: 'Teacher', value: 'tch' },
        { text: 'TA', value: 'ta' },
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record) => record.role[0].title.includes(value) || record.role[1].title.includes(value),
      render: (record) => (
        <div>
          {
            record.role.map(tag => (
              <Tag color="blue" key={tag.title}>{(tag.title === 'tch' ? 'Teacher' : 'TA' )}</Tag>)
            )
          }
        </div>
      )
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) =>  {
        a = a.firstname || ''
        b = b.firstname || ''
        return a.localeCompare(b)},
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order
    }, {
      title: 'Tel',
      dataIndex: 'tel',
    }, {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <span>
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
    // console.log(this.props.staffList)
    return (
      <div>
        <h1>STAFF BOARD</h1>
        <Row>
          <Col span={12}>
            <ButtonGroup>
              <Link to="staff/create"><Button icon="plus-circle">Add Staff</Button></Link>
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