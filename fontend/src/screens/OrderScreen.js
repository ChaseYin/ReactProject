import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
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
  faGlobeAsia,
  faSmileWink,
  faSmileBeam

} from '@fortawesome/free-solid-svg-icons'
function OrderScreen(props) {
  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
      console.log('test',123)
    }
    return () => {
    };
  }, [successPay,props.match.params.id]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;
  console.log('test',orderDetails,successPay,props.match.params.id);

  return loading ? <div>Loading</div> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h2 className="goodFont">
            <FontAwesomeIcon icon={faSmileBeam}/>&nbsp;&nbsp;Congratulate！You have accepted this task!
          </h2>
            <div className="goodFont-2">
              {order.shipping.address}, {order.shipping.city},
              {order.shipping.postalCode}, {order.shipping.country},
          </div>
            {/* <div>
              {order.isDelivered ? "已经发布" + order.deliveredAt : "未发布"}
            </div> */}
          </div>
          <div>
            <h3 className="goodFont"><FontAwesomeIcon icon={faCreditCard}/>&nbsp;&nbsp;&nbsp;Salary Method</h3>
            <div className="goodFont">
            
              Get paid: {order.totalPrice}
            </div>
            {/* <div>
              {order.isPaid ? "已支付 " + order.paidAt : "未支付"}
            </div> */}
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3 className="goodFont">
                <FontAwesomeIcon icon={faTasks}/>&nbsp;&nbsp;Task List
                </h3>
                <div className="goodFont">
                  Salary
                </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div className="goodFont">
                    The task list is empty
                  </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-image">
                        <img
                        src={item.image}
                        alt="product"
                         />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="goodFont">
                          Quantity: {item.qty}
                          <br/> <br/>
                        </div>
                        <Link to={"/task/" + item.product}>
                    <button className='littleBtn'>Go to perform task!</button>
                    </Link>
                      
                     

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
            {/* <li className="placeorder-actions-payment">
              {loadingPay && <div>完成支付</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li> */}
            <li>
              <h3 className="goodFont">Task Summary</h3>
            </li>
            <li>
              <div className="goodFont">Task Salary</div>
              <div>${order.itemsPrice}</div>
            </li>
            
            <li>
              <div className="goodFont">Tax from iCrowd</div>
              <div className="goodFont">${order.taxPrice}</div>
            </li>
            <li>
             
              <div className="goodFont"><br/>Total Salary</div>
              <div className="goodFont"><br/>${order.totalPrice}</div>
            </li>
            <br/>
            <div align='center'><svg width="200" height="400" viewBox="0 0 108 156" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M68.5001 134.2L67.1001 132.8L70.0001 130.3L71.2001 131.5L68.5001 134.2Z" fill="#FFCC9A"/>
