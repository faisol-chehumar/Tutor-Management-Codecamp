import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getSideMenu } from '../../actions/sideMenuActions'

const { Sider } = Layout

const Logo = styled.div`
  font-size: 1m;
  font-weight: 800;
  color: #fff;
  padding: 1.2rem 1rem;
  background-color: #003e79;

  .logo-txt-hilight {
    color: #ffed00;
  }

  .ant-layout-sider-collapsed & {
    font-size: 10px;

    .logo-txt-hilight {
      display: block;
      font-size: 12px;
    }

    .logo-txt-small {
      font-size: 6px;
    }
  }
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
        <Logo>
          <span className="logo-txt-hilight">TUTOR </span> 
          <span className="logo-txt-small">MANAGEMENT</span>
        </Logo>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${currentSideMenu}`]}>
          {
            menuList.map(({link, icon, title}, index) => (
                <Menu.Item key={index}>
                  <Link to={link}>
                    <Icon type={icon} theme="outlined" />
                    <span>{title.toUpperCase()}</span>
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