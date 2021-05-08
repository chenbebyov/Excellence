import React from 'react';
import { Slide } from 'react-slideshow-image';
import '../css/Home.css';
import 'react-slideshow-image/dist/styles.css';
import image1 from '../assests/images/image1.jpg';
import image2 from '../assests/images/image2.jpg';
import about from '../assests/images/about.png';
import { Image } from 'antd';


const slideImages = [
    image1,
    image2,
    about
];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
          <div className="each-slide">
            <div className="slide-show-image" style={{'backgroundImage': `url(${slideImages[0]})`}}>
            </div>
          </div>
          <div className="each-slide">
            <div className="slide-show-image" style={{'backgroundImage': `url(${slideImages[1]})`}}>
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
            <Image
              width={1000}
              height={700}
              src={slideImages[2]}
            />
        </>
    )
}

export default Home;