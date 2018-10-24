import React, { Component } from 'react'
import { Checkbox, Row, Col, InputNumber  } from 'antd'
const CheckboxGroup = Checkbox.Group

class CheckBoxWithInput extends Component {
  state = {
    tchIsDisable: true,
    taIsDisable: true
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.values !== this.props.values
  // } 

  onChange = (checkedValues) => {
    console.log('checked = ', checkedValues)
  }

  render() {
    const { tchIsDisable, taIsDisable } = this.state
    console.log(tchIsDisable)
    console.log(taIsDisable)
    return (
      <CheckboxGroup style={{ width: '100%' }} onChange={this.onChange}>
        <Row>
          <Col span={4}>
            <Checkbox onClick={e => this.setState({tchIsDisable: !tchIsDisable})} value="tch">Teacher Rate</Checkbox>
          </Col>
          <Col span={20}>
            <InputNumber
              disabled={tchIsDisable}
              defaultValue={1000}
              formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={checkedValues => console.log('ss = ', checkedValues)}
            />
          </Col>
        </Row>
        <Row>
        <Col span={4}>
            <Checkbox onClick={e => this.setState({taIsDisable: !taIsDisable})} value="ta">TA Rate</Checkbox>
          </Col>
          <Col span={20}>
            <InputNumber
              disabled={taIsDisable}
              defaultValue={1000}
              formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={checkedValues => console.log('ssss = ', checkedValues)}
            />
          </Col>
        </Row>
      </CheckboxGroup>
    )
  }
}

export default CheckBoxWithInput