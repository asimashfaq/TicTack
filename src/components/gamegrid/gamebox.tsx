import React from 'react'
import { Col, Button } from 'antd'
interface Props {
  id: string
  buttonVisible: boolean
  clickHandler(event: React.MouseEvent<HTMLButtonElement>): void
}
const GameBox: React.FC<Props> = props => {
  return (
    <Col span={1} xl={8}>
      <Button id={props.id} onClick={props.clickHandler} disabled={props.buttonVisible}>
        -
      </Button>
    </Col>
  )
}
export default GameBox
