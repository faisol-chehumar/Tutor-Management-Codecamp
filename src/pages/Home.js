import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Divider } from 'antd'
import styled from 'styled-components'

import FullCalendar from '../components/FullCalendar/FullCalendar'
import CountBoxList from '../components/CountBox/CountBoxList'
import ListContent from '../components/List/ListContent'
import actions from '../actions/index'
import color from '../styles/color'

const { fetchStaff, fetchCourses, fetchLocations, fetchCustomers } = actions

const ContentBlock = styled.div`
  margin-bottom: 3rem;
`

const TitleDivider = styled(Divider)`
  color: ${color.lightGray}

  h4 {
    color: ${color.hilight} !important;
  }
`

class Home extends Component {
  state = {
    menuCountList: {}
  }

  async componentDidMount() {
    try {
      await Promise.all([
        this.props.staffList.length === 0 && this.props.fetchStaff(),
        this.props.coursesList.length === 0 && this.props.fetchCourses(),
        this.props.locationsList.length === 0 && this.props.fetchLocations(),
        this.props.customersList.length === 0 && this.props.fetchCustomers(),
      ])

      const menuCountList = {
        staff: this.props.staffList.length,
        courses: this.props.coursesList.length,
        locations: this.props.locationsList.length,
        customers: this.props.customersList.length
      }

      this.setState({menuCountList})

    } catch (error) {
      console.error('Fetch Error:', error )
    }
  }

  render() {
    const { menuTitleList, menuCaptions, menuAvatar, coursesList } = this.props
    const { menuCountList } = this.state
    
    return (
      <div>
        <ContentBlock>
          <Row gutter={16}>
            <Col span={24}>
              <TitleDivider orientation="left"><h4>Overview Summaries</h4></TitleDivider>
            </Col>
            <Col span={24}>
              <CountBoxList
                avatar={menuAvatar}
                titles={menuTitleList}
                counts={menuCountList}
                captions={menuCaptions}
              />
            </Col>
          </Row>
        </ContentBlock>

        <ContentBlock>
          <Row gutter={16}>
            <Col span={24}>
              <TitleDivider orientation="left"><h4>Courses Schedule</h4></TitleDivider>
            </Col>
            <Col span={24}>
              <Card>
                <FullCalendar />
              </Card>
            </Col>
          </Row>
        </ContentBlock>

        <ContentBlock>
          <Row gutter={16}>
            <Col span={24}>
              <TitleDivider orientation="left"><h4>Courses List</h4></TitleDivider>
            </Col>
            <Col span={24}>
              <ListContent listData={coursesList} />
            </Col>
          </Row>
        </ContentBlock>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  menuTitleList: state.items.menuList
    .filter(menu => menu.title !== 'dashboard')
    .map(menu => menu.title),
  menuCaptions: state.items.menuList
    .filter(menu => menu.title !== 'dashboard')
    .map(menu => menu.captions),
  menuAvatar: state.items.menuList
    .filter(menu => menu.title !== 'dashboard')
    .map(menu => menu.icon),
  staffList: state.items.staff,
  coursesList: state.items.courses,
  locationsList: state.items.locations,
  customersList: state.items.customers,
})

const mapDispatchToProps = {
  fetchStaff,
  fetchCourses,
  fetchLocations,
  fetchCustomers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)