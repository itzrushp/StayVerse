// aO30yaXVu3SwpUzl


require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const imageDownloader = require('image-downloader');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
mongoose.set('strictQuery', true);


app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(cookieParser());

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';


mongoose.connect(process.env.MONGO_URL)
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userDoc = await User.create({
            name: name,
            email: email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
})

app.post('/login', async (req, res) => {
    console.log("Login Route was hit");
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
        return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords asynchronously
    const passOk = await bcrypt.compare(password, userDoc.password);

    if (!passOk) {
        return res.status(422).json({ error: "Incorrect password" });
    }

    // Generate JWT token
    jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
            if (err) {
                console.error("JWT Error:", err);
                return res.status(500).json({ error: "JWT Token Generation Failed" });
            }

            // console.log("Generated Token:", token);

            res.cookie('token', token, {
                httpOnly: true,
                secure: false, // Set `true` if using HTTPS 
                sameSite: 'Lax'
            }).json(userDoc);
        }
    );
});


app.get('/profile', (req, res) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;

            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('token', '').json(true);
});

console.log(__dirname);

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;

    if (!link) {
        return res.status(400).json({ error: "No link provided" });
    }

    const newName = Date.now() + '.jpg';

    try {
        await imageDownloader.image({
            url: link,  // Ensure this is received properly
            dest: __dirname + '/uploads/' + newName,
        });

        res.json({ path: `/uploads/${newName}` });
    } catch (error) {
        console.error("Image download failed:", error);
        res.status(500).json({ error: "Image download failed" });
    }
});



const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }

    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const {
      title, address, addedPhotos, description,
      perks, extraInfo, checkIn, checkOut, maxGuests,price,
    } = req.body;
  
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
  
      try {
        // Ensure photos is an array of strings
        let photosArray;
        if (typeof addedPhotos === "string") {
          photosArray = JSON.parse(addedPhotos).map(photo => photo.path);
        } else {
          photosArray = addedPhotos.map(photo => photo.path);
        }
  
        const placeDoc = await Place.create({
          owner: userData.id,
          title,
          address,
          photos: photosArray, // Pass the array of paths
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price
        });
  
        res.json(placeDoc);
      } catch (error) {
        console.error("Error saving place:", error);
        res.status(500).json({ error: "Error saving place" });
      }
    });
  });
  app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
      id, title, address, addedPhotos, description,
      perks, extraInfo, checkIn, checkOut, maxGuests, price,
    } = req.body;
  
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
  
      if (userData.id === placeDoc.owner.toString()) {
        // Ensure photos is an array of strings
        let photosArray;
        if (typeof addedPhotos === "string") {
          photosArray = JSON.parse(addedPhotos).map(photo => photo.path);
        } else {
          photosArray = addedPhotos.map(photo => photo.path);
        }
  
        placeDoc.set({
          title,
          address,
          photos: photosArray, // Pass the array of paths
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price
        });
  
        await placeDoc.save();
        res.json('ok');
      }
    });
  });


app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.get('/places' , async (req, res) =>{
    res.json( await Place.find());
})

app.listen(4000, () => console.log('Server ready'));