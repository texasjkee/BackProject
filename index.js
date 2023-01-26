import express from 'express';
import mongoose from 'mongoose';

import { registerValidatior } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js'
import User from './models/User.js';

const app = express();

const URL = 'mongodb+srv://texas:Mongodb333@cluster0.fjujydy.mongodb.net/BackProject?retryWrites=true&w=majority';
const PORT = 3000;

mongoose
  .connect(URL)
  .then(() => {
    console.log('DB ok')
  })
  .catch((err) => console.log('DB error', err));

app.use(express.json())

app.listen(PORT, (err) => {
  if(!err) {
    return  console.log('Server OK!!!')
  } else console.log(err)
})

app.post('/auth/login', UserController.login); 
app.post('/auth/register', registerValidatior, UserController.register); 
app.get('/auth/me', checkAuth, UserController.getMe); 
