import React from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router'
import { Form, Input, Cascader, Button, DatePicker, Select } from 'antd'

import Avatar from '../AvatarUpload/AvatarUpload'
import RichTextArea from '../RichTextArea/RichTextArea'
import DayTimeSelect from './DayTimeSelect'
import ListTable from '../ListTable/ListTable'
// import LocationSearchInput from '../GoogleMap/LocationSearchInput'
import GoogleMapSearch from '../GoogleMap/GoogleMapSearch'
import RoleSelect from './RoleSelect'


const Option = Select.Option
const { RangePicker } = DatePicker
const { TextArea } = Input
const FormItem = Form.Item

class AddForm extends React.Component {
  state = {
    confirmDirty: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log(values)
        this.props.formSubmit(values)
      }
    })
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
        {formData.map(field => (
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
                  ? <Avatar onUpoaded={(imagePath) => {
                      this.props.form.setFields({
                        imagePath: {
                          value: imagePath,
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
                  
                  || field.type === 'SELECT'
                  ? <Select
                      showSearch
                      style={{ width: 400 }}
                      placeholder="Select a Location"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {field.dataSource.map(item => (
                        <Option
                          key={item.locationId}
                          value={item.locationId}
                        >
                          {`${item.addressTitle} - ${item.address} | Room size: ${item.roomSize}`}
                        </Option>
                      ))}
                    </Select>: null
                  
                  || field.type === 'CASCADER'
                  ? <Cascader
                      options={field.dataSource}
                      showSearch={(inputValue, path) => (path.some(option => (option.label)
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) > -1)
                      )}
                    /> : null

                  || field.type === 'DATEPICKER'
                  ? <RangePicker onChange={this.onDatePickerChange} /> : null

                  || field.type === 'DAYTIME_SELECT'
                  ? <DayTimeSelect
                      onSelected={courseSchedule => {
                        this.props.form.setFields({
                          [field.decorator]: {
                            value: courseSchedule
                          },
                        })
                      }}
                      options={this.props.formTitle === 'staff' ? 'hide' : null}
                    /> : null

                  || field.type === 'LIST_TABLE'
                  ? <ListTable dataSource={field.dataSource} listTableHandle={record => {
                    this.props.form.setFields({
                      [field.decorator]: {
                        value: record
                      }
                    })
                  }} /> : null

                  // || field.type === 'MAP_INPUT'
                  // ? <LocationSearchInput /> : null

                  || field.type === 'MAP_INPUT'
                  ? <GoogleMapSearch 
                      onMarker={mapValue => {
                        console.log(mapValue)
                        this.props.form.setFields({
                          [field.decorator]: {
                            value: mapValue
                          },
                        })
                      }}/> : null

                  || field.type === 'ROLE_SELECT'
                  ? <RoleSelect
                      onSelected={roleSetting => {
                        this.props.form.setFields({
                          [field.decorator]: {
                            value: roleSetting
                          },
                        })
                      }}
                    /> : null
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

export default connect(
  null
)(CreateForm)