// EditUserDialog.js
import React from 'react';
import classNames from 'classnames'
import InputFeedback from './InputFeedback'
import Label from './Label'
import {Form, Input } from 'antd'
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

const TextInput = ({ type, id, label, error, value, onChange, className, ...props }) => {
  const classes = classNames(
    'input-group',
    {
      'animated shake error': !!error,
    },
    className
  )
  return (
    <FormItem  className={classes} {...formItemLayout} >
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

export default TextInput