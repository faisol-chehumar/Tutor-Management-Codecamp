import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStaffBegin, fetchStaff } from '../actions/staffActions'

class Staff extends Component {
  componentDidMount() {
    // this.props.fetchStaffBegin()
    this.props.fetchStaff()
  }
  
  render() {
    return (
      <div>
        {console.log(this.props)}
        {this.props.loading}
        {/* <button onClick={() => this.props.dispatch(fetchStaffBegin())}>reset</button> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  staff: state.items.staff,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchStaffBegin,
  fetchStaff
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staff)