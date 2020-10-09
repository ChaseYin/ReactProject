import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faBook, faTimesCircle, faAddressBook, faKey, faEnvelope,
  faCalendar,
  faUser,
  faCreditCard,
  faMoneyBill,
  faMoneyBillWave,
  faMoneyCheck,
  faMoneyCheckAlt,
  faToolbox,
  faUpload,
  faFireExtinguisher,
  faOutdent,
  faTable,
  faTasks,
  faColumns,
  faSortNumericDown,
  faSortAmountUpAlt,
  faTrash,
  faCashRegister,
  faNetworkWired,
  faUserAlt,
  faLocationArrow,
  faAddressCard,
  faCity,
  faCode,
  faLaptopCode,
  faGlobe,
  faGlobeAsia

} from '@fortawesome/free-solid-svg-icons'



function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  console.log('test-order',order)
  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = 0;
  const taxPrice = 0.1 * itemsPrice;
  const totalPrice = itemsPrice - taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }
  useEffect(() => {
    if (success&&order._id) {
      console.log('test',order)
      props.history.push("/order/" + order._id);
    }

  }, [success]);

  return <div className='goodFont'>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
          <FontAwesomeIcon icon={faUserAlt}/>&nbsp;&nbsp;&nbsp;Worker Detail
          </h3>
          <div>
            {cart.shipping.address}, {cart.shipping.city},
          {cart.shipping.postalCode}, {cart.shipping.country},
          </div>
        </div>
        <div>
          <h3><FontAwesomeIcon icon={faMoneyCheckAlt}/>&nbsp;&nbsp;&nbsp;Salary</h3>
          <div >
            {/* 支付方式: {cart.payment.paymentMethod} */}
            Get paid in：MasterCard
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
              <FontAwesomeIcon icon={faTasks}/>&nbsp;&nbsp;&nbsp;Task list
              </h3>
              <div>
                Salary
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  TaskList is empty
          </div>
                :
                cartItems.map(item =>
                  <li>
                    <div className="cart-image">
                      <img
                      src={item.image}
                      onerror="this.src='images/default.jpg';this.onerror=null"
                      alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Quantity: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      ${item.price}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>


      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <button className="btnSuccess" onClick={placeOrderHandler}><span>Confirm</span></button>
          </li>
          <li>
            <h3>Task Summary</h3>
          </li>
          <li>
            <div>Task Salary</div>
            <div>${itemsPrice}</div>
          </li>
       
          <li>
            <div>Tax from iCrowd</div>
            <div>${taxPrice}</div>
          </li>
          <li>
            <div>Total</div>
            <div>${totalPrice}</div>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderScreen;