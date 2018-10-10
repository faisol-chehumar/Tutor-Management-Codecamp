import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Course from './Course'
import CourseDetail from './CourseDetail'
import CreateCourse from './CreateCourse'
import Staff from './Staff'
import CreateStaff from './CreateStaff'
import Customer from './Customer'
import CustomerDetail from './CustomerDetail'
import Location from './Location'
import StaffDetail from './StaffDetail'
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
    <Route path='/locations/:id' exact component={LocationDetail} />
    <Route render={() => <Exception type="404" />} />
  </Switch>
)

export default Main