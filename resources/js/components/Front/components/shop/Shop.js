import React, { Fragment } from 'react';
import Header from '../../../Admin/components/common/header';
import MainItem from './MainItem';
import Filter from '../filter/Filter';
import Footer from '../../../Admin/components/common/footer';

const Shop = () => {

    return (
        <Fragment>
            <Header />
            <section className="shopContent rtl">
                <div className="container">
                    <Filter />
                    <MainItem />
                </div>
                <Footer />
            </section>
        </Fragment >
    )
}
export default Shop;