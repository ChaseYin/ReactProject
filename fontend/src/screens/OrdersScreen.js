import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from '../actions/productActions';


function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  // const orderDelete = useSelector(state => state.orderDelete);
  // const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const productList = useSelector((state) => state.productList);
  const { products} = productList;


  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const deleteHandler = (product) => {
    // dispatch(deleteProdcut(product._id)).then(()=>dispatch({ type: PRODUCT_LIST_REQUEST }));
    dispatch(deleteProdcut(product._id));
  };


  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;



  return loading ? <div>Loading</div> :
    <div className="content content-margined">
      <div className="order-header">
      <h2 className="goodFont">Your Allocated Task:</h2>
      </div>
      <ul className="products">
    {products.map((product) => product.allocate===userInfo.name ? 
    
    <li key={product._id}>
    <div className="product">
      <Link to={'/product/' + product._id}>
        <img
          className="product-image"
          src={product.image||'https://xiaofeng313.s3.amazonaws.com/9d3c9a5f83ec09ab41a85e36e966683f.jpg'}
          onerror="this.src='https://xiaofeng313.s3.amazonaws.com/9d3c9a5f83ec09ab41a85e36e966683f.jpg';this.onerror=null"
          alt="product"
        />
      </Link>
      <div className="goodFont-3">
        <Link to={'/product/' + product._id}>{product.name}</Link>
      </div>
      <div className="goodFont">Expiry Date: &nbsp;{product.expiryDate}</div>
      <div className="goodFont">Type: &nbsp;{product.type}</div>
      <div className="goodFont">${product.price}&nbsp;Per Response</div>
      <div>
                <button type="button" className='littleBtn2' onClick={() => deleteHandler(product)}>Reject this task</button>
              </div>
    </div>
  </li>
            
   
    :'')}
    </ul>

    {/* {loading ? (
      <div>loading</div>
    ) : error ? (
      <div>{error}</div>
    ) : (

      <ul className="">

        {products.map((product) => (
        <li key={product._id}>
            {product.allocate==userInfo.name ?
            <div>
            <Link to={'/product/' + product._id}>
            </Link>
            <div>
              <Link to={'/product/' + product._id}>{product.name}</Link>
            </div>
            <div>Type: &nbsp;{product.type}</div>
            <div>${product.price}&nbsp;Per response</div>
            <div>
            </div>
            <div>
                <button type="button" onClick={() => deleteHandler(product)}>Reject this task是这个按钮</button>
              </div>
            </div>
           :<div className='hideDiv'></div>
            }
            
        </li>
        ))}
      </ul>
    )
    } */}



  
  </div>



}
export default OrdersScreen;