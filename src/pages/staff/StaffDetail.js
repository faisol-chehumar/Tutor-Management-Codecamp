import React, { Component } from 'react'
import { Row, Col, Divider, Tag, Icon, Divinder } from 'antd'

import {fetchData} from '../../utils/request'
import AvaiDateTimeTable from '../../components/AvailDateTimeTable/AvailDateTimeTable'
import ImageView from '../../components/PageView/ImageView'
import GoogleMapSearch from '../../components/GoogleMap/GoogleMapSearch'
import color from '../../styles/color'

const uuidv1 = require('uuid/v1')

class StaffDetail extends Component {
  state = {
    staffDetail : []
  }

  async componentDidMount() {
    this.setState({ staffDetail :  await fetchData('staff/' + this.props.match.params.id) })
    console.log(this.props.match.params.id)
  }

  render() {
    const { staffDetail } = this.state
    console.log(staffDetail)

    return (
      staffDetail.map(s =>
        <div style={{ backgroundColor: '#fff', padding: '2rem', border: `1px solid ${color.shadow}` }} key={s.key}>
          <Row gutter={16}>
            <Col span={6}>
              <ImageView
                // title={`${s.firstname} ${s.lastname}`}
                imagePath={s.imagePath}
                imageDefault={'https://res.cloudinary.com/dbzxmgk2h/image/upload/v1540528677/002-worker-3.png'}
              />
            </Col>
            <Col span={18} >
              <h1>{`${s.firstname.toUpperCase()} ${s.lastname.toUpperCase()}`}</h1>
              {s.role.map(r => (
                <div key={uuidv1()}>
                  {r.title === 'tch'
                    ? <div style={{ marginBottom: '0.5rem' }}><Icon type="tag" theme="outlined" /><Divider type="vertical" /><b> Teacher: </b><Tag color="green">{'฿'+r.mandayRate}</Tag> Per/Hour</div>
                    : <div style={{ marginBottom: '0.5rem' }}><Icon type="tag" theme="outlined" /><Divider type="vertical" /><b> TA: </b><Tag color="green">{'฿'+r.mandayRate}</Tag> Per/Hour</div>}
                </div>
              ))}
              <div style={{ marginBottom: '0.5rem' }}><Icon type="mail" theme="outlined" /><Divider type="vertical" /><b> Email: </b> {s.email || 'N/A'}</div>
              <div style={{ marginBottom: '0.5rem' }}><Icon type="phone" theme="outlined" /><Divider type="vertical" /><b> Tel: </b> {s.tel || 'N/A'}</div>
              <address>
                <div style={{ marginBottom: '0.5rem' }}><Icon type="environment" theme="outlined" /><Divider type="vertical" /><b> Adress Title:</b> {s.addressTitle || 'N/A'}</div>
                <div style={{ marginBottom: '0.5rem' }}><Icon type="car" theme="outlined" /><Divider type="vertical" /><b> Adress:</b> {s.address || 'N/A'}</div>
              </address>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {staffDetail.length <= 0 ? 'Loading'
                : <AvaiDateTimeTable
                  title={'Staff Available DateTime'}
                  data={(({ availDayTime }) => {
                    console.log(availDayTime)
                    return availDayTime.map(elm => {
                      return ( elm.time !== 'fullDay'
                      ? {
                        ...elm,
                        'am': elm.time === 'am' ? <b style={{color: 'green'}}>YES</b> : <b style={{color: 'red'}}>NO</b>,
                        'pm': elm.time === 'pm' ? <b style={{color: 'green'}}>YES</b> : <b style={{color: 'red'}}>NO</b>,
                        'fullDay': elm.time === 'fullDay' ? <b style={{color: 'green'}}>YES</b> : null,
                        'status': elm.status === 'a' ? <Tag color="green">Available</Tag> : <Tag color="orange">Maybe</Tag>,
                        'key': uuidv1()
                      }
                      : {
                        ...elm,
                        'am': <b style={{color: 'green'}}>YES</b>,
                        'pm': <b style={{color: 'green'}}>YES</b>,
                        'status': elm.status === 'a' ? <Tag color="green">Available</Tag> : <Tag color="orange">Maybe</Tag>,
                        'key': uuidv1()
                      })
                    })
                  })(...staffDetail)}
                />}
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
    )
  }
}

export default StaffDetail 