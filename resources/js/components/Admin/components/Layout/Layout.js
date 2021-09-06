import React, { Fragment } from 'react';
import Header from './header';
import Aside from './aside';

const Layout = (props) => {

    return (

        <Fragment>

            <div className="mobile-sticky-body-overlay"></div>

                <div className="wrapper">

                    {/* aside section */ }


                    <Aside />

                    {/* end aside section */ }

                    <div className="page-wrapper">


                        {/* header sectin */ }

                        <Header />


                        {/* end header section */ }


                        <div className="content-wrapper">
                            <div className="content">
                                { props.children }
                            </div>
                        </div>
                    </div>

            </div>

        </Fragment>



    )
}
export default Layout;

// if (document.getElementById("layout")) {

//     ReactDOM.render(<Layout />, document.getElementById("layout"))
// }