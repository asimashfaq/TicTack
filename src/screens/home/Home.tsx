import React, { useReducer } from 'react'
import { Layout, Icon } from 'antd'
import Siderbar from '../siderbar/Siderbar'
import { Link } from 'react-router-dom'

const { Content } = Layout
class Home extends React.Component {
  render() {
    return (
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 280,
        }}
      >
        Home
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
      </Content>
    )
  }
}

export default Home