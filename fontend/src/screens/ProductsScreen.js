import React, { useEffect, useState, Component}  from 'react';
import { Form, Radio } from 'semantic-ui-react'
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {
  saveProduct,
  listProducts,
  deleteProdcut,

} from '../actions/productActions';
import PaypalButton from '../components/PaypalButton';
import workerL from '../components/worker'
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
  faMusic,
  faCloud,
  faReceipt,
  faCalendarCheck,
  faCalendarPlus,
  faCalendarWeek,
  faFileAlt,
  faCamera,
  faCameraRetro,
  faQuestion,
  faQuestionCircle,
  faDirections,
  faMoneyBillAlt,
  faCalculator,
  faUserAltSlash,
  faSign,
  faSignal,
  faSignLanguage,
  faSignature,
  faAddressCard,
  faDesktop,
  faClock

} from '@fortawesome/free-solid-svg-icons'


function ProductsScreen(props) {
 
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [proposition, setProposition] = useState('');
  const [question, setQuestion] = useState('');
  const [needMaster, setNeedMaster] = useState('');
  const [imgTask, setImgTask] = useState('');
  const [audio, setAudio] = useState('');
  const [audioText, setAudioText] = useState('');
  const [awsAudio, setAwsAudio] = useState('');
  var [type, setType] = useState('');
  const [allocate, setAllocate] = useState('');
  // const [taskInfo, setTaskInfo] = useState('');
  var taskInfo = ''
  var workerList = []
  const [worker, setWorker] = useState('');
  
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;




  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setExpiryDate(product.expiryDate);
    setType(product.type);
    setAllocate(product.allocate);
    setProposition(product.proposition);
    setQuestion(product.question)
    setNeedMaster(product.needMaster)
    setImgTask(product.imgTask)
    setAudio(product.audio)
    setAudioText(product.audioText)
    setAwsAudio(product.awsAudio)
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        expiryDate,
        type,
        allocate,
        proposition,
        question,
        needMaster,
        imgTask,
        audio,
        audioText,
        awsAudio
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };


  const uploadAudioHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('audio', file);

    setUploading(true);
    axios
      .post('/api/uploads/', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setAudio(response.data.path);
        setAudioText(response.data.text);
        // console.log('收到结果:'+response.data.text)
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });

      axios
      .post('/api/uploads/s3Audio', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setAwsAudio(response.data)
        //console.log('上传AMS的返回数据是：'+response.data);
        // setAudio(response.data.path);
        // setAudioText(response.data.text);
        // console.log('收到结果:'+response.data.text)
        //setUploading(false);
      })
      .catch((err) => {
        console.log('AWS上传错误'+err);
        //setUploading(false);
      });



  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);

    setUploading(true);
    axios
      .post('/api/uploads/s3', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };


   function getWorker(){
    axios
      .get('/api/users/getWorker',  {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        for(var i = 0; i < response.data.length; i++)
        {
          workerList.push(response.data[i].name)
        }
        
        console.log('worker是'+workerList)
        setWorker(workerList);
        //  list(workerList)
       
      }
      )
      .catch((err) => {
        console.log(err);
      });
      
     
  };
 useEffect(()=>{
  if(type==='choiceTask'){
    getWorker()
   
  }
  
 },[type]);
  if(type==='choiceTask'){
    var length=worker.length
    var arr = new Array()
    arr = worker
    //console.log('新worker哈哈哈'+arr[0])
    let newArr = Array.from(arr);
    // getWorker()
   taskInfo = (
   
    <tbody>
       <h2>Choose specific worker</h2>
      {
              newArr.map(function(val, index){
              return <span className='goodFont'>
                 <input name="type" type="radio" value={worker[index]}
           onChange={(e) => setAllocate(worker[index]) } 
       /><FontAwesomeIcon icon={faUser}/>&nbsp;&nbsp;worker{index+1}:{val}<br/>
              
                </span>
              })
      }
          </tbody>



    // <span>
    // <h2>Choose specific worker</h2>
  
    //   <span className="goodFont">
    //   <input name="type" type="radio" value={worker[0]}
    //         onChange={(e) => setAllocate(worker[0]) } 
    //         /><FontAwesomeIcon icon={faUser}/>&nbsp;&nbsp;worker1:{worker[0]}<br/> </span> 

    //         <span className="goodFont">
    //         <input name="type" type="radio" value={worker[1]}
    //         onChange={(e) => setAllocate(worker[1]) } 
    //         /><FontAwesomeIcon icon={faUser}/>&nbsp;&nbsp;worker2:{worker[1]} <br/></span> 
            
    //         <span className="goodFont"><input name="type" type="radio" value={worker[2]}
    //         onChange={(e) => setAllocate(worker[2]) } 
    //         /><FontAwesomeIcon icon={faUser}/>&nbsp;&nbsp;worker3:{worker[2]} <br/></span> 
    // </span>
    )
        
  }
  else{
    if(type==='decisionTask'){
      taskInfo = (
        <span>
        <h3><FontAwesomeIcon icon={faDirections}/>&nbsp;&nbsp;Input proposition here</h3>
        <li>
                <input
                  type="text"
                  name="proposition"
                  value={proposition}
                  id="proposition"
                  placeholder="input your proposition for worker to make a decision"
                  onChange={(e) => setProposition(e.target.value)}
                ></input>
              </li>
        </span>
        )
      }
      else{
        if(type==='sentenceTask'){
          taskInfo = (
            <span>
            <h3><FontAwesomeIcon icon={faQuestionCircle}/>&nbsp;&nbsp;Input question here</h3>
            <li>
            <input
                  type="text"
                  name="question"
                  value={question}
                  id="question"
                  placeholder="input your Question for worker"
                  onChange={(e) => setQuestion(e.target.value)}
                ></input>
                </li>
            </span>
            )
          }
          else{
            if(type==='imageTask'){
              taskInfo = (
                <span>
                <h3><FontAwesomeIcon icon={faCameraRetro}/>&nbsp;&nbsp;Image recognize task</h3>
                <li>
                <label htmlFor="image">Upload image here</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading to AWS server...</div>}
              </li>
                </span>
                )
              }
              else{
                if(type==='audioTask')
                {
                  taskInfo = (
                    <span>
                    <h3><FontAwesomeIcon icon={faMusic}/>&nbsp;&nbsp;Speech to text task</h3>
                    <li>
                    <label htmlFor="image">Upload speech here (only support .mp3 now)</label>
                    <input
                      type="text"
                      name="audio"
                      value={audio}
                      id="audio"
                      onChange={(e) => setAudio(e.target.value)}
                    ></input>
                    <input type="file" onChange={uploadAudioHandler}></input>
                    {uploading && <div>Uploading to AWS server...</div>}
                  </li>
                    </span>
                    )
                }
              }
          }
      }
  }
 
  return (
    <div className='productScreen-1'>
    <div className="content content-margined">
      <div className="product-header">
        <span className='normalFont-4'>The task I have created</span>

       

        <div align='right'>
        {/* <button className="btn" onClick={() => openModal({})}>
         <span>Create a task</span>
        </button> */}
        <div align='right'>
        <svg width="137" height="116" viewBox="0 0 137 116" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M59.1001 61.5H56.2001L49.7001 32.5H52.6001L59.1001 61.5Z" fill="#8488A3"/>
        <path d="M85.0764 61.4455V58.5455L56.1764 58.5455V61.4455L85.0764 61.4455Z" fill="#8488A3"/>
        <path d="M12.4 110.2H7.5V115.3H12.4V110.2Z" fill="#F4D3C2"/>
        <path d="M106 73.7L78.4001 62.5C74.0001 60.3 68.7001 61.6999 66.0001 65.7999L46.2001 101.5L61.8 96.7999L76.0001 80.7L87.2001 89.2L113.8 85.7999L106 73.7Z" fill="#021E33"/>
        <path d="M106.4 84.0999C106.4 84.0999 20 100.7 12.5 109V115.5L119.5 113.7C119.5 113.7 128.6 111.2 127.8 99.4999L106.4 84.0999Z" fill="#083451"/>
        <path d="M6.40002 115.6H2.80002C1.70002 115.6 0.900024 114.7 0.900024 113.7V107.4C0.900024 106.3 1.80002 105.5 2.80002 105.5H6.40002C7.50002 105.5 8.30002 106.4 8.30002 107.4V113.7C8.30002 114.7 7.50002 115.6 6.40002 115.6Z" fill="#063455"/>
        <path d="M0.900024 106.8C0.900024 106.8 1.30004 92.8999 2.70004 93.0999C5.80004 93.4999 8.40002 106.8 8.40002 106.8H0.900024Z" fill="#063455"/>
        <path d="M109.9 6.29993L104.9 18.7999C104.6 20.1999 105.3 21.5999 106.6 22.2999L112.1 24.9V32.5999L119.5 29.7999L118.6 8.19995L109.9 6.29993Z" fill="#FDD3C3"/>
        <path d="M109.9 8.99995L116.9 12.2C116.9 12.2 113.6 15.4 118.8 22.2C118.8 22.2 126.8 19.7999 127.3 16.5999C127.8 13.2999 124.6 7.79994 122.1 8.29994C119.6 8.79994 117.6 -6.60002 108.5 3.89998C108.5 3.89998 106.5 6.69995 109.9 8.99995Z" fill="#3A3935"/>
        <path d="M112 32.5999L112.1 34.5999L121.3 30.9999L119.4 29.7L112 32.5999Z" fill="#86DCB7"/>
        <path d="M112.1 34.6C112.1 34.6 104 72.4 106.3 84.1L126.6 106.8C126.6 106.8 152.4 51.6 121.2 31L112.1 34.6Z" fill="#00DF99"/>
        <path d="M118.168 17.9109C118.713 16.7639 118.63 15.584 117.982 15.2755C117.333 14.9671 116.366 15.6469 115.82 16.794C115.274 17.941 115.357 19.1209 116.006 19.4293C116.654 19.7378 117.622 19.058 118.168 17.9109Z" fill="#FDD3C3"/>
        <path d="M120 59.4998L115.5 75.8999C115.1 76.9999 113.8 77.2998 112.9 76.5998L86.0001 55.1999C86.0001 55.1999 78.1001 50.0999 75.0001 57.3999C75.0001 57.3999 74.7001 59.5999 83.7001 60.6999C83.7001 60.6999 103.9 89.2998 115.7 92.0998C131 95.5998 132.7 62.6999 132.7 62.6999L120 59.4998Z" fill="#FDD3C3"/>
        </svg><button className="btn" onClick={() => openModal({})}>
         <span className='goodFont-2'>Create new task</span>
        </button>
        <br/>
        </div>
        </div>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
        
            <ul className="form-container">
              <li>
                <h2>Create a Task</h2>
              </li>
              <li>
                {loadingSave && <div>Loading</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
              <span className='normalFont-3'>Task type:</span><br /> 
            
              <span><input name="type" type="radio" value='choiceTask'
            onChange={(e) => setType('choiceTask')} 
            />Choice Task </span> 
            <span><input name="type" type="radio" value='decisionTask'
            onChange={(e) => setType('decisionTask')} />Decision-Making Task</span> 
            <label><input name="type" type="radio" value='sentenceTask'
            onChange={(e) => setType('sentenceTask')} />Sentence-Level Task </label> 
            <label><input name="type" type="radio" value='imageTask'
            onChange={(e) => setType('imageTask')} />Image Task </label> 
            <label><input name="type" type="radio" value='audioTask'
            onChange={(e) => setType('audioTask')} />Audio Task </label> 
              </li>
             

            <div className='setTask'><h3 className='normalFont-2'>Setting up your task</h3>
            {taskInfo}
            </div>


              <li>
                <label htmlFor="name"><FontAwesomeIcon icon={faTasks}/>&nbsp;&nbsp;Task Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price"><FontAwesomeIcon icon={faMoneyBillAlt}/>&nbsp;&nbsp;Reword per response</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="expiryDate"><FontAwesomeIcon icon={faClock}/>&nbsp;&nbsp;Expiry Date:</label>
                <input
                  type="Date"
                  name="expiryDate"
                  value={expiryDate}
                  id="expiryDate"
                  onChange={(e) => setExpiryDate(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="expiryDate"><FontAwesomeIcon icon={faQuestionCircle}/>&nbsp;&nbsp;Require Master Workers:</label>
                <span><input name="needMaster" type="radio" value='true'
            onChange={(e) => setNeedMaster('Need')} 
            />True </span> 
            <span><input name="type" type="radio" value='false'
            onChange={(e) => setNeedMaster('notNeed')} />False</span> 
              </li>
            
              {/* <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li> */}
              <li>
                <label htmlFor="countInStock"><FontAwesomeIcon icon={faUserAlt}/>&nbsp;&nbsp;Number of workers:</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name"><FontAwesomeIcon icon={faCodeBranch}/>&nbsp;&nbsp;Task Category:</label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description"><FontAwesomeIcon icon={faAddressCard}/>&nbsp;&nbsp;Description:</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              {/* <li>
                <PaypalButton />
              </li> */}
              <li className='position'>
                <button type="submit" className='btnSuccess'>
                  <span>{id ? 'Update' : 'Create Task'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  
                  className='btn'
                >
                  <span>Return</span>
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">

        <table className="table">
          <thead>
            <tr>
              <th className="goodFont-3">ID</th>
              <th className="goodFont-3">TaskName</th>
              <th className="goodFont-3">Salary</th>
              <th className="goodFont-3">Category</th>
              {/* <th>Brand</th> */}
              <th className="goodFont-3">Operation</th>
             
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="goodFont-2">{product._id}</td>
                <td className="goodFont-2">{product.name}</td>
                <td className="goodFont-2">{product.price}</td>
                <td className="goodFont-2">{product.category}</td>
                {/* <td>{product.brand}</td> */}
                <td>
               
                  {product.user==userInfo.name?<button className="littleBtn" onClick={() => openModal(product)}><span className='goodFont-2'>Edit</span></button>:''}
                  &nbsp;&nbsp;{product.user==userInfo.name?<button className="littleBtn2" onClick={() => deleteHandler(product)}><span className='goodFont-2'>Delete</span></button>:''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
export default ProductsScreen;
