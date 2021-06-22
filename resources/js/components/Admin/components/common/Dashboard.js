import React, { Fragment } from 'react';
import Detail from '../Content/Detail';
import TopProduct from '../Content/TopProduct';
import LastOrders from '../Content/lastOrders';

const Dashboard = () => {
    return (
        <Fragment>
            <Detail />
            <LastOrders />
            <TopProduct />
        </Fragment>
    )
}
export default Dashboard;

