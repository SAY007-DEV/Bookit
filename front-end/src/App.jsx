

import './App.css'
import Header from './Components/Header'
import Home from './Components/Pages/Home'
import Deatails from './Components/Pages/Deatails'
import Checkout from './Components/Pages/Checkout'
import Result from './Components/Pages/Result'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
     <BrowserRouter>
       <Header/>
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/details/:id" element={<Deatails/>} />
         <Route path="/checkout" element={<Checkout/>} />
         <Route path="/result" element={<Result/>} />
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
