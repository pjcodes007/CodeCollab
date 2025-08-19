import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='bg-black text-white font-extrabold text-xl'>Hello World</h1>
      </div>
    </>
  )
}

export default App
