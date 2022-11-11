const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose
      .connect(`${process.env.MONGO_URL}`)
      .then(() => console.log('Database connected'));
  } catch (err) {
    console.log('Database connection failed', err.message);
  }
};

module.exports = dbConnect;
