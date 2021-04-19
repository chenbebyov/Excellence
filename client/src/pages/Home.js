import React from 'react';
import { Slide } from 'react-slideshow-image';
import '../css/Home.css';
import 'react-slideshow-image/dist/styles.css';
import image1 from '../assests/images/image1.png';
import image2 from '../assests/images/image2.png';
import image3 from '../assests/images/image3.png';
import image4 from '../assests/images/image4.png';
import image5 from '../assests/images/image5.png';
import image6 from '../assests/images/image6.png';
import image7 from '../assests/images/image7.png';

const slideImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7
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
              <div className="text2">I am careful not to confuse excellence with perfection. Excellence I can reach for; perfection is God’s business.</div>
            </div>
          </div>
          <div className="each-slide">
            <div className="slide-show-image" style={{'backgroundImage': `url(${slideImages[2]})`}}>
              <div className="text3">Happiness, Success, Excellence: They are not something you get for knowing the path; they are something you experience by walking it.</div>
            </div>
          </div>
          <div className="each-slide">
            <div className="slide-show-image" style={{'backgroundImage': `url(${slideImages[3]})`}}>
              <div className="text4">Excellence is the gradual result of always striving to do better.</div>
            </div>
          </div>
          <div className="each-slide">
            <div className="slide-show-image" style={{'backgroundImage': `url(${slideImages[4]})`}}>
              <div className="text5">Excellence is not being the best; it is doing your best.</div>
            </div>
          </div>
          <div className="each-slide">
            <div className="slide-show-image" style={{'backgroundImage': `url(${slideImages[5]})`}}>
              <div className="text6">The will to win, the desire to succeed, the urge to reach your full potential… These are the keys that will unlock the door to personal excellence.</div>
            </div>
          </div>
          <div className="each-slide">
            <div className="slide-show-image" style={{'backgroundImage': `url(${slideImages[6]})`}}>
              <div className="text7">Perfection has to do with the end product, but excellence has to do with the process.</div>
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