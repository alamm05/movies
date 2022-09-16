import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import List from './Components/List';
import React from 'react';

function App() {
  return (
    <>
       <Navbar/>
       <Banner/>
       <List/>
    </>
  );
}

export default App;
