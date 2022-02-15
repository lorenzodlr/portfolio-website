import './Portfolio.css'
import React, {
    useState,
    useEffect
} from 'react'

import { images } from './imagesData'

const hex1 = "😅".codePointAt(0).toString(16)
const smilingFaceWithOpenMouth = String.fromCodePoint(`0x${hex1}`)
const hex2 = "😭".codePointAt(0).toString(16)
const loudlyCryingFace = String.fromCodePoint(`0x${hex2}`)

const Work = props => {

    const [title] = useState(props.title)
    const [link] = useState(props.link)
    const [description] = useState(props.description)

    const [slidesLoading, setSlidesLoading] = useState(props.slidesLoading)
    const [activeImg, setActiveImg] = useState(props.coverImg)
    const [previousImg, setPreviousImg] = useState(props.previousImg)

    return (
        <div>
            <div className='img-container'>
                {/* {slidesLoading && <div className='loading-animation'>
                    <div className='loading-dot' />
                    <div className='loading-dot' />
                    <div className='loading-dot' />
                </div>}
                {!slidesLoading && activeImg}
                {!slidesLoading && previousImg} */}
                {activeImg}
            </div>
            <h2>{title}</h2>
            <a
                href={`https://${link}`}
                target='__blank'
            >{link}</a>
            <p>{description}</p>
        </div>
    )
}

const Portfolio = () => {

    const [activeWork, setActiveWork] = useState(images[0]) // sets initial work slideshow
    const [timer, setTimer] = useState(5)
    const [activeImgIdx, setActiveImgIdx] = useState(0)
    const [slidesLoading, setSlidesLoading] = useState(false)
    const [imageSlides, setImageSlides] = useState()
    const [activeImg, setActiveImg] = useState()
    const [previousImg, setPreviousImg] = useState()

    useEffect( () => addScrollEffect(), [] )
    // useEffect( () => handleTimer(), [])
    //useEffect( () => slidesLoading && addLoadingAnimation(), [slidesLoading] )
    // useEffect( () => renderImages(), [activeWork])
    // useEffect( () => imageSlides && setActiveImg(imageSlides[0]), [imageSlides] ) // sets initial slide
    // useEffect( () => implementSlideshow(), [timer] ) // function to change index
    // useEffect( () => {
    //     if ( imageSlides && previousImg ) addSlideshowAnimation()
    // }, [activeImg])

    /* currently fixing slideshow animation */

    const addLoadingAnimation = () => {
        const node = document.querySelector('.portfolio').querySelector('.img-container')
        const ellipsis = node.querySelectorAll('.loading-dot')

        ellipsis[0].classList.add('bounce')
        setTimeout(() => ellipsis[1].classList.add('bounce'), 667)
        setTimeout(() => ellipsis[2].classList.add('bounce'), 1333)
    }
    const renderImages = () => {
        setSlidesLoading(true)

        const imgArr = activeWork.map( src => 
            <img
                src={src}
                alt='roadarlo website' 
                className='slideshow-img'
            />)
        
        setImageSlides([...imgArr])
        setSlidesLoading(false)
    } 
    const implementSlideshow = () => {
        const nextIndex = activeImgIdx === activeWork.length - 1 ?
            0 :
            activeImgIdx + 1
        const previousIndex = activeImgIdx

        if ( timer === 1 ) {
            setActiveImgIdx( nextIndex )
            setActiveImg( imageSlides[nextIndex] )
            setPreviousImg( imageSlides[previousIndex] )
        }
    }
    const addSlideshowAnimation = () => {
        const node = document.querySelector('.portfolio').querySelector('.active-container')
        const imgs = node.querySelector('.img-container').querySelectorAll('img')

        if ( imgs[1] ) imgs[1].style.position = 'absolute'
        imgs[0].classList.remove('slide-img-in-right')
        imgs[1].classList.remove('slide-img-out-left')
        imgs[0].classList.remove('slide-img-in-left')
        imgs[1].classList.remove('slide-img-out-right')
            
        setTimeout( () => { // gives time to transition
            imgs[0].classList.add('slide-img-in-right')
            imgs[1].classList.add('slide-img-out-left')
        }, 1)
    }
    const handleTimer = () => {
        let intervalTimer = timer
        setInterval( () => {
            intervalTimer = intervalTimer === 1 ? 
                5 :
                intervalTimer - 1
            setTimer( intervalTimer )
        }, 1000)

    }
    const addScrollEffect = () => {
        const node = document.querySelector('.App')
        const works = node.querySelector('.portfolio-container').querySelectorAll('.work-container')
        
        node.onwheel = () => {
            const appHeight = (node.clientHeight - window.innerHeight)
            const scrollPercent = (window.pageYOffset / appHeight) * 100
            const workPercent = 100 / works.length

            // minus 0.1 to ensure that the index never reaches 
            const scrollBehaviour = scrollPercent < 100 ?
                scrollPercent / workPercent :
                scrollPercent / workPercent - 0.1 // ensures value never reaches undefined index 
            const index = (scrollBehaviour >= 0 && scrollBehaviour <= works.length - 1) ? 
                Math.floor( scrollBehaviour ) :
                works.length - 1 // ensures index is always in bounds

            works.forEach( work => work.classList.remove('active-container') )

            works[index].classList.add('active-container')
            setActiveWork( images[index] )
        }
    }

    return (
        <div className='portfolio'>
            <h3>I don't have a lot, but it's something!</h3>
            <div className='portfolio-container'>
                <div className='active-container work-container'>
                    <Work 
                        activeWork={activeWork}
                        title={'RoadArlo'}
                        link={'roadarlo-client.herokuapp.com'}
                        description={`My very first full-stack application. This project was based off of an idea I had and it's still in the working prototype stage. The look is very basic(it was my first website... give me a break ${smilingFaceWithOpenMouth}), but I'm proud of the back-end work I did for this one.`}
                        coverImg={<img src={images[0][0]} alt='RoadArlo cover img' className='cover-img' />}
                    />
                </div>
                <div className='work-container'>
                    <Work 
                        activeWork={activeWork}
                        title={'RoadArlo Vendor Dashboard'}
                        link={'roadarlo-vdb.herokuapp.com'}
                        description={`This is where most of the information in roadarlo.com comes from. There is a lot going on here in terms of data management and it's where the back-end, which roadarlo.com shares, really shines... Yup, this took a while to have up and running, aaaaand it's still in development ${loudlyCryingFace}`}
                        coverImg={<img src={images[1][0]} alt='vendor dashboard cover img' className='cover-img' />}
                    />
                </div>
            </div>
        </div>
    )
}

export default Portfolio