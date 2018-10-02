import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Course from './Course'
import Staff from './Staff'
import Customer from './Customer'

const Main = () => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/courses' component={Course} />
    <Route path='/staff' component={Staff} />
    <Route path='/customers' component={Customer} />
  </Switch>
)

export default Main