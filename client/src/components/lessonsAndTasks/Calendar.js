import { Calendar } from 'antd';
import React from 'react'

const Calendar = () => {
  function onPanelChange(value, mode) {
  console.log(value.format('YYYY-MM-DD'), mode);
}

<Calendar onPanelChange={onPanelChange} />
  return (
  <>
  </>
  )
}

export default Calendar;
