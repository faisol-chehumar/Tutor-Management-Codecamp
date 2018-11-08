import React, { Component } from 'react'
import { Layout, Icon, Badge, Avatar, Input } from 'antd'
import styled from 'styled-components'

import Main from './pages/Main'
import SideMenu from './components/SideMenu/SideMenu'
import color from './styles/color'
import './App.css'

const { Header, Content } = Layout
const Search = Input.Search

const ContentLayout = styled(Layout)`
  background-color: ${color.base}
  margin-left: 80px
  transition: margin-left 0.1s

  &.extended {
    margin-left: 200px
  }

  h1, h2, h3, h4, h5, h6,
  body {
    color: ${color.black}
  }

  a {
    color: ${color.hilight}
  }

  .ant-card {
    border-radius: 8px !important
  }
`

const HeaderContainer = styled(Header)`
  border-bottom: 1px solid ${color.shadow}
  background: #fff
  padding: 0
`

const SearchContainer = styled(Search)`
  width: 60%

  .ant-btn-primary {
    background-color: ${color.hilight}
    border-color: ${color.shadow}
    padding-left: 2rem
    padding-right: 2rem
  }
`

const BadgeContainer = styled.div`
  display: inline-block
  float: right

  .anticon {
    font-size: 1.5rem
  }

  .anticon,
  .ant-badge-count,
  .ant-badge-dot {
    margin-right: 1.5rem
  }
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
          <SideMenu collapsed={collapsed} />
          <ContentLayout className={this.state.collapsed ? null : 'extended'}>
            <HeaderContainer>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <SearchContainer
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={value => console.log(value)}
              />

                <BadgeContainer>
                  <Badge style={{ backgroundColor: '#f0d000' }} count={1}>
                    <Icon twoToneColor={color.primary} type="bell" theme="twoTone" />
                  </Badge>
                  <Badge count={1}>
                    <Icon twoToneColor={color.primary} type="mail" theme="twoTone" />
                  </Badge>
                  <span style={{ marginRight: '3rem' }}>
                    <Avatar
                      style={{ border: '1px solid #eee' }}
                      src="https://eabiawak.com/wp-content/uploads/2017/07/photo.png"
                    />
                    <b style={{ marginLeft: '0.5rem' }}>ADMIN</b>
                  </span>
                </BadgeContainer>

            </HeaderContainer>
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

export default App
