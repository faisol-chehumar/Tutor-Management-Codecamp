import React, { Component } from 'react'
import CreateForm from '../components/Form/CreateForm'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import actions from '../actions/index'

const { fetchStaff, fetchLocations } = actions

const schema = Yup.object().shape({
  
})

class CreateCourse extends Component {
  state = {
    title: 'Courses',
    formData: [
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
        required: false,
        type: 'SELECT',
        dataSource: this.props.locationList
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
      }, {
        title: 'Invite Teacher',
        decorator: 'tchInvitedList',
        required: false,
        type: 'LIST_TABLE',
        dataSource: this.props.staffList
          .filter(staff => {
            const x = staff.role.filter(role => {
              return role.title === 'tch'
            })
            return x.length > 0
          })
          .map(staff => ({
            key: staff.staffId,
            name: `${staff.firstname} ${staff.lastname}`,
            imagePath: staff.imagePath,
            email: staff.email,
            mandayRate: staff.role[0].mandayRate
          }))
      }, {
        title: 'Invite TA',
        decorator: 'taInvitedList',
        required: false,
        type: 'LIST_TABLE',
        dataSource: this.props.staffList
          .filter(staff => {
            const x = staff.role.filter(role => {
              return role.title === 'ta'
            })
            return x.length > 0
          })
          .map(staff => ({
            key: staff.staffId,
            name: `${staff.firstname} ${staff.lastname}`,
            imagePath: staff.imagePath,
            email: staff.email,
            mandayRate: staff.role[0].mandayRate
          }))
      }
    ]
  }

  componentDidMount() {
    if(this.props.staffList.length <= 0) {
      console.log('Fecth Staff')
      this.props.fetchStaff()
    }
    if(this.props.locationList.length <= 0) {
      console.log('Fecth Locations')
      this.props.fetchLocations()
    }
  }
  
  render() {
    const { title, formData } = this.state
    
    return (
      <CreateForm
        formTitle={title}
        formData={formData}
        postUrl={'course'}
      />
    )
  }
}

const mapStateToProps = state => ({
  staffList: state.items.staff,
  locationList: state.items.locations,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchStaff,
  fetchLocations
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCourse)