import React from "react";
import ReactDOM from "react-dom";
import Dashboard from '../components/common/Dashboard';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Users from '../components/Users/Users';
import Products from '../components/Products/Products';
import Orders from '../components/Orders/Orders';
import Layout from '../components/Layout/Layout';
import { store } from '../../store/store';
import { Provider } from "react-redux";
import Options from '../components/common/options';
import Media from '../components/media/media';
import SinglePro from "../components/Products/SinglePro";
import Category_Attribute from "../components/category/Category_attribute";
import Review from "../components/review/review";
import Profile from "../components/Users/Profile";

const Home = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    {/* //admin route */ }
                    <Route path="/admin/home" component={ Dashboard } />
                    <Route path="/admin/users" component={ Users } />
                    <Route path="/admin/product" exact component={ Products } />
                    <Route path="/admin/orders" component={ Orders } />
                    <Route path="/admin/category" component={ Category_Attribute } />
                    <Route path="/admin/options" component={ Options } />
                    <Route path="/admin/media" component={ Media } />
                    <Route path="/admin/reviews" component={ Review } />
                    <Route path="/admin/product/:id" exact component={ SinglePro } />
                    <Route path="/admin/user/profile/:id" exact component={ Profile } />
                </Switch>
            </Layout>
        </BrowserRouter>
    )
}
export default Home;

if (document.getElementById("home")) {

    ReactDOM.render(<Provider store={ store }><Home /></Provider>, document.getElementById("home"))
}