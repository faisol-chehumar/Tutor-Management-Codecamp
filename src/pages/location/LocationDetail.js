import React, { Component } from 'react'
import { Row, Col, Divider } from 'antd'

import ImageView from '../../components/PageView/ImageView'
import color from '../../styles/color'
import { fetchData } from '../../utils/request'
import GoogleMapSearch from '../../components/GoogleMap/GoogleMapSearch'

// const uuidv1 = require('uuid/v1')

class LocationDetail extends Component {
  state = {
    locationDetail : []
  }

  async componentDidMount() {
    // this.props.fetchLocations(this.props.match.params.id)
    const location = await fetchData('locations/' + this.props.match.params.id)
    await this.setState({ locationDetail : location})
    console.log(this.props.match.params.id)
  }
  render() {
    const { locationDetail } = this.state
    // const { locationList } = this.props
    // console.log('locationList>>>>>>>', locationList)
    return (
      locationDetail.map(s =>
        <div style={{ backgroundColor: '#fff', padding: '2rem', border: `1px solid ${color.shadow}` }} key={s.key}>
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
              <p><b>Telephone: </b> {s.tel}</p>
              <p><b>Room Size: </b> {s.roomSize}</p>
              <p><b>Note: </b> {s.note}</p>
              <address>
                <p><b>Adress Title:</b> {s.addressTitle}</p>
                <p><b>Adress:</b> {s.address}</p>
              </address>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
            <Divider orientation="left"><h3>Staff Address</h3></Divider>
            {console.log(s)}
              <GoogleMapSearch lat={s.lat} lng={s.lng} search={false} />
            </Col>
          </Row>
        </div>

      )
    );
  }
}

export default LocationDetail
// const mapStateToProps = state => ({
//   locationList: state.items.locations,
//   loading: state.items.loading,
//   error: state.items.error
// })

// const mapDispatchToProps = {
//   fetchLocations
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LocationDetail)