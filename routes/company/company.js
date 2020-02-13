const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authC = require('../../middleware/authC');
const { check, validationResult } = require('express-validator');

const Comp = require('../../models/company/Company');

//////////////Admins///////////////////
//@ruta 				POST api/company
//@descripcion 			Registro Company
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
      let comp = await Comp.findOne({ email });

      if (comp) {
        return res.status(400).json({ msg: 'Admin already exist' });
      }

      comp = new Comp({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      comp.password = await bcrypt.hash(password, salt);

      await comp.save();

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

//@ruta 				GET api/admins
//@descripcion 			Admin obtiene todos los usuarios
//@acces 				publico

router.get('/', authC, async (req, res) => {
  try {
    const comps = await Comp.find({ user: req.comp }).sort({ date: -1 });
    res.json(comps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@ruta 				PUT api/admins/:id
//@descripcion 			update admins
//@acces 				privado

router.put('/:id', authC, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const compsFields = {};

  if (name) compsFields.name = name;
  if (email) compsFields.email = email;
  if (phone) compsFields.phone = phone;
  if (type) compsFields.type = type;

  try {
    let comp = await Comp.findById(req.params.id);
    if (!comp) return res.status(400).json({ msg: 'Contact not found' });

    if (comp.id.toString() !== req.comp.id) {
      return res.status(401).json({ msg: 'Not authorize' });
    }

    comp = await Comp.findByIdAndUpdate(
      req.params.id,
      { $set: compsFields },
      { new: true }
    );

    res.json(comp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@ruta 				DELETE api/admins/:id
//@descripcion 			delete admins
//@acces 				privado

router.delete('/:id', authC, async (req, res) => {
  try {
    let comp = await Comp.findById(req.params.id);

    if (!comp) return res.status(400).json({ msg: 'Contact not found' });

    if (comp.id.toString() !== req.comp.id) {
      return res.status(401).json({ msg: 'Not authorize' });
    }

    comp = await Comp.findByIdAndRemove(req.params.id);

    res.json({ msg: 'contact deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
