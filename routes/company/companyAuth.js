const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authC = require('../../middleware/authC');
const { check, validationResult } = require('express-validator');

const Comp = require('../../models/company/Company');

//////////////Comp///////////////////
//@ruta 				GET api/auth
//@descripcion 			get logged in
//@acces 				privado

router.get('/', authC, async (req, res) => {
  console.log(req.comp);

  try {
    const comp = await Comp.findById(req.comp.id);

    res.json(comp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@ruta 				POST api/auth
//@descripcion 			Auth comp & get token
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
      let comp = await Comp.findOne({ email });
      if (!comp) {
        return res.status(400).json({ msg: 'Invalid comp' });
      }
      const isMatch = await bcrypt.compare(password, comp.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Password' });
      }

      const payload = {
        comp: {
          id: comp.id
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
