import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCourses } from '../actions/coursesActions'
import { Avatar, Col, Button, Row, Divider, Table } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Moment from 'react-moment'
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
    this.props.fetchCourses()
  }
  
  render() {
    let { sortedInfo } = this.state
    let { coursesList } = this.props
    console.log(coursesList)
    
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
          imageDefault = {'https://static1.squarespace.com/static/593ff48f20099eef990d199d/59db9c3dccc5c5531166f2c2/59db9c3de5dd5b5a1b440128/1507652291838/Icon+-+Coding.png?format=300w'}
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
    console.log(this.props.coursesList)
    return (
      <div>
        <h1>COURSES BOARD</h1>
        <Row>
          <Col span={12}>
            <ButtonGroup>
              <Link to="courses/create"><Button icon="plus-circle">Add courses</Button></Link>
              <Button icon="minus-circle">Send Email</Button>
              <Button icon="minus-circle">Delete All</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Table
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
  coursesList: state.items.courses,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchCourses
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course)