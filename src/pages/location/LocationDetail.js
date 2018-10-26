import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLocations } from '../../actions/locationsActions'
import MapContainer from '../../components/GoogleMap/MapContainer'

import ImageView from '../../components/PageView/ImageView'
import { Row, Col } from 'antd'
// const uuidv1 = require('uuid/v1')

class LocationDetail extends Component {
  componentDidMount() {
    this.props.fetchLocations(this.props.match.params.id)
    console.log(this.props.match.params.id)
  }
  render() {
    const { locationList } = this.props
    console.log('locationList>>>>>>>', locationList)
    return (
      locationList.map(s =>
        <div key={s.key}>
          <Row gutter={16}>
            <Col span={6}>
              <ImageView
                title={s.addressTitle}
                description={s.address}
                imagePath={s.imagePath}
                imageDefault={'https://res.cloudinary.com/dbzxmgk2h/image/upload/v1540543818/001-building.png'}
              />
            </Col>
            <Col span={18} >
              <h1>{`${s.addressTitle}`}</h1>
              <p><b>Contact: </b> {s.contact}</p>
              <p><b>roomSize: </b> {s.roomSize}</p>
              <p><b>Tel: </b> {s.tel}</p>
              <p><b>Note: </b> {s.note}</p>
              <address>
                <p><b>Adress Title:</b> {s.addressTitle}</p>
                <p><b>Adress:</b> {s.address}</p>
              </address>
            </Col>
          </Row>
          <Row>
            <MapContainer />
          </Row>
        </div>

      )
    );
  }
}

const mapStateToProps = state => ({
  locationList: state.items.locations,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchLocations
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetail)