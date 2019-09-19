import axios from 'axios'
import {
  fetchListSuccess,
  fetListFailure,
  fetchListStarted,
  addGamePlayStarted,
  addGamePlaySuccess,
  addGamePlayFailure,
} from '../actions/index'
export const fetchList = () => {
  return (dispatch: any) => {
    dispatch(fetchListStarted())
    axios
      .get('http://192.168.1.8:3000/gameplays')
      .then(res => dispatch(fetchListSuccess(res.data)))
      .catch(err => {
        dispatch(fetListFailure(err.message))
      })
  }
}
export const addGamePlay = (data: iGamePlay) => {
  return (dispatch: any) => {
    dispatch(addGamePlayStarted())
    axios
      .post('http://192.168.1.8:3000/gameplay', data)
      .then(res => {
        dispatch(addGamePlaySuccess(res.data.id))
      })
      .catch(err => {
        dispatch(addGamePlayFailure(err.message))
      })
  }
}
