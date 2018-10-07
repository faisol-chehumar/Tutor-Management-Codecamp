import React from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import classnames from 'classnames'
import { postData } from '../utils/request'

// firstname: Joi.string().required(),
// lastname: Joi.string().required(),
// email: Joi.string().email().required(),
// tel: Joi.string(),
// addressTitle: Joi.string(),
// address: Joi.string(),
// lat: Joi.number().required(),
// lng: Joi.number().Required(),
// markerType: Joi.string(),
// roleId: Joi.number().min(1).max(2).required(),
// mandayRate: Joi.required(),
// imagePath: Joi.required()

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    firstname: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('First name is required.'),
    lastname: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('Last name is required.'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    tel: Yup.string()
      .required('Telephone number is required!'),

  }),

  mapPropsToValues: ({ user }) => ({
    ...user,
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    console.log(payload)
    postData('staff', payload)
    setSubmitting(false)
  },
  displayName: 'MyForm',
})

const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null

const Label = ({ error, className, children, ...props }) => {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  )
}

const TextInput = ({ type, id, label, error, value, onChange, className, ...props }) => {
  const classes = classnames(
    'input-group',
    {
      'animated shake error': !!error,
    },
    className
  )
  return (
    <div className={classes}>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  )
}
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
    isSubmitting,
  } = props
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="firstname"
        type="text"
        label="First Name"
        placeholder="John"
        error={touched.firstname && errors.firstname}
        value={values.firstname}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="lastname"
        type="text"
        label="Last Name"
        placeholder="Doe"
        error={touched.lastname && errors.lastname}
        value={values.lastname}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        error={touched.email && errors.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="tel"
        type="tel"
        label="Tel"
        placeholder="Enter your tel"
        error={touched.tel && errors.tel}
        value={values.tel}
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
    </form>
  )
}

const MyEnhancedForm = formikEnhancer(MyForm)



const CreateStaff = () => (
  <div className="create-staff">
    <h1>Create New Staff</h1>

    <MyEnhancedForm user={{ email: '', firstname: '', lastname: '', tel: '' }} />
  </div>
)

export default CreateStaff
