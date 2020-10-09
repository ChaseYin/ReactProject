import express from 'express';

import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();
var ibm
router.get('/', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  // const expiry = req.query.expiry ? { expiry: req.query.expiry } : {};
  //console.log('expiry Date是：'+req.query.sortOrder)
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
    
   if(req.query.sortOrder=='lowest')
    {
      const sortOrder = req.query.sortOrder
      ? req.query.sortOrder === 'lowest'
        ? { price: 1 }
        : { price: -1 }
      : { _id: -1 };
     
    const products = await Product.find({ ...category, ...searchKeyword }).sort(
      sortOrder
      
    );
    res.send(products);
    }
    else if(req.query.sortOrder=='expiry')
    {
      const newSort = req.query.sortOrder
      ? req.query.sortOrder === 'expiry'
      ? { expiryDate: 1}
      : { expiryDate: -1}
      : { _id:-1}
      const products = await Product.find({ ...category, ...searchKeyword }).sort(
        newSort
      );
      res.send(products);
    }
  else{
    const sortOrder = req.query.sortOrder
      ? req.query.sortOrder === 'lowest'
        ? { price: 1 }
        : { price: -1 }
      : { _id: -1 };
     
    const products = await Product.find({ ...category, ...searchKeyword }).sort(
      sortOrder
      
    );
    res.send(products);
  }

  // const newSort = req.query.sortOrder
  // ? req.query.sortOrder === 'expiry'
  // ? { expiryDate: 1}
  // : { expiryDate: -1}
  // : { _id:-1}

  // res.send(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found.' });
  }
});
router.post('/:id/reviews', isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;

   

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });
});

// router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  router.delete('/:id', isAuth, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.post('/saveAnswer/:id', isAuth, async (req, res) => {
  // console.log('body:'+JSON.stringify(req.body))
   console.log('传来的商品id是'+req.params.id)
   console.log('输入的答案是'+req.body.answer)

  const modifyProduct = await Product.findById(req.params.id);
  console.log('modify answer:'+modifyProduct.name)
  if (modifyProduct) { 
    // console.log('找到了')
    modifyProduct.answer = req.body.answer
    modifyProduct.save()
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
})

router.get('/IBMprocess/:id', async (req, res) => {
   console.log('IBM检测的任务是'+req.params.id)
  const modifyProduct = await Product.findById(req.params.id);
  console.log('IBM任务名： '+modifyProduct.name)
  if (modifyProduct) { 
    console.log('找到了')
    const fs = require('fs');
    const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
    const { IamAuthenticator } = require('ibm-watson/auth');
    const visualRecognition = new VisualRecognitionV3({
    version: '2018-03-19',
    authenticator: new IamAuthenticator({
    apikey: 'eZQGsxTNsklvBK8_jRD7efK740FwXr8FchPLEx8RTSbQ',
    }),
    url: 'https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/e0a692bd-70f1-4809-baf1-213be9e9a8c2',
    });

  const classifyParams = {
    url: modifyProduct.image,
  };

  visualRecognition.classify(classifyParams)
    .then(response => {
     const classifiedImages = response.result;
     
    
      var finalRes = JSON.stringify(classifiedImages, null, 2)
      console.log('后端分析结果是：'+finalRes)
     modifyProduct.IBMprocess = finalRes
     modifyProduct.save()
     console.log(JSON.stringify(classifiedImages, null, 2));

      res.send(JSON.stringify(classifiedImages, null, 2));

   })
  .catch(err => {
    console.log('error:', err);
    res.send('Error in IBM process.');
  });
    // modifyProduct.answer = req.body.answer
  } else {
    res.send('没有找到');
    return;
  }
})


router.get('/audioText/:id', async (req, res) => {
  console.log('IBM检测的任务是'+req.params.id)
 const modifyProduct = await Product.findById(req.params.id);
 console.log('IBM任务名： '+modifyProduct.name)
 if (modifyProduct) { 
   console.log('找到了')
   var data = {
     audioText:modifyProduct.audioText,
     audioLink:modifyProduct.awsAudio
   }
   res.send(data)
   // modifyProduct.answer = req.body.answer
 } else {
   res.send('没有找到');
  
 }
})


