import { Box, GAME_INITIALS, ICheckWinner, Winner, SuccessPattrens } from '../props'
import { stat } from 'fs'

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const CheckWinner: ICheckWinner = (dataset: Box[]): Winner => {
  let winningPlayer: Winner = { player: 0, draw: true }
  SuccessPattrens.forEach(pattren => {
    const f1 = dataset.filter(data => {
      return (
        data.id === `box${pattren[0]}` ||
        data.id === `box${pattren[1]}` ||
        data.id === `box${pattren[2]}`
      )
    })
    if (f1.length === 3) {
      if (f1[0].value === f1[1].value && f1[0].value === f1[2].value) {
        winningPlayer = { player: dataset[pattren[0]].player, draw: false }
        return
      }
    }
  })
  return winningPlayer
}
export const gameReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'reset':
      return GAME_INITIALS
    case 'click':
      const box: Box = action.payload
      const buttonIndex: number = parseInt(box.id.slice(-1), 10)
      const bDisable: boolean[] = state.buttonDisable
      bDisable[buttonIndex] = true
      return {
        ...state,
        boxes: [...state.boxes, box],
        step: state.step + 1,
        player: state.player === 1 ? 2 : 1,
        letter: state.letter === 'x' ? 'o' : 'x',
        buttonDisable: bDisable,
      }
    case 'winner':
      return {
        ...state,
        winnerPlayer: action.payload,
        player: 0,
        letter: '-',
      }
    case 'draw':
      return {
        ...state,
        winnerPlayer: 0,
        player: 0,
        letter: '-',
      }
    default:
      return state
  }
}
