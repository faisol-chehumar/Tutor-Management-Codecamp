import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FullCalendar from '../components/FullCalendar/FullCalendar'

import { Row, Col, Card } from 'antd'
import CountBox from '../components/CountBox/CountBox'
import { fetchData } from '../utils/request'

export default class Home extends Component {
  state = {
    sumariesData: [
      {title: 'Staff' , count: 0 },
      {title: 'Courses', count: 0 },
      {title: 'Locations', count: 0 },
      {title: 'Customers', count: 0 }
    ]
  }

  async componentDidMount() {
    const [ staff, courses, customers, locations ] = await Promise.all([
      fetchData('staff'),
      fetchData('courses'),
      fetchData('locations'),
      fetchData('customers')
    ])

    const sumariesData = [
      {title: 'staff' , count: staff.length !== undefined ? staff.length : 0 },
      {title: 'courses', count: courses.length !== undefined ? courses.length : 0 },
      {title: 'locations', count: locations.length !== undefined ? locations.length : 0 },
      {title: 'customers', count: customers.length !== undefined ? customers.length : 0 }
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
                <Link to={data.title}>
                  <Card >
                    <CountBox
                      key={index}
                      title={data.title}
                      count={data.count}
                    />
                  </Card>
                </Link>
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