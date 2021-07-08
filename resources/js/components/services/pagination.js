import React from 'react';
import { range } from 'lodash';
const Paginate = ({ totalItem, perPage, currentPage, onPageChange }) => {

    let pageCount = Math.ceil(totalItem / perPage);
    console.log(pageCount,"count");

    if (pageCount === 0) return null;

    let pages = range(1, pageCount + 1);
    return (
        <div className="row">
            <div className="col-12">
                <div className="pro-footer">
                    <nav>
                        <ul className="pagination justify-content-center">
                            { 
                                pageCount > 1 ? <li className="page-item"><a className="page-link" onClick={ () => { onPageChange(currentPage - 1,pageCount) } }>قبلی</a></li>  :null
                            } 
                            {

                                pages.map(page => {
                                    return <li key={ page } className={ page === currentPage ? "page-item active" : "page-item" }>
                                        <a className="page-link" onClick={ () => { onPageChange(page) } }>{ page }</a>
                                    </li>

                                }
                                )
                            }
                            {
                                pageCount > 1 ? <li className="page-item"><a className="page-link" onClick={ () => { onPageChange(currentPage + 1,pageCount) } }>بعدی</a></li> : null
                            } 
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Paginate;