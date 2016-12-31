//使用react-redux创建store的最简单的代码，不过此项目没用
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunkMiddleware,//处理action为function的情况
        createLogger()//打印日志
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f//在chrome安装Redux DevTools，此函数会开启这个调试工具
)(createStore)
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {//替换reducers
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