router.post('/', isAuth, isAdmin, async (req, res) => {
  console.log(req.body);
  if(req.body.type=='imageTask')
  {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      user:req.body.user,
      expiryDate: req.body.expiryDate,
      type: req.body.type,
      allocate: req.body.allocate,
      proposition: req.body.proposition,
      question: req.body.question,
      needMaster: req.body.needMaster,
      answer:'',
      IBMprocess:'',
      
    });
    const newProduct = await product.save();
    if (newProduct) {
      return res
        .status(201)
        .send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
  }

  
  else{
    if(req.body.type=='choiceTask')
    {
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: "https://i.loli.net/2020/10/09/ehovWbFkIQBztHU.jpg",
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        user:req.body.user,
        expiryDate: req.body.expiryDate,
        type: req.body.type,
        allocate: req.body.allocate,
        proposition: req.body.proposition,
        question: req.body.question,
        needMaster: req.body.needMaster,
        answer:'',
        IBMprocess:''
      });
      const newProduct = await product.save();
      if (newProduct) {
        return res
          .status(201)
          .send({ message: 'New Product Created', data: newProduct });
      }
      return res.status(500).send({ message: ' Error in Creating Product.' });
    }
    else{

      
      if(req.body.type=='decisionTask')
      {
        const product = new Product({
          name: req.body.name,
          price: req.body.price,
          image: "https://i.loli.net/2020/10/09/Yu57mEcwrQ1PZbR.jpg",
          brand: req.body.brand,
          category: req.body.category,
          countInStock: req.body.countInStock,
          description: req.body.description,
          rating: req.body.rating,
          numReviews: req.body.numReviews,
          user:req.body.user,
          expiryDate: req.body.expiryDate,
          type: req.body.type,
          allocate: req.body.allocate,
          proposition: req.body.proposition,
          question: req.body.question,
          needMaster: req.body.needMaster,
          answer:'',
          IBMprocess:''
        });
        const newProduct = await product.save();
        if (newProduct) {
          return res
            .status(201)
            .send({ message: 'New Product Created', data: newProduct });
        }
        return res.status(500).send({ message: ' Error in Creating Product.' });
      }

      
      else{
        if(req.body.type=='audioTask')
        {
          const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: "https://i.loli.net/2020/10/09/x3PHRn7yIwLgDWd.jpg",
            brand: req.body.brand,
            category: req.body.category,
            countInStock: req.body.countInStock,
            description: req.body.description,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            user:req.body.user,
            expiryDate: req.body.expiryDate,
            type: req.body.type,
            allocate: req.body.allocate,
            proposition: req.body.proposition,
            question: req.body.question,
            needMaster: req.body.needMaster,
            answer:'',
            IBMprocess:'',
            audio:req.body.audio,
            audioText: req.body.audioText,
            awsAudio: req.body.awsAudio
          });
          const newProduct = await product.save();
          if (newProduct) {
            return res
              .status(201)
              .send({ message: 'New Product Created', data: newProduct });
          }
          return res.status(500).send({ message: ' Error in Creating Product.' });
        }

        
        else{
          const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: "https://i.loli.net/2020/10/09/X3zosU8A7gD4r1m.jpg",
            brand: req.body.brand,
            category: req.body.category,
            countInStock: req.body.countInStock,
            description: req.body.description,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            user:req.body.user,
            expiryDate: req.body.expiryDate,
            type: req.body.type,
            allocate: req.body.allocate,
            proposition: req.body.proposition,
            question: req.body.question,
            needMaster: req.body.needMaster,
            answer:'',
            IBMprocess:''
          });
          const newProduct = await product.save();
          if (newProduct) {
            return res
              .status(201)
              .send({ message: 'New Product Created', data: newProduct });
          }
          return res.status(500).send({ message: ' Error in Creating Product.' });
        }
      
      }
      
    }


   

}
  // const product = new Product({
  //   name: req.body.name,
  //   price: req.body.price,
  //   image: req.body.image,
  //   brand: req.body.brand,
  //   category: req.body.category,
  //   countInStock: req.body.countInStock,
  //   description: req.body.description,
  //   rating: req.body.rating,
  //   numReviews: req.body.numReviews,
  //   user:req.body.user,
  //   expiryDate: req.body.expiryDate,
  //   type: req.body.type,
  //   allocate: req.body.allocate,
  //   proposition: req.body.proposition,
  //   question: req.body.question,
  //   needMaster: req.body.needMaster
  // });
  //  const newProduct = await product.save();
  // if (newProduct) {
  //   return res
  //     .status(201)
  //     .send({ message: 'New Product Created', data: newProduct });
  // }
  // return res.status(500).send({ message: ' Error in Creating Product.' });
});

export default router;
