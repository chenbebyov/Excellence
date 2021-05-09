import React from 'react';
import { Slide } from 'react-slideshow-image';
import '../css/Home.css';
import 'react-slideshow-image/dist/styles.css';
import image1 from '../assests/images/image1.jpg';
import image2 from '../assests/images/image2.jpg';
import about from '../assests/images/about.png';
import { Card, Col, Row } from 'antd';


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
            <div style={{height:'30vw',textAlign:'center', direction:'rtl',margin: 'auto'}}>
              <h1><b>אודות</b></h1>
            <p style={{textAlign:'center', direction:'rtl'}}>
            אנו ב Excellence מאמינים בכמה ערכים חשובים:
            </p>
            <ul style={{textAlign:'right', direction:'rtl'}}>
              <li>הנגשת החומר למורים בצורה מסודרת, כדי שידעו בדיוק היכן הכתה אוחזת ולהיכן צריך להתקדם.</li>
              <li> הענין השני שבו אנו מאמינים, היא שקבלת החומר בידי התלמידים בצורה מסודרת ומאורגנת תוציא את המיטב מן התלמידים ותקדם אותם במהירות האפשרית לרכישת השפה.</li>
              <li>כהמשך לאמור לעיל אנו מאמינים, שקבלת השיעורים דרך האתר, יקל על התלמידים בהכנת השיעורים וזה תוך כדי יכולת מעקב אישי אחר התקדמות התלמיד ונתינת מענה מתבקש בעת הצורך.</li>
              <li>עוד אנו מאמינים , שהיחס האישי שבין המורה לתלמיד, יכול לתרום הרבה ליכולת הלמידה וההתקדמות, לכן פתחנו ב Excellence יכולת יצירת קשר בין המורה לתלמיד בצורה אישית ופרטית מחוץ לשעות פעילות בית הספר.</li>
              <li>Excellence מאמינה בהצלחה שלך, מאמינה ביכולות שלך, מאמינה בכוח שלך את השפה ברמה הכי גבוהה שיש , הן ביכולת לדבר ולתקשר בצורה שוטפת וקולחת בפגישות בעסקים ובכלל, והן ברמה הדקדוקית לבחינות בית הספר והתיכון . Excellence - המקום שבו הדרך שלך סלולה להצלחה!</li>
            </ul>
            </div>

            <div className="site-card-wrapper" style={{textAlign:'center'}}>
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="שרה מימון מחדרה" bordered={false}>
                     <ul>
                       מומלץ מאוד, אני מנסה כבר כמה שנים 
                       עם כמה קורסים לאנגלית  אך ללא הצלחה.
                       Excellence נתנה לי לרכוש את השפה
                       והכל בכייף ובצורה מסודרת.
                     </ul>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="אמא של דוד" bordered={false}>
                     <ul>
                       אף פעם לא הסתדרתי עם נושא שיעורי הבית
                       הכל בלאגן ובלי סדר בכלל.
                       אבל עם Excellence הכל נעשה פשוט וקל
                       עם חומר מסודר ישר לדוד
                     </ul>
                  </Card>
               </Col>
                 <Col span={8}>
                   <Card title="שלמה איצקוביץ מבני-ברק" bordered={false}>
                     <ul>
                       תודה רבה לצוות Excellence
                       על המסירות וההכוונה ברכישת השפה,
                       מעולם לא היה לי יחס כזה צמוד ותומך.
                       אוהבים אתכם:)
                     </ul>
                  </Card>
                </Col>
            </Row>
           </div>
        </>
    )
}

export default Home;