import React from 'react'
import { Card, Icon, Row, Col } from 'antd'

import styled from 'styled-components'

const GradientText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .text {
    text-transform: uppercase;
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const CountBox = ({avatar, title, count, captions}) => (
  <Card>
    <Row>
    <Col span={6}>
    {console.log(avatar)}
      <Icon style={{ color: '#eee', fontSize: '3rem'  }} type={avatar} />
    </Col> 
    <Col span={16}>
      <Row>
        <Col span={18}>
          <h3>{title}</h3>
          <span>{`${captions}: `}</span>
        </Col>
        <Col span={6}>
        <GradientText><span style={{ marginTop: '-0.5rem', fontSize: '4rem', fontWeight: '800', lineHeight: 1 }} className="text">{count}</span></GradientText>
        </Col>
      </Row>
    </Col>
    </Row>
  </Card>
)

export default CountBox