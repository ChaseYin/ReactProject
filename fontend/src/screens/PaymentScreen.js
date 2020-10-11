import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
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
  faPiggyBank,
  faSdCard,
  faVials

} from '@fortawesome/free-solid-svg-icons'


function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2> <FontAwesomeIcon icon={faCreditCard}/>&nbsp;&nbsp;&nbsp;Get salary in:</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label for="paymentMethod">&nbsp;&nbsp;<FontAwesomeIcon icon={faPiggyBank}/>&nbsp;&nbsp;&nbsp;Mastercard</label>
              </div>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label for="paymentMethod">&nbsp;&nbsp;<FontAwesomeIcon icon={faCreditCard}/>&nbsp;&nbsp;&nbsp;Visacard</label>
              </div>
            </li>

            <li>
              <button type="submit" className="btn">
                <span>Continue</span>
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default PaymentScreen;
