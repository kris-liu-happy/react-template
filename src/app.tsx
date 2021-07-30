import React, { useState, Suspense, lazy } from 'react'

import HelloWorld from './page/helloWorld'

const Demo1 = lazy(() => import('Components/Demo1'))
const Demo2 = lazy(() => import('Components/Demo2'))
const Demo3 = lazy(() => import('Components/Demo3'))

interface Props {
  title: string
}

function App(props: Props) {
  const [showDemo2, setShowDemo2] = useState(false)
  const { title } = props
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <p>{title}</p>

        <Demo1 />

        {showDemo2 && <Demo2 />}

        <p onClick={() => setShowDemo2(!showDemo2)}>show Demo2</p>

        <Demo3 />
      </Suspense>

      <HelloWorld />
    </div>
  )
}

export default App
