export interface Box {
  id: string
  player: number
  value: string
  step: number
}
export interface Winner {
  player: number
  draw: boolean
}
interface CheckWinner {
  (dataset: Box[]): Winner
}

const successPattren: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
export const CheckWinner: CheckWinner = (dataset: Box[]): Winner => {
  let winningPlayer: Winner = { player: 0, draw: true }
  successPattren.forEach(pattren => {
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
