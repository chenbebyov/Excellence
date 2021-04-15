import React, { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import {getLessons} from '../../services/layer.service';
import CalendarFilters from './CalendarFilters';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


const CalendarView = (props) => {

    const {groupId, userId, getAll} = props;
    const [filterValues, setFilterValues] = useState({groupId, userId, getAll});
    const [eventList, setEventList] = useState([]);


    useEffect(() => {
        getLessonsEvents();
    }, [filterValues]);

    const getLessonsEvents = () => {
      debugger
      getLessons(filterValues.groupId, filterValues.userId, filterValues.getAll)
        .then(response => response.data).then(response => {
            if(response.success) {
                debugger
                let events = response.lessons.map(lesson => ({
                    start: new Date(lesson.fromDateTime),
                    end: new Date(lesson.toDateTime),
                    title: `${lesson.lessonId.lessonSubject} - קבוצת  ${lesson.groupName}`
                }))
                setEventList(events);
            }
            debugger
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

    return (
        <>
            <div>
                <CalendarFilters updateFilters={updateFilters} filterValues={filterValues}/>
                <DnDCalendar
                    localizer={localizer}
                    events={eventList}
                    startAccessor="start"
                    endAccessor="end"
                    calendarType="Hebrew"
                    defaultDate={new Date()}
                    defaultView="week"
                    onEventDrop={onEventDrop}
                    onEventResize={onEventResize}
                    style={{ height: "100vh" }}

                />
            </div>
        </>
    )
}
export default CalendarView;

