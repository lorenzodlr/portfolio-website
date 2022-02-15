import './App.css'
import { 
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useEffect, useState } from 'react'

import Home from './components/Home'
import About from './components/About'
import Portfolio from './components/Porfolio'
import Contact from './components/Contact'

import HomeIcon from './home-outline.svg'
import igIcon from './logo-instagram.svg'

const App = () => {

  /* States */

  /* useEffect */

  /* Utility functions */

  return (
    <div className="App">
      <div className='main-container'>
        <div className='header'>
          <div className='logo'>
            <div className='text'>
              <h3>lorenzo</h3>
            </div>
            <div className='underline'>
              <div className='line-1'/>
              <div className='line-2'/>
            </div>
          </div>
          <div className='nav-container'>
            <div className='navigation'>
              <div className='nav-btn'>
                <a href='/about'>About</a>
                <div className='animated-underline' />
              </div>
              <div className='nav-btn'>
                <a href='https://github.com/roadarloceo?tab=repositories' target='__blank' rel='noopener noreferrer'>GitHub</a>
                <div className='animated-underline' />
              </div>
              <div className='nav-btn'>
                <a href='/portfolio'>Portfolio</a>
                <div className='animated-underline' />
              </div>
              <a href='/contact' className='contact-anchor nav-btn'>Contact</a>
            </div>
          </div>
          <a href='/' className='home-anchor'>
            <img
              src={HomeIcon}
              className='home-icon'
            />
          </a>
        </div>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/portfolio' element={<Portfolio />} />
              <Route path='/contact' element={<Contact />} />
            </Routes> 
          </BrowserRouter>  
        </div>
        <div className='footer'>
          <p>Lorenzo De Los Reyes</p>
          <a href='https://www.instagram.com/lorenzodeveloper/' target='__blank'>
            <img
              src={igIcon}
              alt='instagram logo'
              className='ig-logo'
            />
            <div className='animated-underline' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default App