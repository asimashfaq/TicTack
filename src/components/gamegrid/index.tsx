import React, { useReducer, useEffect, useCallback } from 'react'
import { Layout, PageHeader, Row, Col, Card, Typography, Result, Button, Modal } from 'antd'
import GameBox from './gamebox'
import './gamegrid.scss'
import { GAME_INITIALS, Winner } from './props'
import { sleep, gameReducer, CheckWinner } from './functions/Functions'
const { Text } = Typography
const animateDelay = 1000
interface Props {}

const GameGrid = () => {
  const [state, dispatch] = useReducer(gameReducer, GAME_INITIALS)
  useEffect(() => {
    console.log(state, 'wwww')
    if (state.step >= 5 && state.step < 9) {
      const result: Winner = CheckWinner(state.boxes)
      if (!result.draw && state.winnerPlayer === 0) {
        dispatch({ type: 'winner', payload: result.player })
      }
    } else if (state.step === 9) {
      const result: Winner = CheckWinner(state.boxes)
      if (!result.draw && state.winnerPlayer === 0) {
        dispatch({ type: 'winner', payload: result.player })
      } else {
        dispatch({ type: 'draw' })
      }
    }
    return
  }, [state])
  const btnCallBack = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id: string = event.currentTarget.id
      event.currentTarget.innerHTML = `<span>${state.letter}</span>`
      dispatch({
        type: 'click',
        payload: {
          id,
          player: state.player,
          value: state.letter,
          step: state.step,
        },
      })
    },
    [state]
  )

  const items = []

  // tslint:disable-next-line: no-increment-decrement
  for (let i = 0; i < 9; i++) {
    items.push(
      <GameBox id={`box${i}`} buttondisable={state.buttonDisable[i]} callback={btnCallBack} />
    )
  }
  return (
    <Layout className="gamegrid">
      <Row>{items}</Row>
    </Layout>
  )
}
export default GameGrid
