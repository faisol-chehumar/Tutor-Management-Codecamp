import React from 'react'

const Course = props => (
  <div>
    {
      props.match.params.id ?
      props.match.params.id : <div>Course List</div>
    }
  </div>
)

export default Course