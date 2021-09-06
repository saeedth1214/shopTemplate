import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Shop from "../shop/Shop";
import { store } from '../../../store/store';
import Login from "../Login/Login";
import Register from "../Register/Register";
import Logout from "../Login/Logout";
import Card from "../card/card";
import Login_middleware from "../Login/Login_middleware";
import ShowSingleProduct from "../product/showSingleProduct";
import ForgetPassword from "../Login/ForgetPassword";
import ForgetPasswordForm from "../Login/ForgetPasswordForm";
import Profile2 from "../profile/profile2";
import ReduxToastr from 'react-redux-toastr'

const HomePage = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ Shop } />
                    <Route path="/user/login" render={ () => <Login_middleware login="true"><Login /></Login_middleware> } />
                    <Route path="/user/logout" component={ Logout } />
                    <Route path="/user/register" component={ Register } />
                    <Route path="/user/forget-password" component={ ForgetPassword } />
                    <Route path="/user/forget-password-form" component={ ForgetPasswordForm } />
                    <Route path="/user/profile" render={ () => <Login_middleware profile="true"><Profile2 /></Login_middleware> } />
                    <Route path="/user/card" component={ Card } />
                    <Route path="/product/:id" component={ ShowSingleProduct } />
                </Switch>
            </BrowserRouter>

            <ReduxToastr
                timeOut={ 2000 }
                newestOnTop={ false }
                preventDuplicates
                getState={ (state) => state.toastr } // This is the default
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick />
        </>
    )
}
export default HomePage;

if (document.getElementById("homePage")) {

    ReactDOM.render(<Provider store={ store }> <HomePage /></Provider>, document.getElementById("homePage"))

}