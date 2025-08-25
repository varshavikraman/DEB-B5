// import { useState } from 'react'
// import Logos from './component/Logos'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)
//   const [countNew, setCountNew] = useState(10)

//   const [like, setLike] = useState(false)

//   const toggleLike = () =>{
//     setLike(!like)
//   }

//   return (
//     <>
//       <Logos/>
//       <Logos/>
//       <h1>Vite + React</h1>
//       <div className="card">
        
//         <button onClick={() => setCountNew((count) => countNew + 10)}>
//           count is {countNew}
//         </button>
//         <button onClick={toggleLike}>
//           {like ? 'Liked' : 'Disliked'}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React from 'react'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div>
      <HomePage/>
    </div>
  )
}

export default App