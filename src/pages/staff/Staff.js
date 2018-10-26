import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Tag, Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { fetchStaff, deleteStaff } from '../../actions/staffActions'
import LinkDetail from '../../components/ListTable/LinkDetail'
import color from '../../styles/color'

const ButtonGroup = styled.div`
  margin-bottom: 1.5rem;

  button {
    margin-right: 0.5rem;
  }
`

const TableList = styled(Table)`
  background-color: ${color.white};
  border: 1px solid ${color.shadow};

  // .ant-table-thead > tr > th {
  //   background-color: ${color.gray} !important;
  // }

  .ant-pagination {
    margin-right: 1rem !important;
  }
`

class Staff extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    rowSelection: [],
    searchTxt: ''
  }

  async componentDidMount() {
    try {
      this.props.staffList.length === 0 && await this.props.fetchStaff() 
    } catch (error) {
      console.error('Fetch error', error)
    }
  }

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  handleDelete = (id) => {
    try {
      this.props.deleteStaff(id)
    } catch (error) {
      console.error('Delete error', error)
    }
  }

  bulkDelete = () => {
    console.log(this.state.rowSelection)
    this.state.rowSelection.forEach(row => this.handleDelete(row.staffId))
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
            imageDefault = {'https://res.cloudinary.com/dbzxmgk2h/image/upload/v1540528677/002-worker-3.png'}
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
        <div>{ record.role.map(tag => (
          <Tag color="blue" key={tag.title}>{(tag.title === 'tch' ? 'Teacher' : 'TA' )}</Tag>)
        )}</div>
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
          <Button icon="delete" onClick={ e => this.handleDelete(record.staffId)}>Delete</Button>
        </span>
      )
    }]

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({rowSelection: selectedRows})
      },
      getCheckboxProps: record => ({
        name: record.name,
      })
    }

    return (
      <div>
        <h1>STAFF BOARD</h1>
        <Row>
          <Col span={12}>
            <ButtonGroup>
              <Link to="staff/create"><Button icon="plus-circle">Add Staff</Button></Link>
              <Button icon="minus-circle" onClick={e => this.bulkDelete()}>Bulk Delete</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <TableList
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
  fetchStaff,
  deleteStaff
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staff)