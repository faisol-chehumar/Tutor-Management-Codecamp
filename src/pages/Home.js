import React from 'react'
import { Row, Col, Card } from 'antd';

const sumariesData = [
  {title: 'Courses', number: '120'},
  {title: 'Staff', number: '1000'},
  {title: 'Customers', number: '5478'}
]

const Home = props => (
  <Row gutter={16}>
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
)

export default Home