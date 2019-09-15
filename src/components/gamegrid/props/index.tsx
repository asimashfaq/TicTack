export interface Box {
  id: string
  player: number
  value: string
  step: number
}
export interface State {
  boxes: Box[]
  player: number
  step: number
  letter: string
  loading: boolean
  successModalVisible: boolean
  winnerPlayer: number
  buttonDisable: boolean[]
  replay: boolean
  replyModalVisible: boolean
  drawModelVisible: boolean
}

export const GAME_INITIALS: State = {
  boxes: [],
  player: (new Date().getTime() + Math.random()) % 2 > 1.4 ? 1 : 2,
  letter: ((new Date().getTime() + Math.random()) % 2 < 1.4 ? 1 : 2) === 1 ? 'x' : 'o',
  step: 0,
  loading: false,
  successModalVisible: false,
  winnerPlayer: 0,
  buttonDisable: [false, false, false, false, false, false, false, false, false],
  replay: false,
  replyModalVisible: false,
  drawModelVisible: false,
}
