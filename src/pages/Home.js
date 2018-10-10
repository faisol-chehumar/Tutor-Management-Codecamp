import React, { Component } from 'react'
import { connect } from 'react-redux'
import FullCalendar from '../components/FullCalendar/FullCalendar'
import { Row, Col, Card } from 'antd'
import CountBoxList from '../components/CountBox/CountBoxList'
import actions from '../actions/index'
// const { fetchStaff, fetchCourses, fetchLocations, fetchCustomers } = actions
import { fetchData } from '../utils/request'


class Home extends Component {
  state = {
    menuListData: []
  }

  async componentDidMount() {
    try {
      // await Promise.all([
      //   this.props.fetchStaff(),
      //   this.props.fetchCourses(),
      //   this.props.fetchLocations(),
      //   this.props.fetchCustomers()
      // ])
      const menuListData = this.props.menuList.map(async menu => {
        return {
          title: menu,
          count: await fetchData(menu)
        }
      })
      this.setState({menuListData})

    } catch (error) {
      console.error('Fetch Error:', error )
    }
  }

  render() {
    console.log('Home Render')
    // const { menuList } = this.props
    const { menuListData } = this.state
    console.log(menuListData)
    // const menuListData = menuList.map( menu => {
    //   return {
    //     title: menu,
    //     count: this.props[menu].length
    //   }
    // })
    
    return (
      <div>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <CountBoxList dataSource={menuListData} />
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
  menuList: state.items.menuList.filter(menu => menu.title !== 'dashboard').map(menu => menu.title),
  staff: state.items.staff,
  courses: state.items.courses,
  locations: state.items.locations,
  customers: state.items.customers
})

// const mapDispatchToProps = {
//   fetchStaff,
//   fetchCourses,
//   fetchLocations,
//   fetchCustomers
// }


export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Home)