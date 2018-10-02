import React, { Component } from 'react'
import './App.css'
import { Layout, Icon, Input } from 'antd'
import Main from './pages/Main'
import SideMenu from './components/SideMenu/SideMenu'

const { Header, Content } = Layout

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
    const Search = Input.Search

    return (
        <Layout className="App">
          <SideMenu style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} collapsed={collapsed} />
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={value => console.log(value)}
                style={{width: '93.5%'}}
              />

            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Main />
            </Content>
            
          </Layout>
        </Layout>
    )
  }
}

export default App
