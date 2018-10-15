import React from 'react'
import { Select } from 'antd'

const Option = Select.Option



const TimeSelect = (props) => {
  const timeSelectHandle = (value) => {
    const valueArr = value.split(',')
    props.timeSelectHandle([props.day,...valueArr])

    console.log(`${props.day} ${value}`)
    // console.log('>>>>>>>>>>>>> sunday, am, pm',value)
  }

  return (
  <div>
    {/* {console.log(props)} */}
    <Select
      disabled={props.selectDisabled}
      defaultValue="time,am"
      style={{ width: 120 }}
      onChange={timeSelectHandle.bind(props)}
    >
      <Option value={"time,am"}>Morning</Option>
      <Option value={"time,pm"}>Afternoon</Option>
      <Option value={"time,fullDay"}>Full Day</Option>
    </Select>
    {
      props.options === 'hide' ? null :
      <Select
      disabled={props.selectDisabled}
      defaultValue="avlStatus,avl"
      style={{ width: 120 }}
      onChange={timeSelectHandle}
    >
      <Option value={"avlStatus,avl"}>Available</Option>
      <Option value={"avlStatus,m"}>Maybe</Option>
    </Select>
    }
  </div>
  )
}

export default TimeSelect