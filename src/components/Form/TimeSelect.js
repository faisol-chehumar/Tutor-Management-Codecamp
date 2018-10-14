import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

const timeSelectHandle = (value) => {
  console.log('>>>>>>>>>>>>>',value)
}

const TimeSelect = (props) => (
  <div>
    {console.log(props)}
    <Select
      disabled={props.selectDisabled}
      defaultValue="am"
      style={{ width: 120 }}
      onChange={timeSelectHandle}
    >
      <Option value={props.day+"am"}>Morning</Option>
      <Option value={props.day+"pm"}>Afternoon</Option>
      <Option value={props.day+"fullDay"}>Full Day</Option>
    </Select>

    <Select
      disabled={props.selectDisabled}
      defaultValue="avl"
      style={{ width: 120 }}
      onChange={timeSelectHandle}
    >
      <Option value="avl">Available</Option>
      <Option value="m">Maybe</Option>
    </Select>
  </div>
)

export default TimeSelect