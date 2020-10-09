import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
   MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://Chase:yinxiaofeng0206@sit313.e6wwd.mongodb.net/Finalprojectlol?retryWrites=true&w=majority',
   //MONGODB_URL:'mongodb://localhost/amazona',
  
  
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'AZMrKPBVTHho6OsPMVIejJjXNrduzHkxvw5LmFiWNIdASlh4HWl-dduh59qCy6pfAjlzx1sqYpxmP1VN',
  accessKeyId: process.env.accessKeyId || 'AKIAJVX5QGMAFM5VMFHA',
  secretAccessKey: process.env.secretAccessKey || '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',
};
