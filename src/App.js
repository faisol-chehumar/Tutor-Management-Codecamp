import React, { Component } from 'react'
import { Layout, Icon, Avatar, Badge, Divider, Input } from 'antd'
import './App.css'
import styled from 'styled-components'

import Main from './pages/Main'
import SideMenu from './components/SideMenu/SideMenu'
import color from './styles/color'

const { Header, Content } = Layout
const Search = Input.Search


const ContentLayout = styled(Layout)`
  background-color: ${color.base}
`

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
          <ContentLayout>
            <Header
              style={{ background: '#fff', padding: 0 }}>
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
              <div style={{display: 'inline', float: 'right'}}>
                <Badge style={{ marginRight: '1rem', backgroundColor: '#f0d000' }} count={1}>
                  <Avatar style={{ backgroundColor: '#003e79' }} shape="square" icon="bell" />
                </Badge>
                <Divider type="vertical" />
                <Badge style={{ marginRight: '1rem' }} count={1}>
                  <Avatar style={{ backgroundColor: '#003e79' }} shape="square" icon="mail" />
                </Badge>
                <Divider type="vertical" />
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
                margin: '24px 16px',
                padding: 24,
                minHeight: 280 
              }}>
              <Main />
            </Content>
          </ContentLayout>
        </Layout>
    )
  }
}

// const mapStateToProps = state => ({
//   staffList: state.items.staff,
//   coursesList: state.items.courses,
//   locationsList: state.items.locations,
//   customersList: state.items.customers,
//   loading: state.items.loading,
//   error: state.items.error
// })

// const mapDispatchToProps = {
//   fetchStaff,
//   fetchCourses,
//   fetchLocations,
//   fetchCustomers
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App)

export default App
