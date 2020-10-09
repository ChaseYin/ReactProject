import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';



import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import TaskScreen from './screens/TaskScreen';
import ResultScreen from './screens/ResultScreen';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faBook, faTimesCircle, faCloudSun, faSun } from '@fortawesome/free-solid-svg-icons'

function App() {
  var React = require('react')
  var FA = require('react-fontawesome')
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu} className="sidebarSize">&#9776;</button>
            <Link to="/">iCrowd Task <FontAwesomeIcon icon={faSun} spin  /></Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* <Link to="/">Features </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/">About <FA name="github" /></Link> */}
          </div>
          <div className="header-links">
          {userInfo ? (<button><Link to="/orders"><text className="font2">OrderList</text></Link></button>):''}
          
            
            {userInfo ? (
               <button align='center'><Link to="/profile"><text className="font2" >{userInfo.name}</text></Link></button>
              // <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <button align='center'><Link to="/signin"><text className="font2" >Log In</text></Link></button>
              
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                 <button align='center'><Link to="/products"><text className="font2" text-decoration='none'>Manage</text></Link></button>

              </div>
            )}
          </div>
          
        </header>
        
        {/* <FontAwesomeIcon icon = {faAtlas} /> */}
        <aside className="sidebar">
          {/* <p className="goodFont">Categories <FontAwesomeIcon icon={faBook} /></p> */}
          <button className="sidebar-close-button" onClick={closeMenu}>
          <FontAwesomeIcon icon={faTimesCircle} />
          </button>
          <ul className="navi">
          <li className="sidebarFont">
              <span className='goodFont-4'>Categories <FontAwesomeIcon icon={faBook} /></span>
            </li>
            <li className="sidebarFont">
              <Link to="/category/choice">Choice Task</Link>
            </li>
            <li className="sidebarFont">
              <Link to="/category/sentence">Sentence Task</Link>
            </li>
            <li className="sidebarFont">
              <Link to="/category/decision">Decision Task</Link>
            </li>
            <li className="sidebarFont">
              <Link to="/category/image">Image Task</Link>
            </li>

            <li className="sidebarFont">
              <Link to="/category/audio">Audio Task</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/task/:id" component={TaskScreen} />
            <Route path="/result/:id" component={ResultScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">Chase Yin Final 313 Project</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
