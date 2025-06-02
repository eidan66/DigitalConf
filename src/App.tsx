import { Routes, Route } from 'react-router-dom'
import Layout from "@/components/Layout/Layout"
import Home from '@/Pages/Home'
import Register from '@/Pages/Register'
import Confirmation from '@/Pages/Confirmation'
import NotFound from '@/Pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
