import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import FullCalendar from '../components/FullCalendar/FullCalendar'
import { Row, Col, Card } from 'antd'
import CountBox from '../components/CountBox/CountBox'
import { fetchData } from '../utils/request'

class Home extends Component {
  async componentDidMount() {
    console.log(this.props)
    try {
      const [ staff, courses, locations, customers ] = await Promise.all([
        fetchData('staff'),
        fetchData('courses'),
        fetchData('locations'),
        fetchData('customers')
      ])

      // const menuList = [
      //   { title: 'staff' , count: staff.length || 0 },
      //   { title: 'courses', count: courses.length || 0 },
      //   { title: 'locations', count: locations.length || 0 },
      //   { title: 'customers', count: customers.length || 0 }
      // ]

      // await this.setState({menuList})

    } catch (error) {
      alert('Error')
    }
  }

  render() {
    const { menuList } = this.props
    
    return (
      
      <div>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          {
            menuList.map((title, index) => (
              <Col
                className="gutter-row"
                span={24/menuList.length}
                key={title}>
                <Link to={title}>
                  <Card >
                    <CountBox
                      key={index}
                      title={title}
                      count={this.props.title !== undefined ? this.props.title.length : 0}
                    />
                  </Card>
                </Link>
              </Col>
            ))
          }
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


export default connect(
  mapStateToProps
)(Home)