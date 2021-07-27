import React, { Fragment } from 'react';
import Footer from '../../../Admin/components/common/footer';
import Header from '../../../Admin/components/common/header';
const Layout = (props) => {
    return (
        <Fragment>
            <Header />
            { props.children }
            <Footer />
        </Fragment>
    );
}
export default Layout;