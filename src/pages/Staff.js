import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStaff } from '../actions/staffActions'

class Staff extends Component {
  componentDidMount() {
    fetchStaff()
  }
  
  render() {
    return (
      <div>
        {/* {this.props.staff.state.appTitle} */}
        {console.log(this.props)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  title: state.staff.appTitle
})

const mapDispatchToProps = {
  fetchStaff
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staff)