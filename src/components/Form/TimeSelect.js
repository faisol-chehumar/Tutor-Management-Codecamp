import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

const TimeSelect = (props) => (
  <div>
    <Select disabled={props.selectDisabled} defaultValue="am" style={{ width: 120 }} onChange={props.timeSelectHandle}>
      <Option value="am">Morning</Option>
      <Option value="pm">Afternoon</Option>
      <Option value="fullDay">Full Day</Option>
    </Select>
    <Select disabled={props.selectDisabled} defaultValue="avl" style={{ width: 120 }} onChange={props.timeSelectHandle}>
      <Option value="avl">Available</Option>
      <Option value="m">Maybe</Option>
    </Select>
  </div>
)

export default TimeSelect