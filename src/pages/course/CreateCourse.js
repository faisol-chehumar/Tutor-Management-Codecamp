import React, { Component } from 'react'
import CreateForm from '../../components/Form/CreateForm'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import actions from '../../actions/index'
import { postData } from '../../utils/request'
import sendEmail from '../../utils/email'
import color from '../../styles/color'

const { fetchStaff, fetchLocations, fetchCustomers } = actions

class CreateCourse extends Component {
  state = {
    title: 'Courses',
    hasData: this.props.staffList.length > 0 
      && this.props.locationList.length > 0
      && this.props.customerList.length > 0
      && true,
    formData: [
      {
        title: 'Course Cover',
        decorator: 'imagePath',
        type: 'IMG_UPLOAD',
      }, {
        title: 'Course title',
        decorator: 'title',
        required: true,
        type: 'INPUT',
      }, {
        title: 'Course Description',
        decorator: 'description',
        required: false,
        type: 'TEXT_AREA',
      }, {
        title: 'Class Locations',
        decorator: 'locationId',
        required: true,
        type: 'SELECT',
        dataSource: this.props.locationList
      }, {
        title: 'Start/End Date',
        decorator: 'startEndDate',
        required: true,
        type: 'DATEPICKER'
      }, {
        title: 'Course Schedule',
        decorator: 'schedule',
        required: false,
        type: 'DAYTIME_SELECT'
      }, {
        title: 'Invite Teacher',
        decorator: 'tchInvitedList',
        required: false,
        type: 'LIST_TABLE',
        dataSource: this.props.staffList.length > 0 ? this.props.staffList
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
          })) : null
      }, {
        title: 'Invite TA',
        decorator: 'taInvitedList',
        required: false,
        type: 'LIST_TABLE',
        dataSource: this.props.staffList.length > 0 ? this.props.staffList
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
        })) : null
      }, {
        title: 'Customer Enroll',
        decorator: 'customerEnroll',
        required: false,
        type: 'LIST_TABLE',
        dataSource: this.props.customerList.length ? this.props.customerList
          .map(customer => ({
            key: customer.customerId,
            name: `${customer.firstname} ${customer.lastname}`,
            imagePath: customer.imagePath,
            email: customer.email
          })) : null
      }
    ],
    fireRedirect: false
  }

  async componentDidMount() {
  }

  submitHandle = async (payload) => {
    await postData('courses', {
      ...payload,
      startDate: payload.startEndDate[0].format('YYYY-MM-DD').toString(),
      endDate: payload.startEndDate[1].format('YYYY-MM-DD').toString()
    })

    this.setState({fireRedirect: true})

    payload.tchInvitedList.forEach(tch => sendEmail({
      name: tch.name,
      email: tch.email,
      courseTitle: payload.title,
      imagePath: payload.imagePath
    }))

    payload.taInvitedList.forEach(tch => sendEmail({
      name: tch.name,
      email: tch.email,
      courseTitle: payload.title,
      imagePath: payload.imagePath
    }))
  }
  
  render() {
    const { title, formData, fireRedirect, hasData } = this.state
    console.log(hasData)
    console.log(this.props.staffList)
    return (
      !hasData ? (<Redirect to={'/courses'}/>) :
      <div style={{ backgroundColor: color.white, border: `1px solid ${color.shadow}`, padding: '2rem' }}>
        <CreateForm
          formTitle={title}
          formData={formData}
          formSubmit={(payload) => {
            this.submitHandle(payload)
          }}
        />
        {fireRedirect && (
          <Redirect to={'/courses'}/>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  staffList: state.items.staff,
  locationList: state.items.locations,
  customerList: state.items.customers,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchStaff,
  fetchLocations,
  fetchCustomers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCourse)

