import React from 'react';
import {Card,List, Avatar} from 'antd';
import {useSelector} from 'react-redux';
import { MailOutlined } from '@ant-design/icons';
import Moment from 'moment';
import '../../css/Home.css';
// import image3 from '../../assests/images/image3';

// const slideImages = [
//     image3
// ];

// const Slideshow = () => {
//     return (
//       <div className="slide-container">
//         <Slide>
//           <div className="each-slide">
//             <div className="slide-show-image" style={{'backgroundImage': `url(${slideImages[0]})`}}>
//             </div>
//           </div>
//         </Slide>
//       </div>
//     )
// }
const ListMassage = () => {

    const { user } = useSelector(state => state.userReducer);
    debugger
    
    return (
        <>
        {/* <Slideshow/> */}
                <List
                    style={{margin: '25px'}}
                    dataSource={user.messages.sort((m1,m2) => (new Date(m1.dateMessage)) < (new Date(m2.dateMessage)))}
                    itemLayout="horizontal"
                    renderItem={item => (
                        <List.Item key={item._id} style={{padding: '25px' , background:item.isRead? 'white': '#f6f6f6'}}>
                                <List.Item.Meta
                                    avatar={<Avatar icon={<MailOutlined />} />}
                                    title={
                                        <>
                                            <label>הודעה מאת: {`${item.publisher.firstName} ${item.publisher.lastName}`}</label>
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <h3>{item.subject}</h3> 
                                                <label>{Moment(item.dateMessage).format('HH:MM DD/MM/YYYY')}</label>
                                            </div>
                                        </>
                                    }
                                    description={item.messageContent}
                                    style={{width:'100%'}}
                                    />
                        </List.Item>
                    )}
                >
                </List>
        </>
    )
}
export default ListMassage;