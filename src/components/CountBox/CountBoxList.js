import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'antd'
import CountBox from './CountBox'
const uuidv1 = require('uuid/v1')

const CountBoxList = ({dataSource}) => (
  dataSource.map(({title, count}, index) => (
    <Col
      className='gutter-row'  
      span={24/dataSource.length}
      key={uuidv1()}
    >
      <Link to={title}>
        <CountBox 
          key={index}
          title={title.toUpperCase()}
          count={count}
        />
      </Link>
    </Col>
  ))
)

export default CountBoxList