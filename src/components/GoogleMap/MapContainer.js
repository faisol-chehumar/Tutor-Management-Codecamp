import React from 'react'
import {GoogleMap,Marker}  from 'google-map-react';
const MapContainer = () => (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
            <Marker position={{ lat: -34.397, lng: 150.644 }} />
        </GoogleMap>
    </div>
)

export default MapContainer
