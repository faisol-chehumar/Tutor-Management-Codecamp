import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { postData } from '../../utils/request'
import CreateForm from '../../components/Form/CreateForm'
import color from '../../styles/color'

class CreateLocation extends Component {
  state = {
    title: 'Customer',
    formData: [
      {
        title: 'Customer Cover',
        decorator: 'imagePath',
        type: 'IMG_UPLOAD',
      }, {
        title: 'Address Title',
        decorator: 'addressTitle',
        required: true,
        type: 'INPUT'
      }, {
        title: 'Address Detail',
        decorator: 'addressDetail',
        required: true,
        type: 'INPUT'
      }, {
        title: 'Map Address',
        decorator: 'mapValue',
        required: false,
        search: true,
        type: 'MAP_INPUT'
      }, {
        title: 'Contact',
        decorator: 'contac',
        required: false,
        type: 'INPUT'
      }, {
        title: 'Telephone',
        decorator: 'tel',
        required: false,
        type: 'INPUT'
      }, {
        title: 'Room Size',
        decorator: 'roomSize',
        required: true,
        type: 'INPUT'
      }, {
        title: 'Note',
        decorator: 'note',
        required: false,
        type: 'INPUT'
      }
    ],
    fireRedirect: false
  }

  submitHandle = async (payload) => {
    
    const result = await postData('locations', {
      ...payload,
      lat: payload.mapValue.lat,
      lng: payload.mapValue.lng
    })

    console.log({
      ...payload,
      lat: payload.mapValue.lat,
      lng: payload.mapValue.lng
    })
    
    console.log(result)
    this.setState({fireRedirect: true})
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
          <Redirect to={'/locations'}/>
        )}
      </div>
    )
  }
}

export default connect(
  null
)(CreateLocation)