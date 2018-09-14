require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const axios = require('axios');
const aws = require('aws-sdk');
const router = express.Router();
const nodemailer = require('nodemailer');
const creds = require('./creds');

const socket = require('socket.io');
const SocketManager = require('./SocketManager');

const usersCtrl = require('./users-controller');
const leaksCtrl = require('./leaks-controller');
const docsCtrl = require('./documents-controller');
const stripCtrl = require('./stripe-controller');

const app = express();

app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.static(`${__dirname}/../build`));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', function(req, res) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
  });

  let title = req.body.title;
  let email = req.body.email;
  let description = req.body.description;
  let content = `From: ${email} <br/> Title: ${title} <br/> Message: ${description}`;

  let mailOptions = {
    from: req.body.email, // sender address
    to: 'hunterluker33@gmail.com', // list of receivers
    subject: 'DOM Leaks Submit Form', // Subject line
    html: `<h2 style="background: #0e0520; color: white; padding: 10px; border: 3px solid #45336b; text-align: center">${content}</h2>` // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log('Message %s sent: %s', info.messageId, info.response);
    res.redirect(process.env.SUCCESS);
  });
});

const {
  SERVER_PORT,
  CONNECTION_STRING,
  SECRET,
  REACT_APP_CLIENT_ID,
  CLIENT_SECRET,
  REACT_APP_DOMAIN,
  NODE_ENV,
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  STRIPE_SECRET
} = process.env;

// AWS UPLOADER
app.get('/sign-s3', (req, res) => {
  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  };

  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData);
  });
});

// MIDDLEWARE
app.use(bodyParser.json());
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
  })
);

// DATABASE
massive(CONNECTION_STRING)
  .then(db => {
    app.set('db', db);
    console.log(`Connected to database`);
  })
  .catch(err => console.log(errr));

// endpoints
app.get(`/auth/callback`, async (req, res) => {
  // use code from query in payload for token
  const payload = {
    client_id: REACT_APP_CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code,
    grant_type: 'authorization_code',
    redirect_uri: `${process.env.PROTOCOL}://${req.headers.host}/auth/callback`
  };

  // trade code for token
  let resWithToken = await axios.post(
    `https://${REACT_APP_DOMAIN}/oauth/token`,
    payload
  );

  // use token to get user data
  let resWithUserData = await axios.get(
    `https://${REACT_APP_DOMAIN}/userinfo?access_token=${
      resWithToken.data.access_token
    }`
  );
  // console.log('user data', resWithUserData.data);

  let { email, name, picture, sub } = resWithUserData.data;

  const db = req.app.get('db');
  let foundUser = await db.find_user([sub]);

  if (foundUser[0]) {
    req.session.user = foundUser[0];

    if (foundUser[0].email === 'hunterluker33@gmail.com') {
      res.redirect('/#/admin');
    }

    res.redirect('/');
  } else {
    let createdUser = await db.create_user([name, email, picture, sub]);
    req.session.user = createdUser[0];

    res.redirect('/');
  }
});

function envCheck(req, res, next) {
  if (NODE_ENV === 'dev') {
    req.app
      .get('db')
      .get_user_by_id([2])
      .then(userWithIdOne => {
        req.session.user = userWithIdOne[0];
        next();
      });
  } else {
    next();
  }
}

app.get(`/api/user-data`, envCheck, (req, res) => {
  if (req.session.user) {
    res.status(200).send(req.session.user);
  } else {
    res.status(401).send('NOOOO!!');
  }
});

app.get('/auth/logout', (req, res) => {
  req.session.destroy();

  res.redirect(process.env.MY_HOME);
  //res.send();
});

app.delete('/api/user-data/:id', (req, res) => {
  const db = req.app.get('db');
  const { id } = req.params;

  db.delete_user([id]).then(resp => {
    res.status(200).send(resp);
  });
});

// USERS ENPOINTS
app.get('/api/users', usersCtrl.getAllUsers);

app.get('/api/user/:id', usersCtrl.getUser);

// LEAKS ENDPOINTS
app.get('/api/leaks', leaksCtrl.getLeaks);

app.get('/api/leaks/:id', leaksCtrl.getLeak);

app.post('/api/leaks', leaksCtrl.addLeak);

app.delete('/api/leaks/:id', leaksCtrl.deleteLeak);

app.put('/api/leaks/:id', leaksCtrl.updateLeak);

// DOCUMENTS ENDPOINTS
// app.get('/api/docs', docsCtrl.getAllDocs);

app.get('/api/docs', docsCtrl.getDocsAndLeaks);

app.delete('/api/docs/:id', docsCtrl.deleteDoc);

// STRIPE
app.post('/api/payment', stripCtrl.handlePayment);

module.exports = io = socket(
  app.listen(SERVER_PORT, () =>
    console.log(`Listening on port: ${SERVER_PORT}`)
  )
);

io.on('connection', SocketManager);
