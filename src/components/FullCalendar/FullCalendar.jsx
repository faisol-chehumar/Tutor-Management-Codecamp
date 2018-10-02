import React, { Component } from 'react'
import $ from 'jquery'
import 'fullcalendar'
import 'fullcalendar/dist/fullcalendar.css'

export default class FullCalendarWrapper extends Component {
  componentDidMount(){
    this.initDatepicker()
  }
  
  initDatepicker(){
    $('#calendar').fullCalendar({
      // put your options and callbacks here
    })
  }
  
  render(){
    return (
      <div id="calendar"></div>    
    )
  }
}