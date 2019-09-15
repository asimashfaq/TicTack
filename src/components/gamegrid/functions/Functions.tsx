import { GAME_INITIALS } from '../props'
import { stat } from 'fs'

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const gameReducer = (state: any, action: any) => {
  switch (action.tye) {
    case 'reset':
      return GAME_INITIALS
    case 'click':
      return {
        ...state,
        boxes: [...state.boxes, action.payload],
      }
    default:
      return state
  }
}
