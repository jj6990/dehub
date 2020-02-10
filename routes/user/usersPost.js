const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authU = require('../../middleware/authU');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const uploadsFolder = process.env.HOME + '/Desktop/Dehub/uploads/';

const Post = require('../../models/user/UserPost');
const User = require('../../models/user/User');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadsFolder);
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/', authU, (req, res, next) => {
  Post.find()
    .select('title description _id productImage user')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        posts: docs.map(doc => {
          return {
            user: req.user.id,
            title: doc.title,
            description: doc.description,
            productImage: doc.productImage,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:5000/feed/' + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', authU, upload.single('productImage'), (req, res, next) => {
  const { title, description, productImage } = req.body;

  const post = new Post({
    user: req.user.id,
    _id: new mongoose.Types.ObjectId(),
    title: title,
    description: description,
    productImage: req.file.filename
  });
  post
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Created post successfully',
        createdProduct: {
          title: result.title,
          description: result.description,
          _id: result._id,
          request: {
            type: 'GET',
            url: 'http://localhost:5000/posts/' + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:postId', (req, res, next) => {
  const id = req.params.postId;
  Post.findById(id)
    .select('title description _id productImage')
    .exec()
    .then(doc => {
      console.log('From database', doc);
      if (doc) {
        res.status(200).json({
          post: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:5000/feed'
          }
        });
      } else {
        res
          .status(404)
          .json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch('/:postId', (req, res, next) => {
  const id = req.params.postId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Post.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Post updated',
        request: {
          type: 'GET',
          url: 'http://localhost:5000/feed/' + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:postId', (req, res, next) => {
  const id = req.params.postId;
  Post.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Post deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:5000/feed',
          body: { title: 'String', description: 'Number' }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
