import React from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { postData } from '../utils/request'
import { Form, Row, Col } from 'antd'
import TextInput from '../components/Form/TextInput'
// import InputFeedback from '../components/Form/InputFeedback'
// import Label from '../components/Form/Label'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import classNames from 'classnames'
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    contact: Yup.string()
      .min(10, "C'mon, your contact is longer than that")
      .required('Contact is required.'),
    note: Yup.string(),
    roomSize: Yup.number()
      .required('roomSize is required!'),
    tel: Yup.string()
      .required('Telephone number is required!')
  }),
  handleSubmit: (payload, { setSubmitting, props }) => {
    const { imagePath } = props.user
    const { push } = props.history
    console.log(payload)

    postData('locations', { ...payload, imagePath })
    .then(
      push('/locations')
    )
    setSubmitting(false)
  },
  displayName: 'MyForm',
})


const MyForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting
  } = props

  return (
    <Row>
      <Col span={16}>
        <Form onSubmit={ handleSubmit }>
          <TextInput
            id="tel"
            type="text"
            label="Tel"
            placeholder="08XXXXXXXX"
            error={touched.tel && errors.tel}
            value={values.tel}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextInput
            id="contact"
            type="text"
            label="Contact"
            placeholder="John Doe"
            error={touched.contact && errors.contact}
            value={values.contact}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextInput
            id="roomSize"
            type="text"
            label="Room size"
            placeholder="Enter number of people"
            error={touched.roomSize && errors.roomSize}
            value={values.roomSize}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          
          <TextInput
            id="note"
            type="note"
            label="Note"
            placeholder="Enter your note"
            error={touched.note && errors.note}
            value={values.note}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            type="button"
            className="outline"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </button>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      </Col>
    </Row>
  )
}

const MyEnhancedForm = withRouter(formikEnhancer(MyForm))

const CreateLocation = (props) => (
  <div className="create-staff">
    {console.log(props)}
    <h1>Create New Location</h1>
    <MyEnhancedForm user={{ 
      contact: '',
      note: '',
      tel: '',
      roomSize: ''
       }} />
  </div>
)

export default connect(
)(CreateLocation)
