import {
  Booking as BookingType,
  PlaceType,
  type User as UserType,
} from './lib/types.js';

import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// require('dotenv').config();
import { default as mongoose } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
// import imageDownloader from 'image-downloader';
// import multer from 'multer';
// import fs from 'fs';

import User from './models/Users.js';
import Place from './models/Place.js';
import Booking from './models/Booking.js';

import uploadRoute from './routes/uploadRoute.js';
import uploadByLinkRoute from './routes/uploadByLinkRoute.js';
dotenv.config();

type UserData = {
  name: string;
  email: string;
  _id: string;
};

const app = express();

// const bcryptSalt = bcrypt.genSalt(10);
const bcryptSalt = bcrypt.genSaltSync(10);

const jwtSecret = process.env.JWT_SECRET as Secret;

// booking wNk5sVAiUXlJIGUE

// 500 error
// in server terminal: TypeError: Cannot destructure property 'name' of req.body as it undefined
// because we need to parse json first from req.body
app.use(express.json()); // json parser

app.use(cookieParser());

// const origin = 'http://localhost:5173';

// const origin = 'https://booking-app-front-1v42.onrender.com';

const origin = process.env.ORIGIN;
// console.log(origin);

app.use(
  cors({
    credentials: true,
    origin,
  })
);
import { fileURLToPath } from 'url';
import { resolve } from 'path';

const __dirname = resolve(fileURLToPath(import.meta.url), '../..');
app.use('/uploads', express.static(__dirname + '/uploads'));

// await mongoose.connect(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL as string);

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
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;

          res
            .cookie('token', token, {
              httpOnly: true,
              sameSite: 'none',
              secure: true,
              maxAge: 1000 * 60 * 60 * 24 * 365,
            })
            .json(userDoc);
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

  // console.log(req.cookies);
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = (await User.findById(
        (userData as UserType).id
      )) as UserData;
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

// app.post('/upload-by-link', async (req, res) => {
//   const { link } = req.body;

//   const newName = 'photo' + Date.now() + '.jpg';
//   try {
//     await imageDownloader.image({
//       url: link,
//       dest: __dirname + '/uploads/' + newName,
//     });
//     res.json(newName);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

// const photosMiddleware = multer({ dest: 'uploads/' });

app.use(uploadByLinkRoute);
app.use(uploadRoute);

// app.post('/upload', multerMiddleware.array('photos', 100), (req, res) => {
//   if (!Array.isArray(req.files)) return;
//   const uploadedFiles = [...req.files].map((file) => {
//     // console.log(file);
//     const { path, originalname } = file;
//     const ext = originalname.split('.').at(-1);
//     const newPath = path + '.' + ext;

//     fs.renameSync(path, newPath);
//     return newPath.replace('uploads\\', '').replace('uploads/', '');
//   });
//   res.json(uploadedFiles);
// });

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

      if (userData) {
        const placeDoc = await Place.create({
          owner: (userData as UserType).id,
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
      }
    });
  } else {
    res.json(null);
  }
});

app.get('/user-places', async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    if (!userData) return res.json({});
    const { id } = userData as UserType;
    res.json(await Place.find({ owner: id }));
  });
});

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;

  const data = await Place.findById(id);
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
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return;
    const placeDoc = await Place.findById(id);
    if ((userData as UserType).id === placeDoc?.owner?.toString()) {
      placeDoc?.set({
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
      await placeDoc?.save();
      res.json('ok');
    }
  });
});

app.get('/places', async (req, res) => {
  res.json(await Place.find());
});

function getUserDataFromReq(req: Request): Promise<UserType> {
  return new Promise((resolve, reject) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err: Error | null, userData) => {
        if (err) throw err;
        resolve(userData as UserType);
      });
    }
  });
}

app.post('/bookings', async (req, res) => {
  const { place, checkIn, checkOut, maxGuests, name, phone, price } = req.body;
  const userData: UserType = await getUserDataFromReq(req);
  let doc = null;
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
  } catch (error: any | { message: string }) {
    if (error) console.error(error.message);
  }
  res.json(doc);
});

app.get('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Booking.findById(id));
});

app.get('/bookings', async (req, res) => {
  const userData: UserType = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate('place'));
});

app.listen(4000);
