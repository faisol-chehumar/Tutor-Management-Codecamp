import React, { Component } from 'react'
import { Row, Col, Divider } from 'antd'
// import Geocode from 'react-geocode'

import { fetchData } from '../../utils/request'
import ImageView from '../../components/PageView/ImageView'
import color from '../../styles/color'
import GoogleMapSearch from '../../components/GoogleMap/GoogleMapSearch'

class CustomerDetail extends Component {
  state = {
    customerDetail : []
  }

  async componentDidMount() {
    try {
      this.setState({ customerDetail :  await fetchData('customers/' + this.props.match.params.id) })
      console.log(this.props.match.params.id)
    } catch (error) {
      console.error('Fetch error', error)
    }
  }

  render() {
    const { customerDetail } = this.state
    console.log(customerDetail)

    return (
      customerDetail.map(s =>
        <div style={{ backgroundColor: '#fff', padding: '2rem', border: `1px solid ${color.shadow}` }} key={s.key}>
          <Row gutter={16}>
            <Col span={6}>
              <ImageView
                title={`${s.firstname} ${s.lastname}`}
                imagePath={s.imagePath}
                imageDefault={'https://res.cloudinary.com/dbzxmgk2h/image/upload/v1540544187/003-worker-1.png'}
              />
            </Col>
            <Col span={18} >
              <h1>{`${s.firstname} ${s.lastname}`}</h1>
              <p><b>Email: </b> {s.email && 'N/A'}</p>
              <p><b>Tel: </b> {s.tel && 'N/A'}</p>
              <p><b>Child Age: </b> {s.childAge && 'N/A'}</p>
              <p><b>Actived Status: </b> {s.activedStatus === 1 ? 'Actived' : 'Inactive'}</p>
              <address>
                <p><b>Adress Title:</b> {s.addressTitle && 'N/A'}</p>
                <p><b>Adress:</b> {s.address && 'N/A'}</p>
              </address>
            </Col>

            <Col span={24}>
            <Divider orientation="left"><h3>Staff Address</h3></Divider>
              {console.log(s)}
              <GoogleMapSearch lat={s.lat} lng={s.lng} search={false} />
            </Col>
          </Row>
        </div>

      )
    )
  }
}


export default CustomerDetail