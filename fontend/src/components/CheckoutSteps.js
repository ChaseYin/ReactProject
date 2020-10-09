import React from 'react';
function CheckoutSteps(props) {
  return <div className="checkout-steps">
    <div className={props.step1 ? 'active' : ''} >Log in</div>
    <div className={props.step2 ? 'active' : ''} >Worker Detail</div>
    <div className={props.step3 ? 'active' : ''} >Salary</div>
    <div className={props.step4 ? 'active' : ''} >Confirm</div>
  </div>
}

export default CheckoutSteps;