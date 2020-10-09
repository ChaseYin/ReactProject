import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { createOrder } from '../actions/orderActions';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import '../css/woah.css'
import '../izmir.min.css'

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
  faCode,
  faBoxOpen,
  faBoxTissue,
  faBoxes,
  faTimes,
  faCalendarTimes,
  faMoneyBillAlt,
  faNotesMedical,
  faQuran,
  faMonument,
  faSmileBeam,
  faComment,
  faCommentDots

} from '@fortawesome/free-solid-svg-icons'
// import '../css/button.css'

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  const [date, setDate] = useState('');


  
  useEffect(() => {
    if (productSaveSuccess) {
      alert('Comment Successfully!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    dispatch(createOrder({
      
    }));
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  console.log(product)

  return (
    
    <div className='productScreen'>
        {/* <h1 className="woah simpleEntrance">Woah</h1> */}
      <div className="back-to-result">
      
      </div>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>    
          <div className="details">
            <div className="details-image">
              <img
              src={product.image}
              onerror="this.src='images/default.jpg';this.onerror=null"
              alt="product"></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <span className='goodFont-3'><FontAwesomeIcon icon={faBoxOpen}/>&nbsp;Task Name:&nbsp;&nbsp;{product.name}</span>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </a>
                </li>
                <li>
                <FontAwesomeIcon icon={faCalendar}/>&nbsp;Expiry Date: <b>{JSON.stringify(product.expiryDate)}</b>
                </li>
                <li>
                <FontAwesomeIcon icon={faMoneyBillAlt}/>&nbsp;Per response: <b>${product.price}</b>
                </li>
                <li>
                <FontAwesomeIcon icon={faFileWord}/>&nbsp;Discription:
                
                  {product.description}

                  <br/>
                  {product.awsAudio ? <div>
                    <br/>
                    <a href={product.awsAudio} target='blank'>Listen the audio right now</a>
                  </div>
                  : ''}
                </li>

              </ul>
              <div className="sideAction">
              <ul>
                {/* <li align='center'>Per response: {product.price}</li> */}
                <li align='center'>
              Status:{' '}
                  {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                </li>
                <li align='center'>
                  Account:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li align='center'>
                  {product.countInStock > 0 && (
                    <button
                    
                      onClick={handleAddToCart}
                      className='acceptBtn'
                    >
                      <span className='goodFont'><FontAwesomeIcon icon={faSmileBeam}/>&nbsp;Accept this task</span>
                    </button>
                  )}
                </li>
              </ul>
            </div>
            </div>
           
          </div>
          <div className="content-margin">
        
            <h2>Comment</h2>
            {!product.reviews.length && <div>There is no comment yet</div>}
            <ul className="review" id="reviews">
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))}
              <li>
                <h3>Post a new comment here</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating"><span className='goodFont'>Level</span></label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- poor</option>
                          <option value="2">2- normal</option>
                          <option value="3">3- good</option>
                          <option value="4">4- very good</option>
                          <option value="5">5- perfect</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment"><span className='goodFont'>Comment</span></label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className='publishBtn'>
                          <span className='goodFont'>Publish&nbsp;<FontAwesomeIcon icon={faCommentDots}/></span>
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    <Link to="/signin">Log in</Link> to make comment
                  </div>
                )}
              </li>
            </ul>
         
          </div>
          
          <Link to="/">Return</Link>
          
          
        </>
      )}
    </div>

  );
}
export default ProductScreen;
