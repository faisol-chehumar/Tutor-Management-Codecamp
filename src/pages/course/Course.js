import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Button, Row, Table } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Moment from 'react-moment'

import actions from '../../actions/index'
import LinkDetail from '../../components/ListTable/LinkDetail'
import color from '../../styles/color'

const { fetchCourses, fetchStaff, fetchLocations, fetchCustomers } = actions

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
    sortedInfo: null,
    isLoad: false
  }

  async componentDidMount() {
    try {
      await Promise.all([
        this.props.staffList.length === 0 && this.props.fetchStaff(),
        this.props.coursesList.length === 0 && this.props.fetchCourses(),
        this.props.locationsList.length === 0 && this.props.fetchLocations(),
        this.props.customersList.length === 0 && this.props.fetchCustomers(),
      ])
      await this.setState({isLoad: true})
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
    console.log('Delete Course')
    // try {
    //   this.props.deleteStaff(id)
    // } catch (error) {
    //   console.error('Delete error', error)
    // }
  }
  
  render() {
    let { sortedInfo, isLoad } = this.state
    let { coursesList } = this.props
    
    sortedInfo = sortedInfo || {}
    
    const columns = [{
      title: 'Course Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
      render: (text, record) => (
        <div>
          <LinkDetail
            linkPath = {'courses/' + record.courseId}
            imagePath = {record.imagePath}
            imageDefault = {'https://res.cloudinary.com/dbzxmgk2h/image/upload/v1540543273/exam-icon.png'}
            title = {record.title}
          />
        </div>
      )
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => <div>{record.description}</div>
    }, {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (record) => <div><Moment format="YYYY/MM/DD">{record.startDate}</Moment></div>
    }, {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (record) => <div><Moment format="YYYY/MM/DD">{record.endDate}</Moment></div>
    }, {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button icon="delete" onClick={ e => this.handleDelete(record.courseId)}>Delete</Button>
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
    // console.log(this.props.coursesList)
    return (!isLoad ? <div>Loading</div> :
      <div>
        <h1>COURSES BOARD</h1>
        <Row>
          <Col span={12}>
            <ButtonGroup>
              <Link to="courses/create"><Button icon="plus-circle">Add courses</Button></Link>
              <Button icon="minus-circle">Bulk Delete</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <TableList
          rowKey={record => record.key}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={coursesList}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  staffList: state.items.staff,
  coursesList: state.items.courses,
  locationsList: state.items.locations,
  customersList: state.items.customers,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchStaff,
  fetchCourses,
  fetchLocations,
  fetchCustomers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course)