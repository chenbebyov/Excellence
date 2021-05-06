// import React, { useState } from 'react';
// import ReactApexCharts from 'react-apexcharts'
import React, { Component, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux';
import {message} from 'antd';
import _ from 'lodash';
import {getAllBorrows} from '../../services/book.service';
import {getBooks} from '../../redux/actions/book.actions'


const BookStatistic = () => {

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

        getAllBorrows()
            .then(response => response.data)
            .then(response => response.data)
            .then(borrows => {
                calcStatistics(borrows);
            }).catch(error => message.error('שגיאה'));

    }, []);


    const calcStatistics = (borrows) => {

        let borrowsGroupedByBook = _.groupBy(borrows, 'bookId');
        let sortedResult = Object.values(borrowsGroupedByBook).sort((a,b) => b.length-a.length);
        let chartData = new Map(sortedResult.map(arr => [arr[0].bookName, arr.length]))

        let newOptions = {...options, xaxis:{...options.xaxis, categories: [...chartData.keys()]}}

        setOptions(newOptions);

        let newSeries = [{data:[...chartData.values()] }]
        setSeries(newSeries)
    }



    return (

        <>
            <h1>הספרים המושאלים בכמות הגבוהה ביותר</h1>
              <Chart
                options={options}
                series={series}
                type="bar"
                width="700"
              />
        </>


    );
}

export default BookStatistic;
