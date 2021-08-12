import { getProducts, get_Random_Products, get_Products_By_category_Service, updateProductServises, getProduct, get_newest_Products, get_popular_Products, get_bestSeller_Products } from "../../services/productService";
import { removeProductById, createProductByData } from "../../services/productService";
import { errorNoti, successNoti, warrningNoti } from "../../utility/messageNotifcation";
import { convertToNumberFormat } from "../../utility/getNumberFormat";
import { get_Attribute_value_servise, update_Attribute_value_servise, get_Attribute_value_front_servise } from "../../services/attributeValueService";
import _ from "lodash";
import { getComments } from "../../services/commentService";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const getSingleProduct = (pid) => {
    return async dispatch => {

        try {
            dispatch(showLoading("singleProduct"));
            let item = {};
            const { data, status } = await getProduct(pid);
            if (status === 400) {
                errorNoti(response.data.msg);
                return;
            }
            if (status === 200) {
                item = { ...item, product: data };
            }
            const responseAttr = await get_Attribute_value_front_servise(pid);
            if (responseAttr.status === 200) {
                item = { ...item, attributes: responseAttr.data };
            }
            const responseComment = await getComments(pid);
            if (responseComment.status === 200) {
                item = { ...item, comments: responseComment.data };
            }
            dispatch({ type: "GET_SINGLE_PRODUCT", payload: item });
            dispatch(hideLoading("singleProduct"));
        } catch (error) {
            alert(error.response.msg);
            console.log(error.response, 'sssddd');
        }
    }
}
export const getProductAttribute = (pid) => {

    return async dispatch => {

        try {

            const { data, status } = await get_Attribute_value_servise(pid);
            if (status === 200) {

                dispatch({ type: "GET_ATTRIBUTE_VALUE", payload: data.data });
            }

        } catch (error) {

            console.log(error.response.data.msg);
        }
    }
}


export const getAllProducts = () => {

    return async dispatch => {

        try {
            const { data, status } = await getProducts();
            // console.log(data);
            if (status === 200) {
                dispatch({ type: "GET_PRODUCTS", payload: data });
            }

        } catch (error) {

            console.log(error.response);
        }
    }
}


export const getRandomProducts = () => {

    return async dispatch => {

        try {
            dispatch(showLoading());
            const { data, status } = await get_Random_Products();
            if (status === 200) {
                dispatch({ type: "GET_RANDOM_PRODUCTS", payload: data });
                dispatch(hideLoading());
            }
        } catch (error) {

            console.log(error.response);
        }


    }
}

export const getProductsByCategory = cid => {

    return async dispatch => {

        try {
            if (cid !== 0) {
                dispatch(showLoading("categoryFilter"));
                const { data, status } = await get_Products_By_category_Service(cid);
                if (status === 200) {
                    dispatch({ type: "GET_PRODUCTS", payload: data });
                    dispatch(hideLoading("categoryFilter"));
                }
            }
        } catch (error) {

            errorNoti(error.resposne.msg);
        }


    }
}


export const getFilterProducts = brandIds => {

    return async (dispatch, getState) => {


        // console.log(brandIds);
        const products = [...getState().products];
        const newProducts = brandIds.length > 0 ? products.filter(product => {
            if (brandIds.includes(product.brand_id.toString())) {
                return product;
            }
        })
            : products

        // console.log(newProducts,"new");

        dispatch({ type: "FILTER_PRODUCTS", payload: newProducts });

    }
}


export const removeProduct = productId => {

    return async (dispatch, getState) => {

        try {
            const { data, status } = await removeProductById(productId);
            if (status === 202) {
                const products = [...getState().products];
                const filterPro = products.filter(item => parseInt(item.id) !== parseInt(productId));
                await dispatch({ type: "REMOVE_PRODUCT", payload: filterPro });
                successNoti(data.msg);
            }
        } catch (error) {
            console.log(error.response);
        }
    }
}

