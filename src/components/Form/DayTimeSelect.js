import React, { Component } from 'react'
import { Checkbox, Row, Col, Select } from 'antd'

import TimeSelect from './TimeSelect'

const CheckboxGroup = Checkbox.Group

class DayTimeSelect extends Component {
  state = {
    daysCheckList: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    }

  }

  onChange = (checkedValues) => {
    this.props.onSelected(checkedValues)
    console.log('checked = ', checkedValues)
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    const { daysCheckList } = this.state

    return (
      <CheckboxGroup style={{ width: '100%' }} onChange={this.onChange}>
        {
          Object.keys(daysCheckList).map(day => (
            <Row key={day}>
              <Col span={4}>
                <Checkbox
                  onClick={ e => this.setState({
                    daysCheckList: {
                      ...daysCheckList,
                      [day]: !daysCheckList[day]
                    }
                  })}
                  value={day}>{day.toUpperCase()}
                </Checkbox>
              </Col>
              <Col span={20}>
                <TimeSelect selectDisabled={daysCheckList[day]}/>
              </Col>
            </Row>
          ))
        }
      </CheckboxGroup>
    )
  }
}

export default DayTimeSelect