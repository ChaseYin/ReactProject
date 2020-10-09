import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_ANSWER_SUCCESS,
  PRODUCT_ANSWER_REQUEST,
  PRODUCT_ANSWER_FAIL

} from '../constants/productConstants';
import axios from 'axios';
import Axios from 'axios';

const listProducts = (
  category = '',
  searchKeyword = '',
  sortOrder = '',
) => async (dispatch) => {
  try {
    console.log('sortOrder是：'+sortOrder)
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      '/api/products?category=' +
        category +
        '&searchKeyword=' +
        searchKeyword +
        '&sortOrder=' +
        sortOrder
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      product = Object.assign(product,{
        'user':userInfo.name
      });
      const { data } = await Axios.post('/api/products', product, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        '/api/products/' + product._id,
        product,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const saveAnswer = (productId, answer) => async (dispatch, getState) => {
  // console.log('action获取的id是:'+productId)
  // console.log('action获取的答案是:'+answer)

  try {
    const {
      userSignin: { userInfo },
    } = getState();

    dispatch({ type: PRODUCT_ANSWER_REQUEST, payload: productId });

    const { data } = await axios.post('/api/products/saveAnswer/' + productId, answer, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    // const { data } = await axios.post('/api/products/saveAnswer/id' + productId, answer);
    console.log('服务器返回的data是：'+data)
    dispatch({ type: PRODUCT_ANSWER_SUCCESS, payload: data, success: true });

  } catch (error) {
     dispatch({ type: PRODUCT_ANSWER_FAIL, payload: error.message });
  }
};

const chooseIBM = (productId) => async (dispatch) => {
  // console.log('action获取的id是:'+productId)
  // console.log('action获取的答案是:'+answer)

  try {
    // const {
    //   userSignin: { userInfo },
    // } = getState();

    dispatch({ type: PRODUCT_ANSWER_REQUEST, payload: productId });

    const { data } = await axios.get('/api/products/IBMprocess/' + productId);
    // const { data } = await axios.post('/api/products/saveAnswer/id' + productId, answer);
    console.log('IBM服务器返回的data是：'+data)
    dispatch({ type: PRODUCT_ANSWER_SUCCESS, payload: data, success: true });

  } catch (error) {
     dispatch({ type: PRODUCT_ANSWER_FAIL, payload: error.message });
  }
};

const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete('/api/products/' + productId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    
    dispatch(listProducts());
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }
};



export {
  listProducts,
  detailsProduct,
  saveProduct,
  deleteProdcut,
  saveProductReview,
  saveAnswer,
  chooseIBM
};
