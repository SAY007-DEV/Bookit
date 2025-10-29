

import './App.css'
import Header from './Components/Header'
import Home from './Components/Pages/Home'
import Deatails from './Components/Pages/Deatails'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
     <BrowserRouter>
       <Header/>
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/details/:id" element={<Deatails/>} />
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
