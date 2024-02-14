import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css'
import Signin from "./Signin";
import Signup from "./Signup";
import TodoItems from './TodoItems';

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Signin/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/todos' element={<TodoItems/>}/>
          </Routes>
        </Router>
      </div>
  )
}

export default App
