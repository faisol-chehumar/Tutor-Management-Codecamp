import React from 'react'

const Course = props => {
  return <div>
  {
    props.match.params.id ?
    props.match.params.id : <div>srse List</div>
  }
  </div>
}

export default Course