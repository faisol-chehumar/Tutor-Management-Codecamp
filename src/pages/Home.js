import React from 'react'
import FullCalendarWrapper from '../components/FullCalendar/FullCalendar'
import { Row, Col, Card } from 'antd'

const sumariesData = [
  {title: 'Courses', number: '120'},
  {title: 'Staff', number: '1000'},
  {title: 'Customers', number: '5478'},
  {title: 'Locations', number: '5'}
]

const Home = () => (
  <div>
    <Row gutter={16} style={{ marginBottom: 16 }}>
      {
        sumariesData.map(({title, number}, index) => (
          <Col className="gutter-row" key={index} span={24/sumariesData.length}>
            <Card>
              <h2>{title}</h2>
              <p>{number}</p>
            </Card>
          </Col>
        ))
      }
    </Row>
    <Row gutter={16}>
      <Col span={24}>
        <Card>
          <FullCalendarWrapper />
        </Card>
      </Col>
    </Row>
  </div>
)

export default Home