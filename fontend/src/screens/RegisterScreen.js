import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import axios from 'axios';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faBook, faTimesCircle, faAddressBook, faKey, faEnvelope,
  faCarSide,
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
  faUserAlt,
  faFileWord,
  faGlobeAsia,
  faSearch,
  faCat,
  faSchool,
  faCodeBranch,
  faCode

} from '@fortawesome/free-solid-svg-icons'



function RegisterScreen(props) {

  const [sdkReady, setSdkReady] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password,isAdmin));
  }
  const redirectToPaypal = async () => {
    const result = await axios.get("/api/config/paypal");
    const clientID = result.data;
    let url = 'https://www.paypal.com/sdk/js?client-id='+clientID;
    window.open(url);
  }

  return <div className='signInScreen'>
  <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2 align='center' className='goodFont-3'>Create a new account</h2>
        </li>
        <li>
          {loading && <div>Loading</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="name">
            <span className='goodFont-2-1'> <FontAwesomeIcon icon={faUser}/>&nbsp;&nbsp;User Name:</span>
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="email">
          <span className='goodFont-2-1'> <FontAwesomeIcon icon={faEnvelope}/>&nbsp;&nbsp;Email:</span>
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">
          <span className='goodFont-2-1'> <FontAwesomeIcon icon={faKey}/>&nbsp;&nbsp;Password:</span>
            </label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="rePassword">
          <span className='goodFont-2-1'> <FontAwesomeIcon icon={faKey}/>&nbsp;&nbsp;Confirm Password:</span>
            </label>
          <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
          </input>
        </li>
        <li>
          <select name="isAdmin" id='isAdmin' onChange={(e) => setIsAdmin(e.target.value)}>
            <option value="1" selected="selected">Requester</option>
            <option value="0">Worker</option>
          </select>
        </li>
        <li>
          <button type="submit" className="btnLogIn"><span className='goodFont-2'>Register</span></button>
        </li>
<br/>
        <li>
          Already have an account?
          <div align='right'><Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}><button className="littleBtn3" ><span className='goodFont'>Go to Log in</span></button></Link></div>
        </li>

      </ul>
    </form>
  </div>
  </div>
}
export default RegisterScreen;