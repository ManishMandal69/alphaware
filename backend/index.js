const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/user'));
app.use('/api/jobs', require('./routes/job'));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
