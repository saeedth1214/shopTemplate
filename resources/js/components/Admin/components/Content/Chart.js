import React, { useEffect } from 'react';
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getChartDataAction } from '../../actions/dashbord';

var data = {
    labels: [],
    datasets: [
        {
            label: 'میزان فروش ماهانه بر حسب تومان',
            data: [],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};
const Chart = () => {

    const dispatch = useDispatch();
    const sales = useSelector(state => state.monthlySales);

    useEffect(() => {
        dispatch(getChartDataAction())

    }, []);
    const setChartData = () => {

        sales.map(item => {
            data.labels.push(item.created_at);
            data.datasets[0].data.push(item.totalAmounts);
        });
        return <Line data={ data } options={ {} } />;
    }

    return (
        <>
            <div className="card card-default" i>
                <div className="card-header justify-content-between">
                    <h2>میزان فروش ماهانه در سال جاری</h2>
                </div>
                <div className="card-body pt-0 pb-5">
                    { 
                        sales.length > 0 ? setChartData() : <p>متاسفانه مشکلی در نمایش به وجود آمد</p>
                    }
                    
                </div>
            </div>
        </>
    )
};

export default Chart;