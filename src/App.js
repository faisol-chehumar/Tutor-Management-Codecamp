import React, { Component } from 'react'
import { Layout, Icon, Avatar, Badge, Input } from 'antd'
import './App.css'

import Main from './pages/Main'
import SideMenu from './components/SideMenu/SideMenu'

import color from './styles/color'

const { Header, Content } = Layout
const Search = Input.Search;

class App extends Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    const { collapsed } = this.state

    return (
        <Layout className="App">
          <SideMenu
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
            collapsed={collapsed}
          />
          <Layout>
            <Header
              style={{
                backgroundImage: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
                padding: 0,
              }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <Search
                style={{ width: 800 }}
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={value => console.log(value)}
              />
              <div
                style={{
                  display: 'inline', 
                  float: 'right'
                }}>
                <Badge 
                  style={{
                    marginRight: '2rem',
                    backgroundColor: '#f0d000'
                  }} 
                  count={1}
                >
                  <Avatar
                    style={{
                      backgroundColor: color.darkgray,
                      border: `1px solid ${color.darkgrayLighter}`
                    }}
                    shape="square" icon="bell" />
                </Badge>

                <Badge
                  style={{
                    marginRight: '2rem'
                  }}
                  count={1}
                >
                  <Avatar
                    style={{
                      backgroundColor: color.darkgray,
                      border: `1px solid ${color.darkgrayLighter}`
                    }}
                    shape="square"
                    icon="mail"
                  />
                </Badge>

                <span style={{ marginRight: '1rem' }}>
                  <Avatar
                    style={{ border: '1px solid #eee' }}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                  <b style={{ marginLeft: '0.5rem' }}>ADMIN</b>
                </span>
              </div>
            </Header>
            <Content
              style={{
                backgroundColor: '#eeeeee0a',
                border: '1px solid #eeeeee0f',
                margin: '24px 16px',
                padding: 24,
                minHeight: 280 
              }}>
              <Main />
            </Content>
          </Layout>
        </Layout>
    )
  }
}

export default App
