import React, { Component } from 'react'
import { Row, Col, Divider } from 'antd'
import moment from 'moment'

import { fetchData } from '../../utils/request'
// import ImageView from '../../components/PageView/ImageView'
import GoogleMapSearch from '../../components/GoogleMap/GoogleMapSearch'
import color from '../../styles/color'
import AvaiDateTimeTable from '../../components/AvailDateTimeTable/AvailDateTimeTable'
const uuidv1 = require('uuid/v1')

class CourseDetail extends Component {
  state = {
    courseDetail : []
  }

  async componentDidMount() {
    this.setState({ courseDetail :  await fetchData('courses/' + this.props.match.params.id) })
  }

  render() {
    const { courseDetail } = this.state
    console.log(courseDetail)

    return (
      courseDetail.map(s =>
        <div style={{ backgroundColor: '#fff', padding: '2rem', border: `1px solid ${color.shadow}` }} key={s.key}>
          <Row gutter={16}>
            <Col span={24}>
              <h1>{`${s.title}`}</h1>
              <div style={{ borderRadius: '8px', border: `1px solid ${color.shadow}`, padding: '1rem', marginBottom: '2rem' }}>
                <div style={{paddingBottom: '20rem', backgroundImage: `url(${s.imagePath})`, backgroundSize: 'cover' }} />
              </div>
            </Col>
            <Col span={24} >
              <Divider orientation="left"><h3>Course Info</h3></Divider>
              <div>
                <p style={{fontSize: 21}}>{s.description}</p>
                <p><b>StartDate: </b> {moment(s.startDate).format('YYYY/MM/DD')}</p>
                <p><b>EndDate: </b> {moment(s.endDate).format('YYYY/MM/DD')}</p>
              </div>
            </Col>
          </Row>
          {console.log(s)}
          <Row>
            <Col span={24}>
              {s.coursesSchedule <= 0 ? 'Loading'
                : <AvaiDateTimeTable
                  title={'Course Schedules'}
                  data={(({ coursesSchedule }) => {
                    return coursesSchedule.map(elm => {
                      return ( elm.timeCode !== 'fullDay'
                      ? {
                        ...elm,
                        'am': elm.timeCode === 'am' ? <b style={{color: 'green'}}>YES</b> : <b style={{color: 'red'}}>NO</b>,
                        'pm': elm.timeCode === 'pm' ? <b style={{color: 'green'}}>YES</b> : <b style={{color: 'red'}}>NO</b>,
                        'fullDay': elm.timeCode === 'fullDay' ? <b style={{color: 'green'}}>YES</b> : null,
                        'key': uuidv1()
                      }
                      : {
                        ...elm,
                        'am': <b style={{color: 'green'}}>YES</b>,
                        'pm': <b style={{color: 'green'}}>YES</b>,
                        'key': uuidv1()
                      })
                    })
                  })(...courseDetail)}
                />}
            </Col>
          </Row>

          <Row gutter={16}>
            <Divider orientation="left"><h3>Class Location</h3></Divider>
            <Col span={12}>
             
              <GoogleMapSearch lat={s.lat} lng={s.lng} search={false} />
            </Col>
            <Col span={12}>
                <address>
                  <p><b>Adress Title:</b> {s.location[0].addressTitle}</p>
                  <p><b>Adress:</b> {s.location[0].address}</p>
                  <p><b>Room Size:</b> {s.location[0].address}</p>
                  <p><b>Contact:</b> {s.location[0].contact}</p>
                  <p><b>Telephone:</b> {s.location[0].tel}</p>
                  <p><b>Note:</b> {s.location[0].note}</p>
                </address>
            </Col>
          </Row>
        </div>
      )
    )
  }
}

export default CourseDetail