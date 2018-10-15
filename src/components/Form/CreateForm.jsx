import React from 'react'
import { Form, Input, Cascader, Button, DatePicker } from 'antd'

import Avatar from '../AvatarUpload/AvatarUpload'
import RichTextArea from '../RichTextArea/RichTextArea'
// import CheckBoxWithInput from './CheckBoxWithInput'
import DayTimeSelect from './DayTimeSelect'
import ListTable from '../ListTable/ListTable'

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
    // imgPath: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // values.imgPath = this.state.imgPath
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
    const { formTitle, formData } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
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
                field.type === 'IMG_UPLOAD'
                  ? <Avatar onUpoaded={(imgPath) => {
                      this.props.form.setFields({
                        imgPath: {
                          value: imgPath,
                          errors: [new Error('forbid ha')],
                        },
                      })
                    }} /> : null
                    
                  || field.type === 'INPUT'
                  ? <Input placeholder={`Enter your ${field.title}`} /> : null 
                  
                  || field.type === 'TEXT_AREA' 
                  ? <TextArea rows={4} /> : null
                  
                  || field.type === 'RICH_TXT_EDITOR'
                  ? <RichTextArea /> : null
                  
                  || field.type === 'CASCADER'
                  ? <Cascader
                      options={classLocations}
                      showSearch={(inputValue, path) => (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1))}
                    /> : null
                  
                  || field.type === 'DATEPICKER'
                  ? <RangePicker onChange={this.onDatePickerChange} /> : null

                  || field.type === 'DAYTIME_SELECT'
                  ? <DayTimeSelect
                      onSelected={(courseSchedule) => {
                        this.props.form.setFields({
                          courseSchedule: {
                            value: courseSchedule
                          },
                        })
                      }}
                      options={'hide'}
                    /> : null

                  || field.type === 'LIST_TABLE'
                  ? <ListTable dataSource={field.dataSource}/> : null
              )
            }
            </FormItem>
          ))
        }
        <FormItem {...tailFormItemLayout}>
          <Button style={{ marginRight: '0.5rem' }} onClick={e => this.props.form.resetFields()}>
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