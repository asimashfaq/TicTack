import * as React from 'react'
import { Layout, PageHeader, Row, Col, Card, Typography, Result, Button, Modal } from 'antd'
import GameBox from './gamebox'
import { Box, CheckWinner, Winner } from '../../tictac_bll'
import './gamegrid.scss'

const { Text } = Typography
let animateDelay = 1000
interface Props {}

interface State {
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
const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

class GameGrid extends React.Component<Props, State> {
  state: State = {
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
  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (this.state.replay) {
      event.preventDefault()
      return
    }
    // event.currentTarget.disabled = true
    event.currentTarget.innerHTML = `<span>${this.state.letter}</span>`
    const bx: Box = {
      id: event.currentTarget.id,
      player: this.state.player,
      value: this.state.letter,
      step: this.state.step + 1,
    }
    const buttonIndex: number = parseInt(bx.id.slice(-1), 10)
    const bDisable: boolean[] = this.state.buttonDisable
    bDisable[buttonIndex] = true
    this.setState(
      {
        boxes: [...this.state.boxes, bx],
        step: this.state.step + 1,
        player: this.state.player === 1 ? 2 : 1,
        letter: this.state.letter === 'x' ? 'o' : 'x',
        buttonDisable: bDisable,
      },
      () => {
        if (this.state.step >= 5 && this.state.step < 9) {
          const result: Winner = CheckWinner(this.state.boxes)
          if (!result.draw) {
            this.setState(
              {
                winnerPlayer: result.player,
                player: 0,
                letter: '-',
              },
              () => {
                this.showModal()
              }
            )
          }
        } else if (this.state.step === 9) {
          const result: Winner = CheckWinner(this.state.boxes)
          console.log(result)
          if (result.draw) {
            this.setState(
              {
                winnerPlayer: 0,
                player: 0,
                letter: '-',
              },
              () => {
                this.showDrawModal()
              }
            )
          } else {
            this.setState(
              {
                winnerPlayer: result.player,
                player: 0,
                letter: '-',
              },
              () => {
                this.showModal()
              }
            )
          }
        }
      }
    )
  }
  resetGame = () => {
    this.setState({
      boxes: [],
      player: (new Date().getTime() + Math.random()) % 2 > 1.4 ? 1 : 2,
      letter: ((new Date().getTime() + Math.random()) % 2 < 1.4 ? 1 : 2) === 1 ? 'x' : 'o',
      step: 0,
      loading: false,
      successModalVisible: false,
      winnerPlayer: 0,
      buttonDisable: [false, false, false, false, false, false, false, false, false],
      replyModalVisible: false,
      drawModelVisible: false,
    })
    // tslint:disable-next-line: no-increment-decrement
    for (let i: number = 0; i < 9; i++) {
      const element: HTMLElement | null = document.getElementById(`box${i}`)!
      element.innerHTML = '<span>-</span>'
    }
  }
  replyGame = () => {
    animateDelay = 1000
    this.setState({
      successModalVisible: false,
      replyModalVisible: false,
      buttonDisable: [false, false, false, false, false, false, false, false, false],
      replay: true,
      drawModelVisible: false,
    })
    // tslint:disable-next-line: no-increment-decrement
    for (let i: number = 0; i < 9; i++) {
      const element: HTMLElement | null = document.getElementById(`box${i}`)!
      element.innerHTML = '<span>-</span>'
    }
    this.animator().then(() => {
      this.setState({
        replyModalVisible: true,
        replay: false,
      })
    })
  }
  animator = async () => {
    return new Promise(res => {
      this.state.boxes.forEach(async (box: Box, index: number) => {
        animateDelay = animateDelay + 1000
        await this.updateBoxUI(box.id, box.value, animateDelay)
        if (index === this.state.boxes.length - 1) {
          res()
        }
      })
    })
  }
  updateBoxUI = (boxId: string, boxValue: string, animateDelay: number) => {
    return sleep(animateDelay).then(() => {
      const element: HTMLElement | null = document.getElementById(boxId)!
      element.innerHTML = `<span>${boxValue}</span>`
      const buttonIndex: number = parseInt(boxId.slice(-1), 10)
      const buttonDisable: boolean[] = this.state.buttonDisable
      buttonDisable[buttonIndex] = true
      this.setState({
        buttonDisable,
      })
      return
    })
  }
  showModal = () => {
    this.setState({
      successModalVisible: true,
    })
  }
  showDrawModal = () => {
    this.setState({
      drawModelVisible: true,
    })
  }
  handleCancel = () => {
    // this.setState({ successModalVisible: false, replyModalVisible: false })
  }
  render() {
    return (
      <Layout className="gamegrid">
        <Modal
          title=""
          footer={[]}
          onCancel={this.handleCancel}
          visible={this.state.successModalVisible}
        >
          <Result
            status="success"
            title="Congraulations "
            subTitle={`Player ${this.state.winnerPlayer} Wins!`}
            extra={[
              <Button type="primary" key="play_again" onClick={this.resetGame}>
                Play Again
              </Button>,
              <Button type="primary" key="replay" onClick={this.replyGame}>
                RePlay
              </Button>,
            ]}
          />
        </Modal>

        <Modal
          title=""
          footer={[]}
          onCancel={this.handleCancel}
          visible={this.state.replyModalVisible}
        >
          <Result
            title="Replay End "
            subTitle={`Player ${this.state.winnerPlayer} Wins!`}
            extra={[
              <Button type="primary" key="play_again" onClick={this.resetGame}>
                Play Again
              </Button>,
              <Button type="primary" key="replay" onClick={this.replyGame}>
                RePlay
              </Button>,
            ]}
          />
        </Modal>
        <Modal
          title=""
          footer={[]}
          onCancel={this.handleCancel}
          visible={this.state.drawModelVisible}
        >
          <Result
            status="error"
            title="Match Draw! "
            subTitle={`No Player's Win!`}
            extra={[
              <Button type="primary" key="play_again" onClick={this.resetGame}>
                Play Again
              </Button>,
              <Button type="primary" key="replay" onClick={this.replyGame}>
                RePlay
              </Button>,
            ]}
          />
        </Modal>
        <PageHeader onBack={() => null} title="Welcome to the TicTac" subTitle="Do the Dew" />
        <Row>
          <GameBox
            id={'box0'}
            clickHandler={this.handleClick}
            buttonVisible={this.state.buttonDisable[0]}
          />
          <GameBox
            id={'box1'}
            clickHandler={this.handleClick}
            buttonVisible={this.state.buttonDisable[1]}
          />
          <GameBox
            id={'box2'}
            clickHandler={this.handleClick}
            buttonVisible={this.state.buttonDisable[2]}
          />
          <GameBox
            id={'box3'}
            clickHandler={this.handleClick}
            buttonVisible={this.state.buttonDisable[3]}
          />
          <GameBox
            id={'box4'}
            clickHandler={this.handleClick}
            buttonVisible={this.state.buttonDisable[4]}
          />
          <GameBox
            id={'box5'}
            clickHandler={this.handleClick}
            buttonVisible={this.state.buttonDisable[5]}
          />
          <GameBox
            id={'box6'}
            clickHandler={this.handleClick}
            buttonVisible={this.state.buttonDisable[6]}
          />
          <GameBox
            id={'box7'}
            clickHandler={this.handleClick}
            buttonVisible={this.state.buttonDisable[7]}
          />
          <GameBox
            id={'box8'}
            clickHandler={this.handleClick}
            buttonVisible={this.state.buttonDisable[8]}
          />
        </Row>
        <Layout style={{ background: '#ECECEC', padding: '30px' }} />
        <Row>
          <Col span={8}>
            <Card title="Player 1 Wins" bordered={false}>
              0
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Current Turn" bordered={false}>
              <Text className="playerturn">
                Player {this.state.player}
                {this.state.letter}
              </Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Player 2 Wins" bordered={false}>
              0
            </Card>
          </Col>
        </Row>
      </Layout>
    )
  }
}
export default GameGrid
