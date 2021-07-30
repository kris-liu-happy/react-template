import React from 'react'
import './style.less'
// 这个写ts 会出现警告
// 解决
// 1. 使用require 来引入
// 2. 全局配置typed-css.d.ts 文件
import style from './style.module.less'

const Text = () => (
  <>
    <div className={style.demo2}>demo2</div>
    <p className='demo2_global'>demo2_global</p>
  </>
)

export default Text
