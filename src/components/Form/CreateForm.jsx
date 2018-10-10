// EditUserDialog.js
import React from 'react';
import { Formik, Field, ErrorMessage  } from 'formik'
import { Form, Icon, Input, Button } from 'antd'

const CreateForm = ({formData}) => {
  return (
    <div>
      <h1>Create New {formData.title}</h1>
      <Formik 
        initialValues={user}
        onSubmit={(values, actions) => {
          console.log('Call api')
        }}
        render={( errors, touched, isSubmitting ) => {

        }}
      />
    </div>
  )
}

export default CreateForm