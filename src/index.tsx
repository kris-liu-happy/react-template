import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

// 实现局部刷新
if (module && module.hot) {
  module.hot.accept()
}

ReactDOM.render(<App title='helloworld11' />, document.querySelector('#root'))