<path d="M69.2001 129.7L65.9001 124.7C65.5001 124.1 64.7 124 64.1 124.4C61.2 126.7 52.5001 134.4 54.0001 136.3C55.8001 138.7 66.3001 132.1 66.3001 132.1L69.2001 129.7Z" fill="white"/>
<path d="M70.0001 130.3L66.7001 125.3C66.3001 124.7 65.5001 124.6 64.9001 125C62.0001 127.3 53.3001 135 54.8001 136.9C56.6001 139.3 67.1001 132.7 67.1001 132.7L70.0001 130.3Z" fill="#860F45"/>
<path d="M69.1654 132.256C69.9269 131.534 70.2978 130.689 69.9938 130.368C69.6899 130.047 68.8261 130.373 68.0646 131.095C67.3031 131.817 66.9322 132.662 67.2362 132.982C67.5402 133.303 68.4039 132.978 69.1654 132.256Z" fill="#FFCC9A"/>
<path d="M61.6001 132.8C59.5001 133.6 58.1001 135.2 58.6001 136.4C58.7001 136.6 58.8002 136.8 59.0002 137C61.5002 136.2 64.6002 134.5 66.3002 133.5V133.4C65.8002 132.2 63.7001 131.9 61.6001 132.8Z" fill="white"/>
<path d="M54.9 136.9C55.5 137.7 57 137.5 58.7 136.9C58.6 136.7 58.6 136.5 58.5 136.3C58 135 57 134 55.9 133.7C54.9 135.1 54.4 136.3 54.9 136.9Z" fill="#AE6B97"/>
<path d="M102.9 155.1C102.9 155.1 79.1 151.6 67.5 133.9L71.4 129.3C71.5 129.3 100.1 150.2 102.9 155.1Z" fill="#3305BF"/>
<path d="M46.5 104.7V107.8H75.7V104.1C75.7 104.1 48.8 96.8999 46.5 104.7Z" fill="#FFCC9A"/>
<path d="M24 44.1L31.2 40.5C31.2 40.5 44.1 74.6 68.5 59.9C68.5 59.9 79.6 51.3 81.1 40.5L90.4 44.1C90.4 44.1 77.4 76 77.4 104L44.8 104.7C44.8 104.7 39.8 68.9 24 44.1Z" fill="#FFC001"/>
<path d="M61.9999 53.2999H53.3999V64.4999H61.9999V53.2999Z" fill="#FFB67A"/>
<path d="M49.1 49.4C49.1 49.4 43.2 39.7 50.7 33.6C50.7 33.6 57 29.5 57.5 26.5C57.5 26.5 58.9 29.3 58.5 31.1C58.1 32.9 63.8 30.1 63.8 30.1C63.8 30.1 70.9 41.5 65.3 49.4C65.3 49.4 52.6 53.1 49.1 49.4Z" fill="#390B0B"/>
<path d="M57.2 58.8999C61.1765 58.8999 64.4 54.6466 64.4 49.3999C64.4 44.1532 61.1765 39.8999 57.2 39.8999C53.2236 39.8999 50 44.1532 50 49.3999C50 54.6466 53.2236 58.8999 57.2 58.8999Z" fill="#FDD0B1"/>
<path d="M23.9998 151.5C23.9998 151.5 17.6998 131.6 16.2998 115.9L21.9998 113.4L32.8998 133.5L23.9998 151.5Z" fill="#3305BF"/>
<path d="M45.1998 107.8H77.3999C77.3999 107.8 112.8 152.3 102.9 155.1C92.9999 157.9 68.1998 131.8 66.7998 127.2C65.3998 122.6 57.6998 126.5 57.6998 126.5C57.6998 126.5 40.6998 157 27.9998 155.3C27.9998 155.3 10.0998 151.9 45.1998 107.8Z" fill="#4818CC"/>
<path d="M17.1998 115.5L16.2998 113.4L20.4998 112L21.1998 113.8L17.1998 115.5Z" fill="#FFCC9A"/>
<path d="M19.9 111L18.5 104.3C18.3 103.5 17.5 103 16.7 103.3C12.6 104.6 0.0999847 109.1 0.899985 111.8C1.79998 115.1 15.7 112.5 15.7 112.5L19.9 111Z" fill="white"/>
<path d="M20.5001 112L19.1001 105.3C18.9001 104.5 18.1001 104 17.3001 104.3C13.2001 105.6 0.700082 110.1 1.50008 112.8C2.40008 116.1 16.3001 113.5 16.3001 113.5L20.5001 112Z" fill="#860F45"/>
<path d="M18.7477 113.501C19.8744 113.047 20.6369 112.304 20.4509 111.843C20.2649 111.383 19.2007 111.378 18.074 111.832C16.9473 112.287 16.1848 113.029 16.3708 113.49C16.5569 113.951 17.621 113.956 18.7477 113.501Z" fill="#FFCC9A"/>
<path d="M10.4 111C7.79996 111 5.69995 112.1 5.69995 113.6C5.69995 113.9 5.79996 114.1 5.89996 114.4C8.99996 114.6 12.9999 114.1 15.0999 113.7V113.6C15.0999 112.2 13 111 10.4 111Z" fill="white"/>
<path d="M1.49997 112.6C1.79997 113.7 3.49994 114.1 5.59994 114.2C5.59994 114 5.59994 113.7 5.59994 113.5C5.59994 111.9 4.89999 110.4 3.89999 109.7C2.29999 110.8 1.29997 111.8 1.49997 112.6Z" fill="#AE6B97"/>
<path d="M43.5998 109.7C43.5998 109.7 58.0998 112.7 79.8998 111L82.4998 114.4C82.4998 114.4 66.6998 119.2 41.2998 112.7L43.5998 109.7Z" fill="#EF907C"/>
<path d="M65.3999 117.1H60.0999C58.6999 117.1 57.5999 116 57.5999 114.6V112.9C57.5999 111.5 58.6999 110.4 60.0999 110.4H65.3999C66.7999 110.4 67.8999 111.5 67.8999 112.9V114.6C67.8999 116 66.6999 117.1 65.3999 117.1Z" fill="#FD9383" stroke="white" stroke-miterlimit="10"/>
<path d="M46.4999 110.2L45.3999 113.7L47.5999 114.3L48.7999 110.5L46.4999 110.2Z" fill="#9D4342"/>
<path d="M73.5999 111.4L74.2999 115.8L76.8999 115.5L75.9999 111.3L73.5999 111.4Z" fill="#9D4342"/>
<path d="M25.0999 43.5999C25.0999 43.5999 15.7999 14.9999 11.7999 11.7999C9.69992 10.0999 7.39996 7.19992 6.39996 2.49992C6.09996 1.09992 7.39992 -0.10009 8.79992 0.29991C10.9999 0.99991 12.6 2.69995 14.4 6.89995C14.4 6.89995 13.9999 1.99995 15.5999 2.89995C17.1999 3.79995 17.6999 12.2999 17.6999 12.2999L30.7999 40.9999L25.0999 43.5999Z" fill="#FFC4AA"/>
<path d="M88.4 43.5999C88.4 43.5999 97.7 14.9999 101.7 11.7999C103.8 10.0999 106.1 7.19992 107.1 2.49992C107.4 1.09992 106.1 -0.10009 104.7 0.29991C102.5 0.99991 100.9 2.69995 99.0999 6.89995C99.0999 6.89995 99.5 1.99995 97.9 2.89995C96.3 3.79995 95.7999 12.2999 95.7999 12.2999L82.7 40.9999L88.4 43.5999Z" fill="#FFC4AA"/>
<path d="M49.2999 47.4999L54.0998 44.9999L53.2999 46.2999L59.3999 44.9999L58.6999 45.9999L63.5998 45.0999L64.8999 47.9L62.6999 36.7L49.9999 38.7999C49.9999 38.7999 47.8999 41.7999 49.2999 47.4999Z" fill="#390B0B"/>
</svg></div>



          </ul>
        </div>

      </div>
    </div>

}

export default OrderScreen;