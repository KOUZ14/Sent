const config = require('./config');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3 } = require('@aws-sdk/client-s3');
const { Readable } = require('stream');

const app = express();
const port = process.env.PORT || 3001;

// Configure AWS SDK v3
const s3 = new S3({
  region: 'us-west-1',
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  },
});

// Configure multer and upload to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'notenoughspace',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});


// Endpoint for file upload
app.post('/upload', upload.array('files', 10), (req, res) => {
  const fileUrls = req.files.map((file) => file.location);
  res.json({ fileUrls });
  console.log(`Success`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
