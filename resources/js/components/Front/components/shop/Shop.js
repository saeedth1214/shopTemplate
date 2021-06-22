import React, { Fragment } from 'react';
import Header from '../../../Admin/components/common/header';
import Paginate from '../../../Admin/components/common/paginate';
import MainItem from './MainItem';
const Shop = () => {

    return (
        <Fragment>
            <Header />
            <section className="shopContent rtl">
                <div className="container-fluid">
                    <div className="row">
                        <MainItem />
                        <Paginate />
                    </div>
                </div>
            </section>
        </Fragment >
    )
}
export default Shop;