import { Route, Routes } from 'react-router-dom'
import Game from './pages/Game'
import Login from './pages/Login'
import Settings from './pages/Settings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/game" element={<Game />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default App
