import React from 'react';
import {Form, Input } from 'antd'
const FormItem = Form.Item
const InputFeedback = ({ error }) =>(
  error ? <div className="input-feedback">{error}</div> : null
)
export default InputFeedback