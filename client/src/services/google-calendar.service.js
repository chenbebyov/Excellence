import axios from 'axios';

const CALENDAR_ID = 'iw.jewish#holiday@group.v.calendar.google.com';
const API_KEY = 'AIzaSyDUzmVNt2tsB6Ltqk9vhz8r_W55W0cSsBA';
const GOOGLE_CALENDAR_URL = `https://www.googleapis.com/calendar/v3/calendars/iw.jewish%23holiday%40group.v.calendar.google.com/events?key=${API_KEY}`;

const api = axios.create({
    baseURL: GOOGLE_CALENDAR_URL
})

export const getEvents = () => api.get()
            .then(res => {
              debugger
              console.log(res)
            })
            .catch(err => {console.log(err)});