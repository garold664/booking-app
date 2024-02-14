const express = require('express');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/Users.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

const app = express();

// const bcryptSalt = bcrypt.genSalt(10);
const bcryptSalt = bcrypt.genSaltSync(10);

const jwtSecret = process.env.JWT_SECRET;

// booking wNk5sVAiUXlJIGUE

// 500 error
// in server terminal: TypeError: Cannot destructure property 'name' of req.body as it undefined
// because we need to parse json first from req.body
app.use(express.json()); // json parser

//! 1:39:30
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

//! 3:03:00 make /uploads folder available in browser!!

app.use('/uploads', express.static(__dirname + '/uploads'));

// await mongoose.connect(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    // res.json('found');
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // res.json('pass ok');
      //! sending cookie!
      //! npm i jsonwebtoken
      jwt.sign(
        // { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        // callback
        (err, token) => {
          if (err) throw err;
          // res.cookie('token', token).json('pass ok');

          res.cookie('token', token).json(userDoc);

          // res
          //   .cookie('token', token, { sameSite: none, secure: false })
          //   .json('pass ok');
        }
      );
    } else {
      res.json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      // const userDoc = await User.findById(userData.id);
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

// console.log(__dirname);

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;

  // npm i image-downloader

  const newName = 'photo' + Date.now() + '.jpg';

  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });

  res.json(newName);
});

// npm i multer

const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [...req.files].map((file) => {
    console.log(file);
    const { path, originalname } = file;
    const ext = originalname.split('.').at(-1);
    const newPath = path + '.' + ext;

    fs.renameSync(path, newPath);
    return newPath.replace('uploads\\', '').replace('uploads/', '');
  });
  res.json(uploadedFiles);
});

app.post('/places', async function (req, res) {
  const { token } = req.cookies;
  if (token) {
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      // const userDoc = await User.findById(userData.id);

      const placeDoc = await Place.create({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.json(placeDoc);
    });
  } else {
    res.json(null);
  }
});

// app.get('/places', async (req, res) => {
app.get('/user-places', async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  //! we don't need to check the owner, because all places information should be available publicly
  // res.json(await Place.findById(id));
  const data = await Place.findById(id);
  // console.log('data: ', data);
  res.json(data);
});

app.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  console.log(req.body);
  // console.log(photos);
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return;
    const placeDoc = await Place.findById(id);
    // console.log(userData.id, placeDoc.owner);
    if (userData.id === placeDoc.owner.toString()) {
      // https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.set()
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save(); // https://mongoosejs.com/docs/documents.html#documents-vs-models
      res.json('ok');
    }
  });
});

app.get('/places', async (req, res) => {
  res.json(await Place.find());
});

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    }
  });
}

app.post('/bookings', async (req, res) => {
  const { place, checkIn, checkOut, maxGuests, name, phone, price } = req.body;
  const userData = await getUserDataFromReq(req);
  let doc;
  try {
    doc = await Booking.create({
      place,
      checkIn,
      checkOut,
      maxGuests,
      name,
      phone,
      price,
      user: userData.id,
    });
  } catch (error) {
    if (err) console.error(error.Message);
  }
  res.json(doc);
});

app.get('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Booking.findById(id));
});

app.get('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  // https://mongoosejs.com/docs/populate.html
  res.json(await Booking.find({ user: userData.id }).populate('place'));
});

app.listen(4000);
