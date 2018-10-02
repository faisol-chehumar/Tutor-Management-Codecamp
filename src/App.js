import React, { Component } from 'react'
import Navbar from './components/Navbar/Navbar'
// import logo from './logo.svg';
import './App.css'
import { DatePicker } from 'antd'
// import 'antd/lib/date-picker/style/css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <DatePicker />
      </div>
    )
  }
}

export default App
