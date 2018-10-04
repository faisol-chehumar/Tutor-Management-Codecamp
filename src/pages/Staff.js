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
        {/* {console.log(this.store)} */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  staff: state.staff,
  loading: state.loading,
  error: state.error
})

const mapDispatchToProps = {
  fetchStaff
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staff)