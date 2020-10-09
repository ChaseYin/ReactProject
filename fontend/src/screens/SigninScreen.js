import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faBook, faCarSide, faEnvelope } from '@fortawesome/free-solid-svg-icons'

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
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
    dispatch(signin(email, password));

  }
  return <div className='loginScreen'>
  <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2 align = 'center' className='goodFont-3'>Log In</h2>
        </li>
        <li>
          {loading && <div>Loading</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="email">
          <span className='goodFont-2'><FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;Email:</span>
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
        <span className='goodFont-2'><label htmlFor="password"><FontAwesomeIcon icon={faKey} />&nbsp;&nbsp;Password:</label></span>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className='btnLogIn'><span className='goodFont-2'>Log In</span></button>
        </li>
        <li className='goodFont-2'>
          Do not have an account yet?
        </li>
        <li className='cuteFont'>
          <text className='goodFont-2'><Link to={redirect === "/" ? "register" : "register?redirect=" + redirect}>Create a new Account</Link></text>
          {/* <button><Link to={redirect === "/" ? "register" : "register?redirect=" + redirect}><text className='formText'>Create a new Account</text></Link></button> */}
        </li>
      </ul>
    </form>
  </div>
  </div>
}
export default SigninScreen;