import React from 'react'
import { Form, Input, Cascader, Button } from 'antd'

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
    formField: [
      {
        title: 'Course title',
        decorator: 'courseTitle',
        required: true,
        type: 'INPUT'
      }, {
        title: 'Course Description',
        decorator: 'courseDescription',
        required: false,
        type: 'TEXT_AREA'
      }, {
        title: 'Class Locations',
        decorator: 'classLocations',
        required: true,
        type: 'CASCADER'
      }
    ]
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

  render() {
    const { getFieldDecorator } = this.props.form
    const { formField } = this.state

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
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        
        {
          formField.map(field => (
            <FormItem
              {...formItemLayout}
              label={field.title}
              key={field.title}
            >
            {
              getFieldDecorator(field.decorator, {
                rules: field.required && [{
                  required: true, message: `Please input your ${field.title}`,
                }],
              })(
                field.type === 'INPUT' ? <Input placeholder={`Enter your ${field.title}`} /> : null || 
                field.type === 'TEXT_AREA' ? <TextArea rows={4} placeholder={`Enter your ${field.title}`} /> : null ||
                field.type === 'CASCADER' ? <Cascader options={classLocations} /> : null
              )
            }
            </FormItem>
          ))
        }
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    )
  }
}

const CreateForm = Form.create()(AddForm)

export default CreateForm