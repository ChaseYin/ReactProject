import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import { listProducts } from '../actions/productActions';
import '../css/myBtn.css'


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
  faTable

} from '@fortawesome/free-solid-svg-icons'

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  


  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);
  
  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id)); 
  }

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }))
  }
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name)
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {

    };
  }, [userInfo])

  return <div className='profileScreen'>
  <div className="profile">
    <div className="profile-info">
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
          <div align='center'>
              <h2 className='normalFont-3'>User Information Update</h2>
          </div>
            <li>
              {loading && <div>Loading</div>}
              {error && <div>{error}</div>}
              {success && <div>Success!</div>}
            </li>
            <li>
              <label htmlFor="name">
                <h3><FontAwesomeIcon icon={faAddressBook}/>&nbsp;&nbsp;Username:</h3>
              </label>
              <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
              <h3><FontAwesomeIcon icon={faEnvelope}/>&nbsp;&nbsp;Email:</h3>    
              </label>
              <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">
              <h3><FontAwesomeIcon icon={faKey}/>&nbsp;&nbsp;Password:</h3>
                </label>
              <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li>

            <li>
              <button type="submit" className="btnLogOut"><span className='cuteFont'><FontAwesomeIcon icon={faUpload}/>&nbsp;&nbsp;&nbsp;Update</span></button>
            </li>
            <li>
              <button type="button" onClick={handleLogout} className="btn"><span className='cuteFont'><FontAwesomeIcon icon={faOutdent}/>&nbsp;&nbsp;&nbsp;Log out</span></button>
            </li>

          </ul>
        </form>
      </div>
    </div>
   </div>
   <div className="order">
    <div align="center"><h1 className='font1'>My task:</h1></div>
      {
        loadingOrders ? <div>Loading</div> :
          errorOrders ? <div>{errorOrders} </div> :
            <table className="table">
              <thead>
                <tr>
                  <th className='font1'><FontAwesomeIcon icon={faUser}/>&nbsp;ID:</th>
                  <th className='font1'><FontAwesomeIcon icon={faCalendar}/>&nbsp;Date:</th>
                  <th className='font1'><FontAwesomeIcon icon={faMoneyCheckAlt}/>&nbsp;Total:</th>
                  <th className='font1'><FontAwesomeIcon icon={faToolbox}/>&nbsp;Operation:</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => <tr key={order._id}>
                  <td className='font1'>{order._id}</td>
                  <td className='font1'>{order.createdAt}</td>
                  <td className='font1'>{order.totalPrice}</td>
                  <td>
                    <button className='littleBtn' text-decoration='none'>
                    <text color='red'><Link to={"/order/" + order._id}>Detail</Link></text></button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" onClick={() => deleteHandler(order)} className='littleBtn2'>Cancel Task</button>
                  </td>
                </tr>)}
              </tbody>
            </table>
      }
    </div>
  </div>
}

export default ProfileScreen;