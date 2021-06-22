import React, { Fragment } from 'react';


const Brands = ({ brands, setBrandId }) => {
    const handleBrandId = e => {

        setBrandId(e.target.value);

    }

    return (
        <Fragment>

            <select className="form-control" name="parent" id="category" onChange={ handleBrandId }>
                <option value={ 0 }> select option</option>
                {
                    brands.length > 0 ?
                        brands.map(brand => {
                            return <option key={ brand.slug } value={ brand.id }>{ brand.title }</option>
                        })
                        :
                        <option > موردی پیدا نشد</option>
                }
            </select>

        </Fragment>

    )
}
export default Brands;