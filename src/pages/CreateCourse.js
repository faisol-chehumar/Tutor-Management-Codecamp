import React, { Component } from 'react'
import CreateForm from '../components/Form/CreateForm'

class CreateCourse extends Component {
  state = {
    title: 'Courses'
  }
  
  render() {
    const { title } = this.state
    const dataScouces = {
      title
    }
    
    return (
      <CreateForm formData={dataScouces} />
    )
  }
}

export default CreateCourse