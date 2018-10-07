import React, { Component } from 'react'
import $ from 'jquery'
import 'fullcalendar'
import 'fullcalendar/dist/fullcalendar.css'

export default class FullCalendar extends Component {
  events = [
    {
      title: 'All Day Event',
      start: '2018-10-01'
    },
    {
      title: 'Long Event',
      start: '2018-10-07',
      end: '2018-10-10'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: '2018-10-09T16:00:00'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: '2018-10-16T16:00:00'
    },
    {
      title: 'Conference',
      start: '2018-10-11',
      end: '2018-10-13'
    },
    {
      title: 'Meeting',
      start: '2018-10-12T10:30:00',
      end: '2018-10-12T12:30:00'
    },
    {
      title: 'Lunch',
      start: '2018-10-12T12:00:00'
    },
    {
      title: 'Meeting',
      start: '2018-10-12T14:30:00'
    },
    {
      title: 'Happy Hour',
      start: '2018-10-12T17:30:00'
    },
    {
      title: 'Dinner',
      start: '2018-10-12T20:00:00'
    },
    {
      title: 'Birthday Party',
      start: '2018-10-13T07:00:00'
    },
    {
      title: 'Click for Google',
      url: 'http://google.com/',
      start: '2018-10-28'
    }
  ]
  
  componentDidMount() {
    // console.log(this.events)
    this.$el = $(this.el)
    this.$el.fullCalendar({
      events: this.events,
      dayClick: function(date, jsEvent, view, resourceObj) {
        alert('Date: ' + date.format())
      }
    })
  }

  componentWillUnmount() {
    this.$el.fullCalendar('destroy')
  }
  
  render(){
    return (
      <div ref={el => this.el = el}></div>  
    )
  }
}