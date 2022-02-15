import { useEffect, useState } from 'react'
import './Home.css'

import ArrowForward from '../chevron-forward-outline.svg'

const Home = () => {

    const [anchorValue, setAnchorValue] = useState('/contact')

    useEffect(() => animateLogo(), [])
    useEffect(() => scrollFx(), [])
    
    const animateLogo = () => {
        const logo = document.querySelector('.home').querySelector('.home-logo')
        const letterContainer = logo.querySelector('.letter-container')
        const letters = letterContainer.querySelectorAll('.letter')
        const underlineContainer = logo.querySelector('.underline')
        const underlines = underlineContainer.querySelectorAll('div')

        const transitionIn = () => {
            letterContainer.classList.add('animate-logo')
            underlineContainer.classList.add('animate-underline')
        }
        const bounce = () => {
            let delayVariable = 0

            letters.forEach( (letter, i) => {
                setTimeout(() => {
                    letter.classList.add('animate-letter')
                }, delayVariable)
                delayVariable += 300
            })
            setTimeout(() => {
                underlines[1].classList.add('animate-underline-2')
            }, 1700)
            setTimeout(() => {
                underlines[1].style.backgroundColor = 'rgb(18, 97, 28)'
            }, 3400)
        }

        if ( !sessionStorage.getItem('initial_load') ) {
            transitionIn()
            setTimeout(() => bounce(), 500)
            sessionStorage.setItem('initial_load', '1')
        } else {
            letterContainer.style.opacity = '1'
            letterContainer.classList.remove('animate-logo')
            underlineContainer.classList.remove('animate-underline')
            letters.forEach( letter => letter.classList.remove('animate-letter') )
            underlines[1].classList.add('animate-underline-2')
            setTimeout(() => {
                underlines[1].style.backgroundColor = 'rgb(18, 97, 28)'
            }, 1700)
        }
    }
    const scrollFx = () => {
        const node = document.querySelector('.home').querySelector('.btn-container')
        const anchorRefs = node.querySelectorAll('.anchor-ref')

        const activeFontSize = '20px'
        const inActiveFontSize = '16px'

        let top = 0

        const adjustPosition = position => anchorRefs.forEach( anchor => {
            anchorRefs.forEach( anchor => {
                anchor.classList.remove('active')
                anchor.style.top = position
            })
            if ( position === '24px' ) {
                anchorRefs[0].classList.add('active')
                setAnchorValue('/portfolio')
            } else if ( position === '0px' ) {
                anchorRefs[1].classList.add('active')
                setAnchorValue('/contact')
            } else if ( position === '-24px' ) {
                anchorRefs[2].classList.add('active')
                setAnchorValue('/about')
            }
        })

        node.onwheel = e => {
            if ( e.deltaY > 0 && top <= 16 ) top += 8
            else if ( e.deltaY < 0 && top >= -16) top -= 8
            adjustPosition(`${top}px`)
            if ( top >= 16 ) setAnchorValue('/portfolio')
            else if ( top < 16 && top > -16 ) setAnchorValue('/contact')
            else if ( top >= -16 ) setAnchorValue('/about')
        }
        anchorRefs[0].onclick = () => adjustPosition('24px')
        anchorRefs[1].onclick = () => adjustPosition('0px')
        anchorRefs[2].onclick = () => adjustPosition('-24px')
    }
    
    return (
        <div className='home'>
            <div className='home-logo'>
                <div className='letter-container'>
                    <h3 className='letter'>l</h3>
                    <h3 className='letter'>o</h3>
                    <h3 className='letter'>r</h3>
                    <h3 className='letter'>e</h3>
                    <h3 className='letter'>n</h3>
                    <h3 className='letter'>z</h3>
                    <h3 className='letter'>o</h3>
                </div>
                <div className='underline'>
                    <div className='line-1' />
                    <div className='line-2' />
                </div>
            </div>
            <div className='home-content'>
                <h1>What can I help you with?</h1>
                <div className='btn-container'>
                    <a className='anchor-ref'>I'd like to see your work</a>
                    <a className='anchor-ref active'>I want to tell you about my project. Can you do it?</a>
                    <a className='anchor-ref'>I'd like to know a little more about you</a>
                </div>
                <a href={anchorValue} className='submit-anchor'>let's go
                    <img 
                        src={ArrowForward}
                        alt='arrow forward'
                    />
                </a>
            </div>
        </div>
    )
}

export default Home