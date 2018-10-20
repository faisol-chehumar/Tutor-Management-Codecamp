import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'antd'
import CountBox from './CountBox'
const uuidv1 = require('uuid/v1')

const CountBoxList = ({avatar, titles, counts, captions}) => (
  titles.map((title, index) => (
    <Col
      className='gutter-row'  
      span={24/titles.length}
      key={uuidv1()}
    >
      <Link to={title}>
        <CountBox 
          key={index}
          avatar={avatar[index]}
          title={title.toUpperCase()}
          count={counts[title] || 0}
          captions={captions[index]}
        />
      </Link>
    </Col>
  ))
)

export default CountBoxList