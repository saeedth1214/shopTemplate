import React, { Fragment } from 'react';
import Header from '../../../Admin/components/common/header';
import MainItem from './MainItem';
import Filter from '../filter/Filter';
import Paginate from '../../../services/pagination';
import Footer from '../../../Admin/components/common/footer';

const Shop = () => {

    return (
        <Fragment>
            <Header />
            <section className="shopContent rtl">
                <div className="container">
                    <Filter />
                    <MainItem />
                    <Paginate />
                </div>
                <Footer />

            </section>
        </Fragment >
    )
}
export default Shop;