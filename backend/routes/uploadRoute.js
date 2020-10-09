import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config';
import Product from '../models/productModel';


var s3Location


const fs = require('fs');
  const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
  const { IamAuthenticator } = require('ibm-watson/auth');
  
  const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
      apikey: 'pJXUFZZNTXnHrUgs0TWCmcLXu7pq8tS9jz1cx33EdCLY',
    }),
    serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/1d77c7e9-b6eb-4387-afc2-49963a176735',
  });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.mp3`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('audio'), (req, res) => {
  const recognizeParams = {
    audio: fs.createReadStream(req.file.path),
    contentType: 'audio/mp3',
    wordAlternativesThreshold: 0.9,
    model: 'en-US_BroadbandModel',  
    keywords: ['colorado', 'tornado', 'tornadoes'],
    keywordsThreshold: 0.5,
  }; 
  speechToText.recognize(recognizeParams)
    .then(speechRecognitionResults => {
      var audioText = new Array()
      var content = JSON.stringify(speechRecognitionResults, null, 2)
      //console.log(content); 
      //console.log(speechRecognitionResults.result.results[0].alternatives[0].transcript);
      for(var i=0; i < speechRecognitionResults.result.results[0].word_alternatives.length; i++)
      {
        audioText.push(speechRecognitionResults.result.results[0].word_alternatives[i].alternatives[0].word)
        audioText.push(speechRecognitionResults.result.results[0].word_alternatives[i].alternatives[0].confidence)
      }
      console.log('数组：'+audioText);
      var data = {
        path:`/${req.file.path}`,
        text: audioText
      }
      // res.send(`/${req.file.path}`);
      res.send(data);
    })
    .catch(err => {
      console.log('error:', err);
    });
});

aws.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});
const s3 = new aws.S3();
const storageS3 = multerS3({
  s3, 
  bucket: 'xiaofeng313',
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadS3 = multer({ storage: storageS3 });

router.post('/s3', uploadS3.single('image'), (req, res) => {
  s3Location = req.file.location
  // console.log('location：'+JSON.stringify(req.file))
  res.send(req.file.location);
});

router.post('/s3Audio', uploadS3.single('audio'), (req, res) => {
  s3Location = req.file.location
  console.log('location是：'+JSON.stringify(req.file))
  res.send(req.file.location);
});






export default router;
