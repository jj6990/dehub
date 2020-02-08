const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect db
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ message: 'Dehub' }));

//definir rutas
//Rutas admin
app.use('/api/admins', require('./routes/admins'));
app.use('/api/auth', require('./routes/auth'));

//Rutas user
app.use('/api/users', require('./routes/users'));
app.use('/api/authUsers', require('./routes/authUsers'));
app.use('/api/userPost', require('./routes/userPost'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server starter on ${PORT}`));
