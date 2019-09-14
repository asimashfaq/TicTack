import React from 'react'
import './styles/sass/App.scss'
import NavBar from './components/navbar'
import { Layout } from 'antd'

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar />
    </Layout>
  )
}
export default App
