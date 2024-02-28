import { useState } from 'react'
import Accordian from './components/Accordion/Accordian'
import './App.css'
import RandomColour from './components/Randomcolour';
import ImageSlider from './components/ImageSlider';
import LoadMoreData from './components/LoadMoreData';

function App() {

  return (
    <div>
      <Accordian/>
      <RandomColour/>
      <ImageSlider/>
      <LoadMoreData/>
    </div>
  )
}

export default App
