import React, { Component } from 'react'
import { Row, Col, Divider, List, Avatar } from 'antd'
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
      courseDetail.length <= 0 ? <div>Loading</div> :
      courseDetail.map(s =>
        <div style={{ backgroundColor: '#fff', padding: '2rem', border: `1px solid ${color.shadow}` }} key={s.key}>
          <h1>{`${s.title}`}</h1>
          <Row gutter={24}>
            <Col span={12}>
              <div style={{ borderRadius: '8px', border: `1px solid ${color.shadow}`, padding: '1rem', marginBottom: '2rem' }}>
                <img src={s.imagePath} width="100%" alt={s.title} />
              </div>
            </Col>
            <Col span={12} >
              <div>
                <p style={{fontSize: 18}}>{s.description}</p>
                <p><b>StartDate: </b> {moment(s.startDate).format('YYYY/MM/DD')}</p>
                <p><b>EndDate: </b> {moment(s.endDate).format('YYYY/MM/DD')}</p>
              </div>
            </Col>
          </Row>

          <Row gutter={24} style={{ marginBottom: '2rem' }}>
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
                        'status': 'N/A',
                        'key': uuidv1()
                      }
                      : {
                        ...elm,
                        'am': <b style={{color: 'green'}}>YES</b>,
                        'pm': <b style={{color: 'green'}}>YES</b>,
                        'status': 'N/A',
                        'key': uuidv1()
                      })
                    })
                  })(...courseDetail)}
                />}
            </Col>
          </Row>

          <Row gutter={24}>
            <Divider orientation="left"><h3>Class Location</h3></Divider>
            <Col span={12}>
              <div style={{border: `1px solid ${color.shadow}`, borderRadius: 8, padding: '1rem'}}>
                <GoogleMapSearch lat={s.lat} lng={s.lng} search={false} />              
              </div>              
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

          <Row>
            <Divider orientation="left"><h3>Teacher Register</h3></Divider>
            <Col span={24}>
              <List
                itemLayout="horizontal"
                dataSource={s.staffRegistration.filter(staff => staff.regisRole === 1)}
                renderItem={item => (
                  <List.Item>
                    {console.log(item)}
                    <List.Item.Meta
                      avatar={<Avatar src={item.imagePath || 'https://res.cloudinary.com/dbzxmgk2h/image/upload/v1540544187/003-worker-1.png'} />}
                      title={<a href={`/staff/${item.staffId}`}>{`${item.firstname.toUpperCase()} ${item.lastname.toUpperCase()}`}</a>}
                      description={`Register as: Teacher, Email: ${item.email}, Tel: ${item.tel}`}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>

          <Row>
            <Divider orientation="left"><h3>TA Register</h3></Divider>
            <Col span={24}>
              <List
                itemLayout="horizontal"
                dataSource={s.staffRegistration.filter(staff => staff.regisRole === 2)}
                renderItem={item => (
                  <List.Item>
                    {console.log(item)}
                    <List.Item.Meta
                      avatar={<Avatar src={item.imagePath || 'https://res.cloudinary.com/dbzxmgk2h/image/upload/v1540544187/003-worker-1.png'} />}
                      title={<a href={`/staff/${item.staffId}`}>{`${item.firstname.toUpperCase()} ${item.lastname.toUpperCase()}`}</a>}
                      description={`Register as: TA, Email: ${item.email}, Tel: ${item.tel}`}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>

          <Row>
            <Divider orientation="left"><h3>Customers Enrolment</h3></Divider>
            <Col span={24}>
              <List
                itemLayout="horizontal"
                dataSource={s.coursesEnrolment}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item[0].imagePath || 'https://res.cloudinary.com/dbzxmgk2h/image/upload/v1540544187/003-worker-1.png'} />}
                      title={<a href={`/customer/${item[0].customerId}`}>{`${item[0].firstname.toUpperCase()} ${item[0].lastname.toUpperCase()}`}</a>}
                      description={`Active Status: ${item[0].activedStatus && 'YES'}, Child Age: ${item[0].childAge}, Tel: ${item[0].tel}`}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
      )
    )
  }
}

export default CourseDetail