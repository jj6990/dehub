const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authU = require('../../middleware/authU');
const { check, validationResult } = require('express-validator');

const User = require('../../models/user/User');

//////////////Admins///////////////////
//@ruta 				POST api/users
//@descripcion 			Registro users
//@acces 				privado

router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exist' });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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

//@ruta 				GET api/user
//@descripcion 			User obtiene todos los usuarios
//@acces 				publico

router.get('/', authU, async (req, res) => {
  try {
    const users = await User.find({ user: req.user }).sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@ruta 				PUT api/users/:id
//@descripcion 			update users
//@acces 				privado

router.put('/:id', authU, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const usersFields = {};

  if (name) usersFields.name = name;
  if (email) usersFields.email = email;
  if (phone) usersFields.phone = phone;
  if (type) usersFields.type = type;

  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ msg: 'Contact not found' });

    if (user.id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorize' });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: usersFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@ruta 				DELETE api/users/:id
//@descripcion 			delete users
//@acces 				privado

router.delete('/:id', authU, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(400).json({ msg: 'Contact not found' });

    if (user.id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorize' });
    }

    user = await User.findByIdAndRemove(req.params.id);

    res.json({ msg: 'contact deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
