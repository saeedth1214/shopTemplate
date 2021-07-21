import React, { Fragment } from 'react';
import Detail from '../Content/Detail';
import TopProduct from '../Content/TopProduct';
import LastOrders from '../Content/lastOrders';
import Chart from '../Content/Chart';

const Dashboard = () => {
    return (
        <Fragment>
            <Detail />
            <LastOrders />
            {/* <TopProduct /> */}
            <Chart/>
        </Fragment>
    )
}
export default Dashboard;

