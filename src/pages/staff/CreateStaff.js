import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { postData } from '../../utils/request'
import CreateForm from '../../components/Form/CreateForm'
import color from '../../styles/color'

class CreateStaff extends Component {
  state = {
    title: 'Staff',
    formData: [
      {
        title: 'Staff Picture',
        decorator: 'imagePath',
        type: 'IMG_UPLOAD',
        col: 24
      }, {
        title: 'First Name',
        decorator: 'firstname',
        required: true,
        type: 'INPUT',
        col: 12
      }, {
        title: 'Last Name',
        decorator: 'lastname',
        required: true,
        type: 'INPUT',
        col: 12
      }, {
        title: 'Email',
        decorator: 'email',
        required: true,
        type: 'INPUT',
        col: 12
      },{
        title: 'Telephone',
        decorator: 'tel',
        required: false,
        type: 'INPUT',
        col: 12
      }, {
        title: 'Role Setting',
        decorator: 'roleSetting',
        required: false,
        type: 'ROLE_SELECT',
        col: 12
      }, {
        title: 'Address Title',
        decorator: 'addressTitle',
        required: true,
        type: 'INPUT',
        col: 24
      }, {
        title: 'Map Address',
        decorator: 'mapValue',
        required: false,
        search: true,
        type: 'MAP_INPUT',
        col: 24
      }, {
        title: 'Available Day&Times',
        decorator: 'availableTime',
        required: true,
        type: 'DAYTIME_SELECT',
        col: 24
      }
    ],
    fireRedirect: false
  }

  submitHandle = async (payload) => {
    try {
      await postData('staff', {
        ...payload,
        lat: payload.mapValue.lat,
        lng: payload.mapValue.lng,
      })

      this.setState({fireRedirect: true})      
    } catch (error) {
      console.error(error)
    }
  }
  
  render() {
    const { title, formData, fireRedirect } = this.state

    return (
      <div style={{ backgroundColor: color.white, border: `1px solid ${color.shadow}`, padding: '2rem' }}>
        <CreateForm
          formTitle={title}
          formData={formData}
          formSubmit={(payload) => {
            this.submitHandle(payload)
          }}
        />
        {fireRedirect && (
          <Redirect to={'/staff'}/>
        )}
      </div>
    )
  }
}

export default connect(
  null
)(CreateStaff)