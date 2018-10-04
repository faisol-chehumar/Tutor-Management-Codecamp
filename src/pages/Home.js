import React, { Component } from 'react'
import FullCalendar from '../components/FullCalendar/FullCalendar'
import axios from 'axios'

import { Row, Col, Card } from 'antd'
import CountBox from '../components/CountBox/CountBox'

const fetchData = async (title) => {
  try {
    const result = await axios.get(`http://localhost:8000/api/v1/${title}/`)
    console.log(result.data)
    return result.data
  } catch(error) {
    console.error(error)
  }
}
export default class Home extends Component {
  state = {
    sumariesData: []
  }

  async componentDidMount() {
    const staff = await fetchData('staff')
    const sumariesData = [{title: 'Staff' , count: staff.length}]

    await this.setState({sumariesData})
  }

  render() {
    const { sumariesData } = this.state
    console.log(sumariesData)
    return (
      <div>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          {
            sumariesData.map((x, index) => (
              <Col className="gutter-row" key={index} span={24/sumariesData.length}>
                <Card key={x.id}>
                  <CountBox
                    title={x.title}
                    count={x.count}
                  />
                </Card>
              </Col>
            ))
          }
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Card>
              <FullCalendar />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}