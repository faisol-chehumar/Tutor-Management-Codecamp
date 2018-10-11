import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getSideMenu } from '../../actions/sideMenuActions'

const { Sider } = Layout
const Logo = styled.div`
  font-size: 1.2em;
  font-weight: 800;
  color: #fff;
  padding: 1.2rem 1rem;
  background-color: #003e79;
`

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSideMenu: getSideMenu(this.props.location.pathname)
    }
  }

  render() {
    const { currentSideMenu } = this.state
    const { menuList } = this.props

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <Logo>Tutor Management</Logo>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${currentSideMenu}`]}>
          {
            menuList.map(({link, icon, title}, index) => (
                <Menu.Item key={index}>
                  <Link to={link}>
                    <Icon type={icon} theme="outlined" />
                    <b>{title.toUpperCase()}</b>
                  </Link>
                </Menu.Item>
              )
            )
          }
        </Menu>
      </Sider>
    )
  }
}

const mapStateToProps = state => ({
  menuList: state.items.menuList,
  currentSideMenu: state.items.currentSideMenu
})

const mapDispatchToProps = {
  getSideMenu
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideMenu))