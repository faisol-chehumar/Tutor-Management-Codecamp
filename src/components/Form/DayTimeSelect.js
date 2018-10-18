import React, { Component } from 'react'
import { Checkbox, Row, Col } from 'antd'

import TimeSelect from './TimeSelect'

const CheckboxGroup = Checkbox.Group
let data = {}
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
class DayTimeSelect extends Component {
  state = {
    daysCheckList: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true
    }
  }

  checkDay = (checkedValues, day) => {
    if (checkedValues.includes(day)) {
      if (!([day] in data)) {
        data = {
          ...data,
          [day]: {
            time: 'am',
            availStatus: 'avl'
          }
        }
      }
    } else {
      delete data[day]
    }
  }

  onChange = (checkedValues) => {
    days.map(d => this.checkDay(checkedValues, d))

    this.props.onSelected(data)
    console.log('checked = ', data)
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
                  onClick={e => this.setState({
                    daysCheckList: {
                      ...daysCheckList,
                      [day]: !daysCheckList[day]
                    }
                  })}
                  value={day}>{day.toUpperCase()}
                </Checkbox>
              </Col>
              <Col span={20}>
                <TimeSelect
                  day={day}
                  selectDisabled={daysCheckList[day]}
                  timeSelectHandle={(value) => {
                    //TODO:
                    if (value[1] === 'time') {
                      data[value[0]].time = value[2]
                    } else {
                      data[value[0]].availStatus = value[2]
                    }
                    console.log(data)
                  }}
                  options={this.props.options}
                />
              </Col>
            </Row>
          ))
        }
      </CheckboxGroup>
    )
  }
}

export default DayTimeSelect