import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {message} from 'antd';
import _ from 'lodash';
import {getAllAttendance} from '../../services/layer.service';

const AttedanceStatistic = () => {
    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: []
        }
    });

    const [series, setSeries] = useState([]);

    useEffect(() => {

        getAllAttendance()
            .then(response => response.data)
            .then(response => response.data)
            .then(attendance => {
                calcStatistics(attendance);
            }).catch(error => message.error('שגיאה'));

    }, []);


    const calcStatistics = (attendance) => {

        let attendanceGroupedByGroup = _.groupBy(attendance, 'groupId');
        let chartData = new Map(sortedResult.map(arr => [arr[0].bookName, arr.length]))

        let newOptions = {...options, xaxis:{...options.xaxis, categories: [...chartData.keys()]}}

        setOptions(newOptions);

        let newSeries = [{data:[...chartData.values()] }]
        setSeries(newSeries)
    }

    return (
        <>
                        <h1>הקבוצות עם הנוכחות הגבוהה ביותר</h1>
              <Chart
                options={options}
                series={series}
                type="bar"
                width="700"
              />
        </>
    )
}
export default AttedanceStatistic;