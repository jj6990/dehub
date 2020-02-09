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
app.use('/api/admin', require('./routes/admin/admins'));
app.use('/api/adminAuth', require('./routes/admin/adminAuth'));

//Rutas users
app.use('/api/user', require('./routes/user/users'));
app.use('/api/userAuth', require('./routes/user/usersAuth'));

//Rutas enterprise
app.use('/api/comp', require('./routes/company/company'));
app.use('/api/compAuth', require('./routes/company/companyAuth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server starter on ${PORT}`));
