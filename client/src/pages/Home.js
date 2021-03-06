import React from 'react';
import { Slide } from 'react-slideshow-image';
import '../css/Home.css';
import 'react-slideshow-image/dist/styles.css';
import image1 from '../assests/images/home_image1.png';
import image2 from '../assests/images/home_image2.png';

const slideImages = [
    image1,
    image2
];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
          <div className="each-slide">
            <div className="slide-show-image" style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <div className="text1">Next to excellence is the appreciation of it.</div>
            </div>
          </div>
          <div className="each-slide">
            <div className="slide-show-image" style={{'backgroundImage': `url(${slideImages[1]})`}}>
            <div className="text2">Next to excellence is the appreciation of it.</div>
            </div>
          </div>
        </Slide>
      </div>
    )
}

const Home = () => {

    

    return (
        <>
            <Slideshow/>
        </>
    )
}

export default Home;