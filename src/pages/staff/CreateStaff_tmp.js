import React from 'react'
import { withFormik, Field } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import { postData } from '../../utils/request'
import { Form, Input, Row, Col } from 'antd'
import UploadImageForm from '../../components/UploadImage/UploadImage'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

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
    role: Yup.number()
      .required('Please select role'),
    // mandayRate: Yup.number()
    //   .required('Please type your Manday Rate')
  }),

  mapPropsToValues: ({ user, history }) => ({
    ...user,
    ...history
  }),

  handleSubmit: (payload, { setSubmitting, props }) => {
    const { imagePath } = props.user
    const { push } = props.history
    console.log(payload)

    postData('staff', { ...payload, imagePath })
    .then(
      push('/staff')
    )
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
  const classes = classNames(
    'input-group',
    {
      'animated shake error': !!error,
    },
    className
  )
  return (
    <FormItem className={classes} {...formItemLayout}>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <Input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </FormItem>
  )
}

const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames('radio-button')}
        {...props}
      />
      <label htmlFor={id}>
        {label}
      </label>
      {touched[name] &&
        <InputFeedback error={errors[name]} />
      }
    </div>
  )
}

// Checkbox group
class CheckboxGroup extends React.Component {

  handleChange = (event) => {
    const target = event.currentTarget;
    let valueArray = this.props.value || []

    if (target.checked) {
      valueArray.push(target.id)
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1)
    }

    this.props.onChange(this.props.id, valueArray);
  }

  handleBlur = () => {
    // take care of touched
    this.props.onBlur(this.props.id, true);
  }

  render() {
    const {
      value,
      error,
      touched,
      label,
      className,
      children
    } = this.props;

    const classes = classNames(
      'input-field',
      {
        'is-success': value || (!error && touched), // handle prefilled or user-filled
        'is-error': !!error && touched
      },
      className
    );

    return (
      <div className={classes}>
        <fieldset>
          <legend>{label}</legend>
          {(React.Children.map(children, child => {
            return React.cloneElement(child, {
              field: {
                // value: value.includes(child.props.id),
                onChange: this.handleChange,
                onBlur: this.handleBlur
              }
            })
          }))}
          {touched &&
            <InputFeedback error={error} />
          }
        </fieldset>
      </div>
    );
  }
};

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames('radio-button')}
        {...props}
      />
      <label htmlFor={id}>
        {label}
      </label>
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
    setFieldValue,
    setFieldTouched
  } = props

  return (
    <Row>
      {/* {console.log(setFieldValue)} */}
      <Col span={16}>
        <Form onSubmit={ handleSubmit }>
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

          <div>
            <h3>Staff Role</h3>
            <fieldset>
              <Field
                component={RadioButton}
                name="role"
                id="1"
                label="Teacher"
              />
              <Field
                component={RadioButton}
                name="role"
                id="2"
                label="TA"
              />
              <Field
                component={RadioButton}
                name="role"
                id="3"
                label="Both"
              />
              <TextInput
                id="mandayRate"
                type="text"
                label="mandayRate"
                placeholder="Enter your mandayRate"
                error={touched.mandayRate && errors.mandayRate}
                value={values.mandayRate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </fieldset>
          </div>

          <div>
            <h3>Available Time</h3>
            {/* {console.log(values.checkboxGroup)} */}
            <CheckboxGroup
              id="checkboxGroup"
              // label="Select staff available time"
              value={values.checkboxGroup}
              error={errors.checkboxGroup}
              touched={touched.checkboxGroup}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            >
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="1"
              label="Mon - AM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="2"
              label="Mon - PM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="3"
              label="Tue - AM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="4"
              label="Tue - PM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="5"
              label="Wed - AM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="6"
              label="Wed - PM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="7"
              label="Thu - AM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="8"
              label="Thu - PM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="9"
              label="Fri - AM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="10"
              label="Fri - PM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="11"
              label="Sat - AM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="12"
              label="Sat - PM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="13"
              label="Sun - AM"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="14"
              label="Sun - PM"
            />
          </CheckboxGroup>
          </div>

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
      <Col span={8}>
        <UploadImageForm />
      </Col>
    </Row>
  )
}

const MyEnhancedForm = withRouter(formikEnhancer(MyForm))



const CreateStaff = (props) => (
  <div className="create-staff">
    {console.log(props)}
    <h1>Create New Staff</h1>
    <MyEnhancedForm user={{ 
      email: '',
      firstname: '',
      lastname: '',
      tel: '',
      imagePath: props.imagePath,
      role: '',
      mandayRate: '',
      checkboxGroup: [] }} />
  </div>
)

const mapStateToProps = state => ({
  imagePath: state.items.uploadedImagePath
})


export default connect(
  mapStateToProps
)(CreateStaff)

// export default CreateStaff
