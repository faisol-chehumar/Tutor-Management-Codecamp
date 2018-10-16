import React, { Component } from 'react'
import CreateForm from '../components/Form/CreateForm'
import { connect } from 'react-redux'

import actions from '../actions/index'

const { fetchStaff, fetchLocations } = actions

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
    const { locationList } =this.props

    // const classLocations = [{
    //   value: '1',
    //   label: 'BB Coworking'
    // }, {
    //   value: '2',
    //   label: 'Jiangsu',
    // }]

    const classLocations = locationList.map(location => ({
      value: location.locationId,
      label: location.addressTitle
    }))
    
    return (
      <CreateForm
        formTitle={title}
        formData={formData}
        locationsData={classLocations}
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