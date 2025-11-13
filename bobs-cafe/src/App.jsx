import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import Productos from './pages/Productos'
import Locales from './pages/Locales'
import Trabaja from './pages/Trabaja'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="productos" element={<Productos />} />
          <Route path="locales" element={<Locales />} />
          <Route path="trabaja" element={<Trabaja />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
