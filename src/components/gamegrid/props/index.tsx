import { InitalizeGame } from '../functions/Functions'
export interface Box {
  id: string
  player: number
  value: string
  step: number
}
export interface Game {
  boxes: Box[]
  player: number
  player1: string
  player2: string
  step: number
  letter: string
  loading: boolean
  successModalVisible: boolean
  winnerPlayer: number
  buttonDisable: boolean[]
  replay: boolean
  replyModalVisible: boolean
  drawModalVisible: boolean
}

export const GAME_INITIALS: Game = InitalizeGame()
export interface Winner {
  player: number
  draw: boolean
}
export interface ICheckWinner {
  (dataset: Box[]): Winner
}

export const SuccessPattrens: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
