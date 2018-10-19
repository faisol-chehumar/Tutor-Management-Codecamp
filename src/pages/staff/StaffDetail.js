import React, { Component } from 'react'
import AvaiDateTimeTable from '../../components/AvailDateTimeTable/AvailDateTimeTable'
import ImageView from '../../components/PageView/ImageView'
import { Row, Col } from 'antd'
import {fetchData} from '../../utils/request';
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
        <div key={s.key}>
          <Row gutter={16}>
            <Col span={6}>
              <ImageView
                title={`${s.firstname} ${s.lastname}`}
                description={'www.instagram.com'}
                imagePath={s.imagePath}
                imageDefault={'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'}
              />
            </Col>
            <Col span={18} >
              <h1>{`${s.firstname} ${s.lastname}`}</h1>
              {s.role.map(r => (
                <span key={uuidv1()}>
                  {r.title === 'tch'
                    ? <p><b>Teacher:</b> ฿{r.mandayRate} Per/Hour</p>
                    : <p><b>TA:</b> ฿{r.mandayRate} Per/Hour</p>}
                </span>
              ))}
              <p><b>Email: </b> {s.email}</p>
              <p><b>Tel: </b> {s.tel === null && 'N/A'}</p>
              <address>
                <p><b>Adress Title:</b> {s.addressTitle === null && 'N/A'}</p>
                <p><b>Adress:</b> {s.address === null && 'N/A'}</p>
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
                      return {
                        ...elm,
                        'am': elm.time === 'AM' ? 'YES' : 'NO',
                        'pm': elm.time === 'PM' ? 'YES' : 'NO',
                        'key': uuidv1()
                      }
                    })
                  })(...staffDetail)}
                />}
            </Col>
          </Row>
        </div>

      )
    );
  }
}

export default StaffDetail 