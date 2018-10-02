import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Course from './Course'
import Staff from './Staff'
import Customer from './Customer'
import Exception from '../components/Exception/Exception'

const Main = () => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/courses' exact component={Course} />
    <Route path='/courses/:id' component={Course} />
    <Route path='/staff' exact component={Staff} />
    <Route path='/staff/:id' exact component={Staff} />
    <Route path='/customers' exact component={Customer} />
    <Route path='/customers/:id' exact component={Customer} />
    <Route render={() => <Exception type="404" />} />
  </Switch>
)

export default Main