const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

//connect db
connectDB();

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ message: 'Dehub' }));

//definir rutas
//Rutas admin
app.use('/api/admin', require('./routes/admin/admins'));
app.use('/api/adminAuth', require('./routes/admin/adminAuth'));

//Rutas users
app.use('/api/user', require('./routes/user/users'));
app.use('/api/userAuth', require('./routes/user/usersAuth'));
app.use('/api/feed', require('./routes/user/usersPost'));

//Rutas enterprise
app.use('/api/comp', require('./routes/company/company'));
app.use('/api/compAuth', require('./routes/company/companyAuth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server starter on ${PORT}`));
