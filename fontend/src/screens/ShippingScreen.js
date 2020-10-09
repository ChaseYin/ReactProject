import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
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
  faGlobeAsia

} from '@fortawesome/free-solid-svg-icons'

function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push('payment');
  }
  return <div>
    
   <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div>
      
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2><FontAwesomeIcon icon={faUserAlt}/>&nbsp;&nbsp;&nbsp;Worker detail</h2>
          </li>

          <li>
            <label htmlFor="address">
            <FontAwesomeIcon icon={faAddressBook}/>&nbsp;&nbsp;&nbsp;Worker address:
          </label>
            <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="city">
            <FontAwesomeIcon icon={faCity}/>&nbsp;&nbsp;&nbsp;City:
          </label>
            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
            <FontAwesomeIcon icon={faLaptopCode}/>&nbsp;&nbsp;&nbsp;Postal code:
          </label>
            <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="country">
            <FontAwesomeIcon icon={faGlobeAsia}/>&nbsp;&nbsp;&nbsp;Country
          </label>
            <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
            </input>
          </li>


          <li>
            <button type="submit" className="btn"><span>Continue</span></button>
          </li>

        </ul>
      </form>
    </div>
    
    </div>

<div className='workerDetail'>
<svg width="300" height="300" viewBox="0 0 176 134" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3301 85.1329L19.1175 74.8527L51.942 84.0507L47.0724 95.5934L15.3301 85.1329Z" fill="#0D4075"/>
<path d="M17.6747 75.5742L21.8228 64.0315L55.3687 74.8527L51.942 86.5758L17.6747 75.5742Z" fill="#225DA1"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.165 60.476L50.0554 66.9815L47.558 74.4735L45.5049 73.7891L47.336 68.2956L33.4841 63.2585L31.3209 69.4389L29.2782 68.7239L32.165 60.476Z" fill="#0D4077"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.6711 77.9576L40.3874 80.2962L39.0877 84.9751L30.0669 81.9682L31.6711 77.9576ZM32.5349 79.6832L31.9748 81.0833L38.1038 83.1263L38.6076 81.3125L32.5349 79.6832Z" fill="white"/>
<mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="99" width="169" height="35">
<path d="M143.562 133.159C143.395 128.203 143.049 125.435 141.578 120.534L148.792 118.009C149.728 121.744 150.222 123.89 150.415 128.83C164.821 129.489 165.478 130.898 168.451 133.159H143.562Z" fill="#FFBFB3"/>
<path d="M15.5105 99.4325C19.7387 102.558 22.1081 104.022 26.3317 105.565L22.905 112.418C19.9597 111.028 18.3221 110.108 15.5105 107.368C7.07051 115.53 3.94581 117.641 0 118.911L15.5105 99.4325Z" fill="#FFBFB3"/>
</mask>
<g mask="url(#mask0)">
<path d="M143.562 133.159C143.395 128.203 143.049 125.435 141.578 120.534L148.792 118.009C149.728 121.744 150.222 123.89 150.415 128.83C164.821 129.489 165.478 130.898 168.451 133.159H143.562Z" fill="#FFBFB3"/>
<path d="M15.5105 99.4325C19.7387 102.558 22.1081 104.022 26.3317 105.565L22.905 112.418C19.9597 111.028 18.3221 110.108 15.5105 107.368C7.07051 115.53 3.94581 117.641 0 118.911L15.5105 99.4325Z" fill="#FFBFB3"/>
<path d="M156.548 124.862L130.216 130.273C137.55 132.918 153.085 138.425 156.548 139.291C160.01 140.156 176.026 133.64 178.911 130.273L156.548 124.862Z" fill="#63160E"/>
<path d="M23.2657 97.4486L15.3301 113.32L-1.62317 124.862V113.32L4.86958 97.4486C8.35643 96.6069 16.3401 94.8515 20.3801 94.5629C24.42 94.2744 23.9871 96.3665 23.2657 97.4486Z" fill="#63160E"/>
</g>
<path d="M38.2351 67.5097C36.648 65.634 38.8964 61.9187 40.219 60.2955C41.5416 60.2955 44.2589 60.4759 44.5475 61.1973C44.9082 62.0991 47.7938 66.9686 46.5314 68.4115C45.2689 69.8543 40.219 69.8543 38.2351 67.5097Z" fill="#FFBFB3"/>
<path d="M167.729 11.7803C165.471 13.4741 165.926 16.4695 165.204 18.6338L169.353 21.6998L172.238 18.273C173.35 18.273 174.121 17.6593 174.653 16.7345C176.847 12.9204 171.249 9.14035 167.729 11.7803Z" fill="#FFBFB3"/>
<path d="M109.836 23.1426L112.902 19.1748L119.214 24.7658C119.034 25.4271 118.673 26.7858 118.673 26.93C118.673 27.0743 119.034 29.2746 119.214 30.3568L114.525 31.6192L109.836 27.2907V23.1426Z" fill="#FFBFB5"/>
<mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="39" y="18" width="132" height="69">
<path d="M105.868 25.848L109.836 23.1426C112.361 31.4389 117.952 32.7014 118.673 27.1104C131.795 32.4017 144.644 29.455 164.483 18.2731L170.435 21.3391C161.379 36.3864 150.879 41.527 119.755 43.162C109.836 61.9188 110.557 48.2119 94.3253 76.5275C81.7993 77.9314 75.8856 80.2395 66.7311 86.2666C69.6033 68.0839 74.7023 57.9389 88.7343 39.9156C67.46 40.8361 58.2522 46.3112 45.6296 63.0009L39.4976 60.1153C56.6547 25.1319 73.9174 24.3613 105.868 25.848Z" fill="#53A2DB"/>
</mask>
<g mask="url(#mask1)">
<g filter="url(#filter0_i)">
<path d="M105.868 25.848L109.836 23.1426C112.361 31.4389 117.952 32.7014 118.673 27.1104C131.795 32.4017 144.644 29.455 164.483 18.2731L170.435 21.3391C161.379 36.3864 150.879 41.527 119.755 43.162C109.836 61.9188 110.557 48.2119 94.3253 76.5275C81.7993 77.9314 75.8856 80.2395 66.7311 86.2666C69.6033 68.0839 74.7023 57.9389 88.7343 39.9156C67.46 40.8361 58.2522 46.3112 45.6296 63.0009L39.4976 60.1153C56.6547 25.1319 73.9174 24.3613 105.868 25.848Z" fill="url(#paint0_radial)"/>
</g>
<path d="M115.246 34.5048L113.804 33.9638L112.541 33.4227L113.804 28.3728L116.689 28.9139L118.493 33.4227L117.411 34.5048C115.787 52.5403 93.6038 53.9831 90.1771 58.6723L82.7826 57.2295L88.7343 50.1957C102.622 48.0314 111.656 43.2367 115.246 34.5048Z" fill="white"/>
<path d="M114.525 29.0943C112.446 40.0462 111.125 40.7217 108.213 22.2408L118.853 25.1265C119.864 29.012 120.233 31.2661 120.116 35.5871C118.199 33.5703 117.536 32.1709 116.689 29.455L114.525 29.0943Z" fill="#3E8DC8"/>
</g>
<path d="M67.4525 91.4969C66.7763 88.8718 66.6865 87.5589 67.4525 85.7255C76.671 78.9271 82.2899 76.6142 93.4235 76.1667V78.1506C124.084 77.0685 145.185 92.7593 150.776 119.271L140.135 121.796C125.227 103.268 113.49 97.4963 85.3076 97.0878C71.781 115.484 50.1385 124.141 19.4783 113.68L26.5121 103.04C46.8255 105.606 55.6751 102.892 67.4525 91.4969Z" fill="#0D2142"/>
<path d="M121.559 26.2086C117.181 24.5161 115.365 22.802 112.902 18.814L110.738 8.89456L120.477 7.63208L127.51 11.0588L127.514 11.127C128.072 21.0014 128.386 26.5583 121.559 26.2086Z" fill="#FFBFB3"/>
<path d="M127.33 14.8463V18.9945C128.953 19.8962 130.263 19.1428 127.33 14.8463Z" fill="#FB846B"/>
<path d="M118.051 12.9847C118.356 12.5474 118.543 11.6817 118.673 10.3374C118.673 10.3374 122.179 10.6003 124.303 11.0651C125.07 11.233 126.749 11.2264 127.351 10.7216C130.737 7.88124 131.284 4.18983 129.306 1.96269C126.304 -1.41591 121.748 2.42128 117.395 3.63799C115.003 4.30681 111.797 4.42237 110.165 6.29533C110.041 6.43725 109.927 6.58441 109.822 6.73787C108.217 9.08029 109.432 12.2159 110.377 14.8932C110.891 16.3487 111.365 17.6071 112.105 18.3515C113.035 19.2876 113.92 17.8352 113.427 16.6113C112.66 14.7117 112.563 13.5635 113.22 12.9394C114.478 11.7424 117.059 14.4103 118.051 12.9847Z" fill="black"/>
<defs>
<filter id="filter0_i" x="39.4976" y="18.2731" width="130.937" height="71.9936" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="10"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0342708 0 0 0 0 0.355632 0 0 0 0 0.5875 0 0 0 0.64 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
</filter>
<radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(104.966 52.2699) rotate(134.129) scale(20.9811 40.4038)">
<stop stop-color="#8DCBF8"/>
<stop offset="1" stop-color="#53A2DB"/>
</radialGradient>
</defs>
</svg>

</div>
  </div>

}
export default ShippingScreen;