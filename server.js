const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRoute = require('./routes/admin/index.route');
const userRoute = require('./routes/users/index.route');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MUT_LMS')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(cors());
app.use(bodyParser.json());

// Admin route setup
adminRoute(app);
userRoute(app);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
