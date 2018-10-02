import React, { Component } from 'react'

export class FullCalendar extends Component {
  componentDidMount(){
    this.initDatepicker();
  }
  
  initDatepicker(){
    $(this.refs.datepicker).datepicker();
  }
  
  render(){
    return (
      <div>
        <h3>Choose date!</h3>
        <input type='text'  ref='datepicker' />
      </div>    
    )
  }
}