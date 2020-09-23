import React from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import './index.css'

class WeatherMain extends React.Component {
  constructor() {
    super()
    this.state = {
      location: 'Oslo',
      newLocation: '',
      weather: {},
      clouds: {},
      loaded: false,
      error: {
        isSet: false,
        message: '',
      },
    }
  }

  componentDidMount() {
    this.getWeatherData(this.state.location)
  }

  getWeatherData(location) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5735a13ddd9ead770de5d9ecc80265be
      `
    )
      .then((res) => {
        if (res.ok) {
          this.setState({
            error: {
              isSet: false,
              message: '',
            },
          })
          return res.json()
        } else {
          throw new Error('Wrong city name')
        }
      })
      .then((weather) => {
        console.log(weather)
        if (weather) {
          this.setState({
            weather: weather.main,
            clouds: weather.weather[0],
            loaded: true,
          })
        }
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          location: 'Oslo',
          error: {
            isSet: true,
            message: err.message,
          },
        })
      })
  }

  render() {
    //DATE ELEMENT
    const date = new Date()
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    const formatedDate = date.toLocaleDateString('en-NO', options)

    const handleChangeLocation = (event) => {
      this.setState({ newLocation: event.target.value })
    }

    const handleClickSearch = () => {
      this.setState({
        location: this.state.newLocation,
        newLocation: '',
      })
      this.getWeatherData(this.state.newLocation)
    }

    const keyDown = (event) => {
      if (event.key === 'Enter') {
        handleClickSearch()
      }
    }

    return (
      <>
        {!this.state.loaded ? (
          <div className="spinner-container">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        ) : (
          <div className="container">
            <h1 className="date">{formatedDate}</h1>

            <div className="search-bar">
              <input
                type="search"
                placeholder="Search for a place..."
                value={this.state.newLocation}
                onChange={handleChangeLocation}
                onKeyDown={keyDown}
              />
              <button onClick={handleClickSearch}>🔍</button>

              {this.state.error.isSet ? (
                <Alert variant={'danger'}>{this.state.error.message}</Alert>
              ) : null}
            </div>

            <h2 className="location">{this.state.location}</h2>

            <div className="grid-container-1">
              <div className="soft-box-1">
                <h3>HUM</h3>
                <h3>IDI</h3>
                <h3>TY</h3>
              </div>
              <div className="soft-box-2">
                <h3>{this.state.weather.humidity}%</h3>
              </div>
            </div>
            <div className="grid-container-2">
              <div className="soft-box-1">
                <img src={require(`./img/thermometer.png`)} alt="thermometer" />
              </div>
              <div className="soft-box-2">
                <h3 style={{ fontSize: '60px' }}>
                  {Math.round(this.state.weather.temp)}°C
                </h3>
              </div>
            </div>
            <div className="grid-container-3">
              <div className="soft-box-1">
                <h3>
                  <p>{this.state.clouds.description}</p>
                </h3>
              </div>
              <div className="soft-box-2">
                <img
                  src={`http://openweathermap.org/img/wn/${this.state.clouds.icon}@2x.png`}
                  alt="clouds"
                />
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default WeatherMain
