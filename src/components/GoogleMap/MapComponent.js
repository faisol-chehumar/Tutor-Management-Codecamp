import React from 'react'
import { compose, withProps, lifecycle } from "recompose"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// import LocationSearchInput from './LocationSearchInput'

// const MapComponent = withScriptjs(withGoogleMap((props) =>
//   <div>
//     <LocationSearchInput />
//     <GoogleMap
//       defaultZoom={8}
//       defaultCenter={{ lat: -34.397, lng: 150.644 }}
//     >
//       {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//     </GoogleMap>
//   </div>
// ))

const MapComponent = compose(
  withProps({
    // googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfDtONM2UXrCITy6OMl2O03SjE92BvwFs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
        const refs = {}

        this.setState({
            position: null,
            onMarkerMounted: ref => {
                refs.marker = ref;
            },
            onPositionChanged: () => {
                const position = refs.marker.getPosition();
                console.log(position.toString())
            }
        })
    },
}),
  // withScriptjs,
  withGoogleMap
)((props) =>
  <div>
    {/* {console.log(props.onPositionChanged)} */}
    {console.log(props.lat, props.lng)}
    <GoogleMap
      // onPositionChanged={props.onPositionChanged}
      center={{ lat: props.lat, lng: props.lng }}
      defaultZoom={15}
      defaultCenter={{ lat: 13.7563309, lng: 100.50176510000006 }}
    >
      {props.isMarkerShown && 
      <Marker 
        position={{ lat: props.lat, lng: props.lng }}
        draggable={true} 
        ref={props.onMarkerMounted}
        onPositionChanged={props.onPositionChanged}
      />}
    </GoogleMap>
  </div>
)


export default MapComponent