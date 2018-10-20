import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Course from './course/Course'
import CourseDetail from './course/CourseDetail'
import CreateCourse from './course/CreateCourse'
import Staff from './staff/Staff'
import StaffDetail from './staff/StaffDetail'
import CreateStaff from './staff/CreateStaff'
import Customer from './customer/Customer'
import CustomerDetail from './customer/CustomerDetail'
import Location from './Location'
import CreateLocation from './CreateLocation'
import LocationDetail from './LocationDetail'
import Exception from '../components/Exception/Exception'

const Main = () => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/courses' exact component={Course} />
    <Route path='/courses/create' exact component={CreateCourse} />
    <Route path='/courses/:id' exact component={CourseDetail} />
    <Route path='/staff' exact component={Staff} />
    <Route path='/staff/create' exact component={CreateStaff} />
    <Route path='/staff/:id' exact component={StaffDetail} />
    <Route path='/customers' exact component={Customer} />
    <Route path='/customers/:id' exact component={CustomerDetail} />
    <Route path='/locations' exact component={Location} />
    <Route path='/locations/create' exact component={CreateLocation} />
    <Route path='/locations/:id' exact component={LocationDetail} />
   
    
    <Route render={() => <Exception type="404" />} />
  </Switch>
)

export default Main