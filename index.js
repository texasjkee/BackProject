import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const app = express();

const URL = 'mongodb+srv://texas:Mongodb333@cluster0.fjujydy.mongodb.net/BackProject?retryWrites=true&w=majority';
const PORT = 3000;

mongoose
  .connect(URL)
  .then(() => {
    console.log('DB ok')
  })
  .catch((err) => console.log('DB error', err));

app.use(express.json());

app.listen(PORT, (err) => {
  if(!err) {
    return  console.log('Server OK!!!')
  } else console.log(err)
})

app.get('/', (req, res) => {
  res.send('Hello TexasJkee!!!')
});

app.post('/auth/login', (req, res) => {
  console.log(req.body)

  const token = jwt.sign(
    {
    email: req.body.email,
    fullName: 'Michael Persikov',
    },
    'secret123',
  )

  res.json({
    success: true,
    token
  })
})
