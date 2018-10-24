import React from 'react'
import { Card, Avatar, Row, Col, Tag } from 'antd'

const CountBox = ({avatar, title, count, captions}) => (
  <Card>
    <Row>
    <Col span={6}>
    {console.log(avatar)}
      <Avatar style={{ backgroundColor: '#003e79' }} size="large" icon={avatar} />
    </Col>
    <Col span={16}>
      <h2>{title}</h2>
      <span>{`${captions}: `}<Tag style={{ width: 60, textAlign: 'center' }} color="green">{count}</Tag></span>
      
    </Col>
    </Row>
  </Card>
)

export default CountBox