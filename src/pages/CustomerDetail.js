import React, { Component } from 'react'
import { fetchData } from '../utils/request'
import ImageView from '../components/PageView/ImageView'
import { Row, Col } from 'antd'

class CustomerDetail extends Component {
  state = {
    customerDetail : []
  }

  async componentDidMount() {
    this.setState({ customerDetail :  await fetchData('customers/' + this.props.match.params.id) })
    console.log(this.props.match.params.id)
  }

  render() {
    const { customerDetail } = this.state
    console.log(customerDetail)

    return (
      customerDetail.map(s =>
        <div key={s.key}>
          <Row gutter={16}>
            <Col span={6}>
              <ImageView
                title={`${s.firstname} ${s.lastname}`}
                description={'www.instagram.com'}
                imagePath={s.imagePath}
                // imageDefault={'https://png2.kisspng.com/20180404/wpw/kisspng-computer-icons-users-group-internet-forum-user-avatar-5ac45a994caa27.692612531522817689314.png'}
              />
            </Col>
            <Col span={18} >
              <h1>{`${s.firstname} ${s.lastname}`}</h1>
              <p><b>Email: </b> {s.email}</p>
              <p><b>Tel: </b> {s.tel === null && 'N/A'}</p>
              <p><b>Child Age: </b> {s.childAge}</p>
              <p><b>Actived Status: </b> {s.activedStatus}</p>
              <address>
                <p><b>Adress Title:</b> {s.addressTitle}</p>
                <p><b>Adress:</b> {s.address}</p>
              </address>
            </Col>
          </Row>
        </div>

      )
    )
  }
}


export default CustomerDetail