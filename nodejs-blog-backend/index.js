const express = require('express');

// Init config
const dotenv = require('dotenv');
dotenv.config();

// Database
const db = require('./models/index');

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error:' + err))

const app = express();

// CORS
const cors = require('cors');
app.use(cors());


// Body-parser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// Passport
require('./passport');

// Routes
const postsRoute = require('./routes/posts')
const userRoute = require('./routes/users')
app.use('/api/v1/posts', postsRoute);
app.use('/api/v1/users', userRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);