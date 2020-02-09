const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/authA');
const { check, validationResult } = require('express-validator');

const Admin = require('../../models/admin/Admin');
const User = require('../../models/user/User');

//////////////Admins///////////////////
//@ruta 				POST api/users
//@descripcion 			Registro admins
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
      let admin = await Admin.findOne({ email });

      if (admin) {
        return res.status(400).json({ msg: 'Admin already exist' });
      }

      admin = new Admin({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      const payload = {
        admin: {
          id: admin.id
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

//@ruta 				GET api/admins
//@descripcion 			Admin obtiene todos los usuarios
//@acces 				publico

router.get('/', auth, async (req, res) => {
  try {
    const admins = await Admin.find({ admin: req.admins }).sort({
      date: -1
    });
    res.json(admins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@ruta 				PUT api/admins/:id
//@descripcion 			update admins
//@acces 				privado

router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const adminsFields = {};

  if (name) adminsFields.name = name;
  if (email) adminsFields.email = email;
  if (phone) adminsFields.phone = phone;
  if (type) adminsFields.type = type;

  try {
    let admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(400).json({ msg: 'Contact not found' });

    if (admin.id.toString() !== req.admin.id) {
      return res.status(401).json({ msg: 'Not authorize' });
    }

    admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: adminsFields },
      { new: true }
    );

    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@ruta 				DELETE api/admins/:id
//@descripcion 			delete admins
//@acces 				privado

router.delete('/:id', auth, async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);

    if (!admin) return res.status(400).json({ msg: 'Contact not found' });

    if (admin.id.toString() !== req.admin.id) {
      return res.status(401).json({ msg: 'Not authorize' });
    }

    admin = await Admin.findByIdAndRemove(req.params.id);

    res.json({ msg: 'contact deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
