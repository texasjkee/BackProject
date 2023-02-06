import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { registerValidatior } from './validations/auth.js';
import { postCreateValidation } from './validations/post.js';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
//import User from './models/User.js';

const app = express();

const URL = 'mongodb+srv://texas:Mongodb333@cluster0.fjujydy.mongodb.net/BackProject?retryWrites=true&w=majority';
const PORT = 4444;

mongoose
  .connect(URL)
  .then(() => {
    console.log('DB ok')
  })
  .catch((err) => console.log('DB error', err));

app.use(express.json())
app.use(cors())
app.listen(PORT, (err) => {
  if(!err) {
    return  console.log('Server OK!!!')
  } else console.log(err)
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  }, 
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }, 
});

const upload = multer({storage})

app.post('/auth/login', UserController.login); 
app.post('/auth/register', registerValidatior, UserController.register); 
app.get('/auth/me', checkAuth, UserController.getMe); 

app.get('/posts', PostController.getAll); 
app.get('/post/:id', PostController.getOne); 
app.delete('/post/:id', PostController.remove); 
app.patch('/post/:id', PostController.update); 

app.post('/posts', checkAuth, postCreateValidation, PostController.create); 

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`
  })
})