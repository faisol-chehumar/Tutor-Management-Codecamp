import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Home } from './dashboard'
import { Staff, StaffDetail, CreateStaff } from './staff'
import { Course, CourseDetail, CreateCourse } from './course'
import { Location, LocationDetail, CreateLocation } from './location'
import { Customer, CustomerDetail, CreateCustomer } from './customer'
import Exception from '../components/Exception/Exception'

const Main = () => (
  <Switch>
    <Route path='/' exact component={Home} />

    <Route path='/staff' exact component={Staff} />
    <Route path='/staff/create' exact component={CreateStaff} />
    <Route path='/staff/:id' exact component={StaffDetail} />

    <Route path='/courses' exact component={Course} />
    <Route path='/courses/create' exact component={CreateCourse} />
    <Route path='/courses/:id' exact component={CourseDetail} />

    <Route path='/locations' exact component={Location} />
    <Route path='/locations/create' exact component={CreateLocation} />
    <Route path='/locations/:id' exact component={LocationDetail} />

    <Route path='/customers' exact component={Customer} />
    <Route path='/customers/create' exact component={CreateCustomer} />
    <Route path='/customers/:id' exact component={CustomerDetail} />
   
    <Route render={() => <Exception type="404" />} />
  </Switch>
)

export default Main