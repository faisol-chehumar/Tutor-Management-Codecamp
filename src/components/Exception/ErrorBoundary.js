import React, { Component } from 'react'
import Exception from './Exception'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      info: null
    }
  }

  componentDidCatch(error, info) {
    console.log('component catch')
    this.setState({
      hasError: true,
      error: error,
      info: info
    })
  }

  render() {
    const { hasError } = this.state
    if (hasError) {
      return (
        <Exception type={404} />
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary