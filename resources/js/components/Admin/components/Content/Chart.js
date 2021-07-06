// import React, { useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import { useDispatch, useSelector } from "react-redux";
// import { getChartDataAction } from '../../actions/dashbord';

// const data = {
//     labels: [],
//     datasets: [
//         {
//             label: '# of Votes',
//             data: [],
//             fill: false,
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgba(255, 99, 132, 0.2)',
//         },
//     ],
// };

// const options = {
//     scales: {
//         yAxes: [
//             {
//                 ticks: {
//                     beginAtZero: true,
//                 },
//             },
//         ],
//     },
// };
// const Chart = () => {

//     const dispatch = useDispatch();
//     const sales = useSelector(state => state.monthlySales);
//     useEffect(() => {
//         dispatch(getChartDataAction())
//     }, []);

//     sales.length > 0 ? sales.map(item => {
//         console.log(data.labels);

//         // data.labels.push(item.totalAmounts);
//         // data.datasets.data.push(item.created_at);
//     }) : null;

//     return (
//         <>
//             <div className="card card-default" i>
//                 <div className="card-header justify-content-between">
//                     <h2>میزان فروش ماهانه در سال جاری</h2>
//                 </div>
//                 <div className="card-body pt-0 pb-5">
//                     <Line data={ data } options={ {} } />
//                 </div>
//             </div>
//         </>
//     )
// };

// export default Chart;