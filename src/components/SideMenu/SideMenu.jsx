import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout

class SideMenu extends Component {


  constructor (props) {
    super(props)
    this.state = {
      defaultSelectKey: this.getDefaultMenu(),
      menuList: [
        { link: '/', title: 'Dashboard', icon: 'appstore' },
        { link: '/courses', title:'Courses', icon: 'audit' },
        { link: '/staff', title: 'Staff', icon: 'team' },
        { link: '/customers', title: 'Customers', icon: 'user' },
        { link: '/locations', title: 'Locations', icon: 'environment' }
      ]
    }
  } 
  
  getDefaultMenu = () => {
    if(this.props.location.pathname === '/') {
      return 0
    }
    if(this.props.location.pathname === '/courses') {
      return 1
    }
    if(this.props.location.pathname === '/staff') {
      return 2
    }
    if(this.props.location.pathname === '/customers') {
      return 3
    }
    if(this.props.location.pathname === '/locations') {
      return 4
    }
  }

  render() {
    const { menuList, defaultSelectKey } = this.state

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${defaultSelectKey}`]}>
          {
            menuList.map(({link, icon, title}, index) => (
                <Menu.Item key={index}>
                  <Link to={link}>
                    <Icon type={icon} theme="outlined" />
                    <span>{title}</span>
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

export default withRouter(SideMenu)