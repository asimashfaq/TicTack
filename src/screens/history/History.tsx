import React, { useReducer } from 'react'
import { Layout, Icon } from 'antd'
import Siderbar from '../siderbar/Siderbar'

const { Content } = Layout
class History extends React.Component {
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
        history
      </Content>
    )
  }
}

export default History
