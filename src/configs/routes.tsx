import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import AsyncComponent from './AsyncComponent'
import store, { history } from '../redux/store'
// import History from '../screens/history/History'
const Home = AsyncComponent(() => import('../screens/home/Home'))
const HisotryComp = AsyncComponent(() => import('../screens/history/History'))
const publicPaths = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/history', component: HisotryComp },
]
const publicRoutes = publicPaths.map(({ path, ...props }) => (
  <Route key={path} path={path} {...props} />
))
export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {publicRoutes}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </ConnectedRouter>
  </Provider>
)