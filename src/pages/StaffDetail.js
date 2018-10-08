import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStaff } from '../actions/staffActions'
import { Row, Col,Table } from 'antd';
class StaffDetail extends Component {

  componentDidMount() {
    this.props.fetchStaff(this.props.match.params.id)
  }

  render() {
    const { staffList } = this.props
    const columns = [ {
      title: 'Role',
      dataIndex: 'title'
    },{
      title: 'Manday Rate',
      dataIndex: 'mandayRate'
    }]
    return (

      staffList.map(s =>
        <div key={s.key}>
          <Row gutter={16}>
            <Col span={12} ><img style={{ width:'100%', borderRadius: '0.5rem' }} src={s.staffImage} /></Col>
            <Col span={12} >
              Firstname : {s.firstname} <br/>
              Lastname : {s.lastname}
            </Col>
          </Row>
          <Row gutter={16}>
          <Table
            rowKey={s => s.id}
            columns={columns}
            dataSource={s.role}
        />
        </Row>
        </div>
        
      )
    );
  }
}

const mapStateToProps = state => ({
  staffList: state.items.staff,
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