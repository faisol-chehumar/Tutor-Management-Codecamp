import React from 'react'
import PropTypes from 'prop-types'


const Exception = props => (
  <div>
    {
      props.type === '404'
      ? <div>Error 404</div>
      : 'What the Pug!'
    }
  </div>
)

Exception.defaultProps = {
  type: '404'
}

Exception.propTypes = {
  type: PropTypes.string
}

export default Exception