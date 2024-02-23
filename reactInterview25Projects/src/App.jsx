import { useState } from 'react'
import Accordian from './components/Accordion/Accordian'
import './App.css'
import RandomColour from './components/Randomcolour';
import ImageSlider from './components/ImageSlider';

function App() {

  return (
    <div>
      <Accordian/>
      <RandomColour/>
      <ImageSlider/>
    </div>
  )
}

export default App
