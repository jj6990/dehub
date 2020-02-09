const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authU = require('../../middleware/authU');
const { check, validationResult } = require('express-validator');

const User = require('../../models/user/User');

//////////////User///////////////////
//@ruta 				GET api/auth
//@descripcion 			get logged in
//@acces 				privado

router.get('/', authU, async (req, res) => {
  console.log(req.user);

  try {
    const user = await User.findById(req.user.id);

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@ruta 				POST api/auth
//@descripcion 			Auth user & get token
//@acces 				privado

router.post(
  '/',
  [
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid user' });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Password' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        { payload },
        config.get('jwtSecret'),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
