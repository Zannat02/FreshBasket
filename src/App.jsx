import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <h1 className="text-4xl font-bold text-green-600 text-center mt-10">
      Tailwind + DaisyUI Working! 🎉
    </h1>
  )
}

export default App
