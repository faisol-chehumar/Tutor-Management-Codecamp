import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { postData } from '../../utils/request'
import CreateForm from '../../components/Form/CreateForm'

class CreateStaff extends Component {
  state = {
    title: 'Staff',
    formData: [
      {
        title: 'Staff Cover',
        decorator: 'imagePath',
        type: 'IMG_UPLOAD'
      }, {
        title: 'First Name',
        decorator: 'firstname',
        required: true,
        type: 'INPUT'
      }, {
        title: 'Last Name',
        decorator: 'lastname',
        required: true,
        type: 'INPUT'
      }, {
        title: 'Email',
        decorator: 'email',
        required: true,
        type: 'INPUT'
      }, {
        title: 'Role Setting',
        decorator: 'roleSetting',
        required: false,
        type: 'ROLE_SELECT'
      }, {
        title: 'Address Title',
        decorator: 'addressTitle',
        required: true,
        type: 'INPUT'
      }, {
        title: 'Map Address',
        decorator: 'mapValue',
        required: false,
        type: 'MAP_INPUT'
      }, {
        title: 'Available Times',
        decorator: 'availableTime',
        required: true,
        type: 'DAYTIME_SELECT'
      }
    ],
    fireRedirect: false
  }

  submitHandle = async (payload) => {
    await postData('staff', {
      ...payload,
      lat: payload.mapValue.lat,
      lng: payload.mapValue.lng,
    })

    this.setState({fireRedirect: true})
  }
  
  render() {
    const { title, formData, fireRedirect } = this.state

    return (
      <div>
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