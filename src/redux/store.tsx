import { createBrowserHistory, History } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from './reducers'

const INITIAL_STATE = {}
const history: History = createBrowserHistory()
const store = createStore(
  createRootReducer(history),
  INITIAL_STATE,
  compose(
    applyMiddleware(
      routerMiddleware(history) // for dispatching history actions
      // ... other middlewares ...
    )
  )
)
export { history }

export default store
