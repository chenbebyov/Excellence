import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {message} from 'antd';
import {getStudents} from '../../services/user.service';
import _ from 'lodash';

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

        getStudents().then(resopnse => resopnse.data).then(response => {
            if (response.success) {
                debugger
                let result = response.data.map(student => student.attendance).flat();
                calcStatistics(result);

            }
            else {
                message.error('טעינת רשימת התלמידים נכשלה')
            }
            console.log(response);
        }).catch(error => {

            console.log(error);
            message.error('טעינת רשימת התלמידים נכשלה')
        }
        );
    
    }, []);


    const calcStatistics = (attendance) => {

        let attendanceByGroup = Object.values(_.groupBy(attendance, 'groupId._id'));
        let chartData = new Map(attendanceByGroup.map(arr => 
            [arr[0].groupId.name, arr.length]
        ))

        let newOptions = {...options, xaxis:{...options.xaxis, categories: [...chartData.keys()]}}

        setOptions(newOptions);

        let newSeries = [{data:[...chartData.values()] }]
        setSeries(newSeries)
    }

    return (
        <>
            <h1>נתוני נוכחות התלמידים בקבוצות</h1>
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