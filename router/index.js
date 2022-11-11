const userRoute = require('./route.users');
const postRoute = require('./route.posts');
const categoryRoute = require('./route.categories');
const emailRoute = require('./route.sendEmail');
const commentRoute = require('./route.comment');

module.exports = (app) => {
  app.use('/api/users', userRoute);
  app.use('/api/posts', postRoute);
  app.use('/api/comments', commentRoute);
  app.use('/api/email', emailRoute);
  app.use('/api/category', categoryRoute);
};
