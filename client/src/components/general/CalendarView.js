import React, { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { Button, Radio, Tooltip } from 'antd';
import { getLessons } from '../../services/layer.service';
import { useSelector } from 'react-redux';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import moment from 'moment';
import 'moment/locale/he';

import CalendarFilters from './CalendarFilters';
import { getEvents } from '../../services/google-calendar.service';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../../css/CalendarView.css';

moment.locale("he-IL");

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const formats = {
    weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
}

const CalendarView = (props) => {

    const { user } = useSelector(state => state.userReducer);
    const [filterValues, setFilterValues] = useState({
        groupIds: null, 
        userId: user._id, 
        getAll: false
    });
    const [eventList, setEventList] = useState([]);
    const [defaultView, setDefaultView] = useState('month');
    const [selectedDate, setSelectedDate] = useState(new Date());


    useEffect(() => {
        debugger
        getEvents();
    }, []);

    useEffect(() => {
        getLessonsEvents();
    }, [filterValues]);
    
    useEffect(() => {
        console.log(selectedDate)
    }, [selectedDate]);

    const getLessonsEvents = () => {
      getLessons(filterValues.groupIds, filterValues.userId, filterValues.getAll)
        .then(response => response.data).then(response => {
            if(response.success) {
                let events = response.lessons.map(lesson => ({
                    start: new Date(lesson.fromDateTime),
                    end: new Date(lesson.toDateTime),
                    title: `${lesson.lessonId.lessonSubject} - קבוצת  ${lesson.groupName}`
                }))
                setEventList(events);
            }
        })
        .catch(error => console.log(error));
    }
    const updateFilters = (filterProps) => {
      setFilterValues({...filterProps});
    }

    const onEventResize = (data) => {
        const { start, end } = data;
    };

    const onEventDrop = (data) => {
        console.log(data);
    };
    
    const changeTime = e => {
        let selectedValue = e.target.value;
        let newDate = new Date(selectedDate);
        if(selectedValue === 'today') {
            setSelectedDate(new Date());
            return;
        }
        let timeDiff = selectedValue === 'next' ? 1 : -1;
        switch (defaultView) {
            case 'month':
                newDate.setMonth(newDate.getMonth() + timeDiff); 
                break;
            case 'week':
                newDate.setDate(newDate.getDate() + timeDiff * 7); 
                break;
            case 'day':
                newDate.setDate(newDate.getDate() + timeDiff); 
                break;
            default:
                break;
        }
        setSelectedDate(newDate);
    }

    return (
        <>
            <div>
                <CalendarFilters updateFilters={updateFilters} filterValues={filterValues}/>
                <div>
                    <Radio.Group value={defaultView} onChange={(e)=>{setDefaultView(e.target.value);}}>
                        <Radio.Button value="day">יום</Radio.Button>
                        <Radio.Button value="week">שבוע</Radio.Button>
                        <Radio.Button value="month">חודש</Radio.Button>
                        <Radio.Button value="agenda">תקציר</Radio.Button>
                    </Radio.Group>

                    <Tooltip title="הקודם">
                        <Button value="back" onClick={changeTime} shape="circle" icon={<CaretLeftOutlined />} />
                    </Tooltip>
                    <Tooltip title="הבא">
                        <Button value="next" onClick={changeTime} shape="circle" icon={<CaretRightOutlined />} />
                    </Tooltip>
                    <Radio.Group>
                        {/* <Radio.Button onClick={changeTime} value="next">next</Radio.Button>
                        <Radio.Button onClick={changeTime} value="back">back</Radio.Button> */}
                        <Radio.Button onClick={changeTime} value="today">today</Radio.Button>
                    </Radio.Group>
                </div>
                <DnDCalendar
                    formats={formats}
                    localizer={localizer}
                    events={eventList}
                    startAccessor="start"
                    endAccessor="end"
                    calendarType="Hebrew"
                    date={selectedDate}
                    view={defaultView}
                    onSelectEvent={(e)=>{console.log(e)}}
                    onEventDrop={onEventDrop}
                    onEventResize={onEventResize}
                    style={{ height: "100vh", direction:'rtl'}}
                    onNavigate={(e)=>{console.log(e)}}
                />
            </div>
        </>
    )
}
export default CalendarView;