export const createProduct = product => {

    return async (dispatch, getState) => {

        try {

            if (product.attributeArray.lenght === 0) {
                warrningNoti("لطفا یک دسته بندی  یا یک برند انتخاب کنید");
                return;

            }
            if (parseInt(product.category) === 0 || parseInt(product.brand) === 0) {
                warrningNoti("لطفا یک دسته بندی  یا یک برند انتخاب کنید");
                return;
            } else if (parseInt(product.quantity) === 0) {
                warrningNoti("لطفا در ثبت تعداد محصول دقت نمایید");
                return;
            }
            const { data, status } = await createProductByData(product);
            if (status === 201) {


                const products = [...getState().products];
                const brands = [...getState().brands];
                const categories = [...getState().categories];
                const category = categories.find(cat => parseInt(cat.id) === parseInt(product.category));
                const brand = brands.find(brand => parseInt(brand.id) === parseInt(product.brand));
                const newProduct = {
                    id: products.length == 0 ? data.data.id : products[products.length - 1].id + 1,
                    pro_title: product.title,
                    quantity: product.quantity,
                    price: convertToNumberFormat(product.price),
                    description: product.description,
                    ctitle: category.title,
                    btitle: brand.title
                };
                products.push(newProduct);
                await dispatch({ type: "CREATE_PRODUCT", payload: products });
                successNoti(data.msg);
            }
        } catch (error) {

            console.log(error.response);
        }


    }
}


export const updateProduct = (id, product) => {
    return async (dispatch, getState) => {

        if (product.cid === 0 || product.bid === 0) {

            warrningNoti("لطفا یک دسته بندی یا یک برند مناسب انتخاب کنید");
            return;
        }
        try {
            const { data, status } = await updateProductServises(id, product);

            if (status === 202) {
                const products = [...getState().products];
                let newProducts = [...products];
                let index = newProducts.findIndex(pro => pro.id === id);

                let newUpdateProduct = {
                    id,
                    pro_title: product.pro_title,
                    quantity: product.quantity,
                    price: convertToNumberFormat(product.price),
                    description: product.description,
                    bid: product.bid,
                    cid: product.cid,
                    ctitle: product.ctitle,
                    btitle: product.btitle,
                };

                let previuseUpdateProduct = newProducts[index];
                previuseUpdateProduct = { ...newUpdateProduct };
                newProducts[index] = previuseUpdateProduct;
                dispatch({ type: "UPDATE_PRODUCT", payload: [...newProducts] });
                successNoti(data.msg);
            }
            else if (status === 404) {
                warrningNoti(data.msg);
            }

        } catch (error) {

            console.log(error.response);
        }

    }
}


export const updateAttributeValue = attrVal => {

    return async (dispatch, getState) => {


        console.log(attrVal);

        if (_.isEmpty(attrVal)) {
            warrningNoti("لطفا مقدار معتبری برای ویژگی ها وارد کنید");
            return;
        }
        let index = attrVal.findIndex(item => item.element === "");
        if (index !== -1) {
            warrningNoti("لطفا مقدار معتبری برای ویژگی ها وارد کنید");
            return;
        }

        try {
            const { status, data } = await update_Attribute_value_servise({ attrs: { ...attrVal } });
            if (status === 202) {
                successNoti(data.msg);
            }
        } catch (error) {

            console.log(error.response);
        }


    }
}



export const filterNewestProduct = () => {

    return async dispatch => {
        try {
            dispatch(showLoading());
            const response = await get_newest_Products();
            if (response.status === 200) {
                // console.log(response);

                dispatch({ type: 'GET_PRODUCTS', payload: response.data });
            }
            dispatch(hideLoading());
        } catch (error) {

            console.log(error.response);
        }

    }
}

export const filterPopularProduct = () => {

    return async dispatch => {
        try {
            dispatch(showLoading());
            const response = await get_popular_Products();
            // console.log(response);
            // return;
            if (response.status === 200) {
                dispatch({ type: 'GET_PRODUCTS', payload: response.data });
            }
            dispatch(hideLoading());
        } catch (error) {

            console.log(error.response);
        }

    }
}
export const filterBestSellerProduct = () => {

    return async dispatch => {
        try {
            console.log("ssss");

            dispatch(showLoading());
            const response = await get_bestSeller_Products();
            // console.log(response);
            // return;
            if (response.status === 200) {
                dispatch({ type: 'GET_PRODUCTS', payload: response.data });
            }
            dispatch(hideLoading());
        } catch (error) {

            console.log(error.response);
        }

    }
}

export const filterByProName = value => {
    return async (dispatch, getState) => {
        const products = [...getState().products];
        const filterProducts = products.filter(item => {
            return item.title.toLowerCase().includes(value.toLowerCase()) && item;
        });
        dispatch({ type: "FILTER_PRODUCTS", payload: filterProducts });
    }
}