import React, { Component } from 'react'
import { Select } from 'antd'

const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`)
}

function handleBlur() {
  console.log('blur')
}

function handleFocus() {
  console.log('focus')
}

class SelectOptions extends Component {

  render () {
    return (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a Location"
        optionFilterProp="children"
        // onChange={handleChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
      {console.log(this.props.options)}
        { this.props.options.map(item => <Option key={item.locationId} value={item.locationId}>{`${item.addressTitle} - ${item.address}`}</Option>) }
      </Select>
    )
  }
}

export default SelectOptions
