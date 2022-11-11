const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./utils/utils.database');

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

dbConnect();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

require('./router/index')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is Running ${PORT}`));
