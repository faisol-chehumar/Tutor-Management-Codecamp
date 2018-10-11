import React from 'react'
import { Card } from 'antd'

const CountBox = ({title, count}) => (
  <Card>
    <h2>{title}</h2>
    <p>{count}</p>
  </Card>
)

export default CountBox