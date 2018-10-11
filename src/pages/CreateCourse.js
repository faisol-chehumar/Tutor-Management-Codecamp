import React, { Component } from 'react'
import CreateForm from '../components/Form/CreateForm'
// import { Row, Col } from 'antd'

class CreateCourse extends Component {
  state = {
    title: 'Courses'
  }
  
  render() {
    const { title } = this.state
    const formData = [
      {
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
        required: true,
        type: 'DATEPICKER'
      }
    ]
    
    return (
      <CreateForm formTitle={title} formData={formData} />
    )
  }
}

export default CreateCourse