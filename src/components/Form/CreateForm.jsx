import React from 'react'
import { Form, Input, Cascader, Button, DatePicker } from 'antd'

import Avatar from '../AvatarUpload/AvatarUpload'
import RichTextArea from '../RichTextArea/RichTextArea'

const { RangePicker } = DatePicker
const { TextArea } = Input
const FormItem = Form.Item

const classLocations = [{
  value: '1',
  label: 'BB Coworking'
}, {
  value: '2',
  label: 'Jiangsu',
}]

class AddForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    imgPath: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.imgPath = this.state.imgPath
        console.log('Received values of form: ', values)
      }
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  onDatePickerChange(date, dateString) {
    console.log(date, dateString);
  }

  avatarHandle = (imgPath) => {
    this.setState({imgPath})
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { formTitle, formData } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>CREATE NEW {formTitle.toUpperCase()}</h2>
        {/* <Avatar /> */}
        {
          formData.map(field => (
            <FormItem
              {...formItemLayout}
              key={field.title}
            >
            <h3>{field.title}</h3>
            {
              getFieldDecorator(field.decorator, {
                rules: field.required && [{
                  required: true, message: `Please input your ${field.title}`,
                }],
              })(
                field.type === 'IMG_UPLOAD' ?
                  <Avatar onUploadAvatar={this.avatarHandle} />
                  : null ||
                field.type === 'INPUT' ?
                  <Input placeholder={`Enter your ${field.title}`} />
                  : null || 
                field.type === 'TEXT_AREA' ?
                  <TextArea rows={4} />
                  : null ||
                field.type === 'RICH_TXT_EDITOR' ?
                  <RichTextArea />
                  : null ||
                field.type === 'CASCADER' ?
                  <Cascader
                    options={classLocations}
                    showSearch={(inputValue, path) => (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1))}
                  />
                  : null ||
                field.type === 'DATEPICKER' ?
                  <RangePicker onChange={this.onDatePickerChange} /> 
                  : null
              )
            }
            </FormItem>
          ))
        }
        <FormItem {...tailFormItemLayout}>
          <Button style={{ marginRight: '0.5rem' }} onClick={e => alert('Reset Form')}>
            Reset
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const CreateForm = Form.create()(AddForm)

export default CreateForm