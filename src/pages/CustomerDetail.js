import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCustomers } from '../actions/customersActions'
import { Row, Col, Card } from 'antd'
const { Meta } = Card
const uuidv1 = require('uuid/v1')

class CustomerDetail extends Component {
  componentDidMount() {
    this.props.fetchCustomers(this.props.match.params.id)
    console.log(this.props.match.params.id)
  }
  render() {
    const { customerList } = this.props
    console.log('customerList>>>>>>>',customerList)
    return (
      customerList.map(s =>
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
              <p><b>Email: </b> {s.email}</p>
              <p><b>Tel: </b> {s.tel === null && 'N/A'}</p>
              <p><b>Child Age: </b> {s.childAge}</p>
              <p><b>Actived Status: </b> {s.activedStatus}</p>
              <address>
                <p><b>Adress Title:</b> { s.addressTitle}</p>
                <p><b>Adress:</b> { s.address}</p>
              </address>
            </Col>
          </Row>
        </div>
        
      )
    );
  }
}

const mapStateToProps = state => ({
  customerList: state.items.customers,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchCustomers
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetail)