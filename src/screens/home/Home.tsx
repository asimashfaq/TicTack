import React, { useReducer } from 'react'
import { Layout, Icon } from 'antd'

import GameGrid from '../../components/gamegrid'
const { Content } = Layout
const Home = () => {
  return (
    <div>
      <GameGrid />
    </div>
  )
}

export default Home
