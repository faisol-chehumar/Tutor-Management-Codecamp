import React, { Component } from 'react'
import FullCalendar from '../components/FullCalendar/FullCalendar'
import axios from 'axios'

import { Row, Col, Card } from 'antd'
import CountBox from '../components/CountBox/CountBox'

const fetchData = async (title) => {
  try {
    const result = await axios.get(`http://localhost:8000/api/v1/${title}/`)
    return result.data
  } catch(error) {
    console.error(error)
  }
}

export default class Home extends Component {
  state = {
    sumariesData: [
      {title: 'Staff' , count: 0 },
      {title: 'Locations', count: 0 }
    ]
  }

  async componentDidMount() {
    const [ staff, locations ] = await Promise.all([
      fetchData('staff'),
      fetchData('locations')
    ])

    const sumariesData = [
      {title: 'Staff' , count: staff.length !== undefined ? staff.length : 0 },
      {title: 'Locations', count: locations.length !== undefined ? locations.length : 0 }
    ]

    await this.setState({sumariesData})
  }


  render() {
    const { sumariesData } = this.state
    
    return (
      <div>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          {
            sumariesData.map((data, index) => (
              <Col
                className="gutter-row"
                span={24/sumariesData.length}
                key={data.title}>
                <Card >
                  <CountBox
                    key={index}
                    title={data.title}
                    count={data.count}
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