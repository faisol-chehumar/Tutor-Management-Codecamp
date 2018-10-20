import React from "react"

import MapComponent from './MapComponent'
import LocationSearchInput from './LocationSearchInput'


class GoogleMapSearch extends React.PureComponent {
  state = {
    isMarkerShown: false,
    lat: 13.7258011,
    lng: 100.52679339999997
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <div>
        <MapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          lat={this.state.lat}
          lng={this.state.lng}
        />
        <LocationSearchInput
          onSearch={(value)=> {
            console.log(this.props)
            this.props.onMarker({lat: value.lat, lng: value.lng})
            this.setState({lat: value.lat, lng: value.lng})
          }
        } />
      </div>
    )
  }
}

export default GoogleMapSearch