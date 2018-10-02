import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout

const menuList = [
  { link: '/', title: 'Dashboard', icon: 'appstore' },
  { link: '/courses', title:'Courses', icon: 'audit' },
  { link: '/staff', title: 'Staff', icon: 'team' },
  { link: '/customers', title: 'Customers', icon: 'user' }
]

const SideMenu = props => (
  <Sider
    trigger={null}
    collapsible
    collapsed={props.collapsed}
  >
    <div className="logo" />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
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

export default SideMenu