import * as React from 'react'
import { Layout, Menu, Icon } from 'antd'
import './navbar.scss'
import GameGrid from '../gamegrid'
const { Header, Content, Sider } = Layout

interface Props {}

interface State {
  collapsed: boolean
  label: string
}

class NavBar extends React.Component<Props, State> {
  state: State = {
    collapsed: false,
    label: 'TicTac',
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      label: this.state.label === 'TicTac' ? 'TT' : 'TicTac',
    })
  }
  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={300}
          trigger={null}
          collapsible={true}
          onCollapse={(collapse, type) => {
            this.toggle()
          }}
          collapsed={this.state.collapsed}
        >
          <div className="logo">{this.state.label}</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>New Game</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>History</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            <GameGrid />
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default NavBar
