import React, { useContext } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Redirect } from 'react-router-dom'
import { Context } from '../../App'
import './Siderbar.scss'
interface Props {
  collapse: boolean
  label: string
}
const { Sider } = Layout
const Siderbar = (props: Props) => {
  const { state, dispatch } = useContext(Context)
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={300}
      trigger={null}
      collapsible={true}
      onCollapse={(collapse, type) => {
        dispatch({ type: 'press' })
      }}
      collapsed={state.collapse}
    >
      <div className="logo">{state.label}</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1">
          <Icon type="user" />
          <Redirect to="/">New Game</Redirect>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <Redirect to="/history">History</Redirect>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Siderbar
