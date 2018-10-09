import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLocations } from '../actions/locationsActions'
import { Row, Col, Card } from 'antd'
const { Meta } = Card
const uuidv1 = require('uuid/v1')

class LocationsDetail extends Component {
  componentDidMount() {
    this.props.fetchLocations(this.props.match.params.id)
    console.log(this.props.match.params.id)
  }
  render() {
    const { locationList } = this.props
    console.log('locationList>>>>>>>',locationList)
    return (
      locationList.map(s =>
        <div key={s.key}>
          <Row gutter={16}>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img alt="example"
                    src={s.imagePath === null || s.imagePath === '' || s.imagePath === 'www.google.com'
                    ? 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'
                    : s.imagePath}
                  />
                }
              >
                <Meta
                  title={`${s.addressTitle}`}
                  description={`${s.address}`}
                />
              </Card>
            </Col>
            <Col span={18} >
              <h1>{`${s.addressTitle}`}</h1>
              <p><b>Contact: </b> {s.contact}</p>
              <p><b>roomSize: </b> {s.roomSize}</p>
              <p><b>Tel: </b> {s.tel}</p>
              <p><b>Note: </b> {s.note}</p>
              <address>
                <p><b>Adress Title:</b> { s.addressTitle }</p>
                <p><b>Adress:</b> { s.address }</p>
              </address>
            </Col>
          </Row>
          {/* <Row>
            <Col span={24}>
              { locationsDetail.length <= 0 ? 'Loading'
                : <AvaiDateTimeTable
                    title={'Locations Available DateTime'}
                    data={(({availDayTime}) => {
                      console.log(availDayTime)
                      return availDayTime.map(elm => {
                        return {
                          ...elm,
                          'am': elm.time === 'AM' ? 'YES' : 'NO',
                          'pm': elm.time === 'PM' ? 'YES' : 'NO',
                          'key': uuidv1()
                        }
                      })
                    })(...locationsDetail)}
                  />}
            </Col>
          </Row> */}
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
)(LocationsDetail)