import React, { Component } from 'react'
import CreateForm from '../components/Form/CreateForm'
import { connect } from 'react-redux'

import {  fetchStaff } from '../actions/staffActions'
// import ListTable from '../components/ListTable'
class CreateCourse extends Component {
  state = {
    title: 'Courses'
  }

  componentDidMount() {
    if(this.props.staffList.length <= 0) {
      console.log('Fecth Staff')
      this.props.fetchStaff()
    }
  }
  
  render() {
    const { title } = this.state
    const formData = [
      {
        title: 'Course Cover',
        decorator: 'imgPath',
        type: 'IMG_UPLOAD'
      }, {
        title: 'Course title',
        decorator: 'courseTitle',
        required: true,
        type: 'INPUT'
      }, {
        title: 'Course Description',
        decorator: 'courseDescription',
        required: false,
        type: 'TEXT_AREA'
      }, {
        title: 'Class Locations',
        decorator: 'classLocations',
        required: true,
        type: 'CASCADER'
      }, {
        title: 'Start/End Date',
        decorator: 'startEndDate',
        required: false,
        type: 'DATEPICKER'
      }, {
        title: 'Course Schedule',
        decorator: 'courseSchedule',
        required: false,
        type: 'DAYTIME_SELECT'
      }, 
      {
        title: 'Invite Teacher',
        decorator: 'teacherList',
        required: false,
        type: 'LIST_TABLE',
        dataSource: this.props.staffList.filter(staff => {
          const x = staff.role.filter(role => {
            // console.log(role.title)
            return role.title === 'tch'
          })
          return x.length > 0
        })
      },
      {
        title: 'Invite TA',
        decorator: 'taList',
        required: false,
        type: 'LIST_TABLE',
        dataSource: this.props.staffList.filter(staff => {
          const x = staff.role.filter(role => {
            // console.log(role.title)
            return role.title === 'ta'
          })
          return x.length > 0
        })
      }
    ]
    
    return (
      <CreateForm formTitle={title} formData={formData} />
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
)(CreateCourse)