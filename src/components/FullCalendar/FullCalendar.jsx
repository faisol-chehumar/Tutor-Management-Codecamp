import React, { Component } from 'react'
import $ from 'jquery'
import 'fullcalendar'
import 'fullcalendar/dist/fullcalendar.css'
import { fetchData } from '../../utils/request'
export default class FullCalendar extends Component {

  async componentDidMount() {
    
   this.events = await fetchData('calendar')
    this.$el = $(this.el)
    this.$el.fullCalendar({
      events: this.events,
      eventClick: function(event) {
        if (event.url) {
          window.open(event.url,'_self')
          return false
        }
      },
      dayClick: function(date, jsEvent, view, resourceObj) {
        alert('Date: ' + date.format())
      }, 
      eventRender: function(events, element, view){
      
        return (events.ranges.filter(function(range){
            return (events.start.isBefore(range.end) &&
            events.end.isAfter(range.start));
        }).length)>0;
        
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