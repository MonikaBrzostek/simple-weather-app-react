import React, { Component } from 'react'
import './App.css'
import WeatherMain from './WeatherMain'

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <WeatherMain />
      </div>
    )
  }
}

export default App
