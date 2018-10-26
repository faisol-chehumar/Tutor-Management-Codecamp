import React, { Component } from 'react'
import { Layout, Icon, Avatar, Badge, Input } from 'antd'
import './App.css'
import styled from 'styled-components'

import Main from './pages/Main'
import SideMenu from './components/SideMenu/SideMenu'
import color from './styles/color'

const { Header, Content } = Layout
const Search = Input.Search


const ContentLayout = styled(Layout)`
  background-color: ${color.base};
  margin-left: 80px;
  transition: margin-left 0.1s;

  &.extended {
    margin-left: 200px
  }

  h1, h2, h3, h4, h5, h6,
  body {
    color: ${color.black};
  }

  .ant-card {
    border-radius: 8px !important;
  }

  a {
    color: ${color.hilight};
  }
`

const HeaderContainer = styled(Header)`
  border-bottom: 1px solid ${color.shadow}
  background: #fff;
  padding: 0
`

const SearchContainer = styled(Search)`
  width: 60%;

  .ant-btn-primary {
    background-color: ${color.hilight};
    border-color: ${color.shadow};
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

const BadgeContainer = styled.div`
  display: inline-block;
  float: right;

  .anticon {
    font-size: 1.5rem;
  }

  .anticon,
  .ant-badge-count,
  .ant-badge-dot {
    margin-right: 1.5rem;
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
                  <span style={{ marginRight: '1rem' }}>
                    <Avatar
                      style={{ border: '1px solid #eee' }}
                      src="data:image/png;base64,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"
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
