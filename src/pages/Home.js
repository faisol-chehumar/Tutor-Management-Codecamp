import React, { Component } from 'react'
import { connect } from 'react-redux'
import FullCalendar from '../components/FullCalendar/FullCalendar'
import { Row, Col, Card } from 'antd'
import CountBoxList from '../components/CountBox/CountBoxList'
import { fetchData } from '../utils/request'


class Home extends Component {
  state = {
    menuCountList: {}
  }

  async componentDidMount() {
    try {
      const [staff, courses, locations, customers] = await Promise.all([
        fetchData('staff'),
        fetchData('courses'),
        fetchData('locations'),
        fetchData('customers')
      ])

      const menuCountList = {
        staff: staff.length,
        courses: courses.length,
        locations: locations.length,
        customers: customers.length
      }

      this.setState({menuCountList})

    } catch (error) {
      console.error('Fetch Error:', error )
    }
  }

  render() {
    console.log('Home Render')
    const { menuTitleList } = this.props
    const { menuCountList } = this.state
    
    return (
      <div>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          { menuTitleList.length > 0 ? <CountBoxList titles={menuTitleList} counts={menuCountList} /> : 'Loading' }
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Card>
              <FullCalendar />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  menuTitleList: state.items.menuList.filter(menu => menu.title !== 'dashboard').map(menu => menu.title),
  staff: state.items.staff,
  courses: state.items.courses,
  locations: state.items.locations,
  customers: state.items.customers
})

export default connect(
  mapStateToProps
)(Home)