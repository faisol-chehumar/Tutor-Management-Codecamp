import React from 'react'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item

class AddForm extends React.Component {
  state = {
    confirmDirty: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
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

  render() {
    const { getFieldDecorator } = this.props.form
    const { formData } = this.props

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
                  required: true, 
                  message: `Please input your ${field.title}`,
                }],
              })(
                 field.type === 'INPUT'
                  ? <Input placeholder={`Enter your ${field.title}`} /> : null 
              )
            }
            </FormItem>
          ))
        }
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const CreateFormXX = Form.create()(AddForm)

export default CreateFormXX