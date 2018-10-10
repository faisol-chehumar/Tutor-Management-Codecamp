import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStaff } from '../actions/staffActions'
import { Row, Col, Card } from 'antd'
import AvaiDateTimeTable from '../components/AvailDateTimeTable/AvailDateTimeTable'
const { Meta } = Card
const uuidv1 = require('uuid/v1')

class StaffDetail extends Component {
  componentDidMount() {
    this.props.fetchStaff(this.props.match.params.id)
    console.log(this.props.match.params.id)
  }

  render() {
    const { staffDetail } = this.props
    console.log(staffDetail)
    // let data = staffDetail.availDayTime.map(elm => {
    //   return {
    //     ...elm,
    //     'AM': elm.time === 'AM' ? 'YES' : 'NO',
    //     'PM': elm.time === 'PM' ? 'YES' : 'NO'
    //   }
    // })

    return (
      staffDetail.map(s =>
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
                  title={`${s.firstname} ${s.lastname}`}
                  description="www.instagram.com"
                />
              </Card>
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
                <p><b>Adress Title:</b> { s.addressTitle === null && 'N/A' }</p>
                <p><b>Adress:</b> { s.address === null && 'N/A' }</p>
              </address>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              { staffDetail.length <= 0 ? 'Loading'
                : <AvaiDateTimeTable
                    title={'Staff Available DateTime'}
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
                    })(...staffDetail)}
                  />}
            </Col>
          </Row>
        </div>
        
      )
    );
  }
}

const mapStateToProps = state => ({
  staffDetail: state.items.staffDetail, 
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchStaff
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffDetail)