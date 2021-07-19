import React, { Fragment } from 'react';
import {useSelector } from "react-redux";

import Set_Attribute_To_Category from './setAttributeTocategory';
import Add_Brand_Attribute from './add_Brand_Attribute';

const Attributes = () => {

    const categories = useSelector(state => state.categories);
 
    return (
        <Fragment>

            <div className="row">

                {/* set attribute tocategory comonent */ }

                <Set_Attribute_To_Category categories={ categories} />
               
                {/* add attribute _ brand */ }
                <Add_Brand_Attribute categories={ categories }/>
            </div>
        </Fragment>

    );
}
export default Attributes;