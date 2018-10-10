import React from 'react'
import { Card } from 'antd'

const CountBox = ({title, count}) => (
  <Card>
    <div>
      <h2>{title}</h2>
      <p>{count}</p>
    </div>
  </Card>
)

export default CountBox