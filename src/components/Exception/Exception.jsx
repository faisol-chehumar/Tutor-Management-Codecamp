import React from 'react'
import { Layout } from 'antd'

const Exception = props => {
  return (
    <div>
      {
        props.type === '404' ? 
        <div>sdsd</div>
        : 'What the Pug!'
      }
    </div>
  )
}

export default Exception