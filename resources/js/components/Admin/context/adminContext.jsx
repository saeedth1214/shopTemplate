import React, { useState } from 'react';
import { paginate } from '../../utility/paginate';
import Context from './context';
import NewUserDialog from '../components/dialogs/users/newUserDialog';


const AdminContext = ({ data, children }) => {


    const [perPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);

    const [openNewDialog,setOpenNewDialog] = useState(false);

    const openDialog = () => setOpenNewDialog(true);
    const closeDialog = () => setOpenNewDialog(false);
    const items = paginate(data, currentPage, perPage);

    const handlePageChange = page => {

        setCurrentPage(page);
    }

    return (

        <Context.provider value={ { perPage, currentPage, handlePageChange, openDialog ,items } }>

            <NewUserDialog showDialog={ openNewDialog } closeDialog={ closeDialog} />

            { children }
            {/* <Paginate totalItem={ categories.length } perPage={ perPage } currentPage={ currentPage } onPageChange={ handlePageChange } /> */ }

        </Context.provider>
    )
}
export default AdminContext;