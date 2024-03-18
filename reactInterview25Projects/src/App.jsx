import { useState } from 'react'
import Accordian from './components/Accordion/Accordian'
import './App.css'
import RandomColour from './components/Randomcolour';
import ImageSlider from './components/ImageSlider';
import LoadMoreData from './components/LoadMoreData';
import QRcode from './components/QRcode';
import ScrollIndicator from './components/ScrollIndicator';
import Modal from './components/Modal';

function App() {

  return (
    <div>
      <Accordian/>
      <RandomColour/>
      <ImageSlider/>
      <LoadMoreData/>
      <QRcode/>
      <ScrollIndicator/>
      <Modal/>
    </div>
  )
}

export default App
