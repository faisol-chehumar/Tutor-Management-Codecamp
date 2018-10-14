import React, { Component } from 'react'
import { Checkbox, Row, Col } from 'antd'

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
    },

    availDayTime: {}
  }

  onChange = (checkedValues) => {
    this.props.onSelected(checkedValues)
    console.log('checked = ', checkedValues)
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.values !== this.props.values
  // } 

  render() {
    const { daysCheckList, availDayTime } = this.state

    return (
      <CheckboxGroup style={{ width: '100%' }} onChange={this.onChange}>
        {console.log(this.state)}
        {
          Object.keys(daysCheckList).map(day => (
            <Row key={day}>
              <Col span={4}>
                <Checkbox
                  onClick={ e => this.setState({
                    daysCheckList: {
                      ...daysCheckList,
                      [day]: !daysCheckList[day]
                    },
                    availDayTime: {
                      [day]: `${day} am avl`
                    }
                  })}
                  value={day}>{day.toUpperCase()}
                </Checkbox>
              </Col>
              <Col span={20}>
                <TimeSelect
                  day={day}
                  selectDisabled={daysCheckList[day]}
                  test={(value) => {
                    console.log(value)
                    this.setState({
                      availDayTime: {
                        ...availDayTime,
                        [day]: value
                      }
                    })
                  }}
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