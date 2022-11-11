const express = require('express');

const {
  registerUser,
  loginUser,
  getAllUser,
  deleteUser,
  findOneByIdDetails,
  userProfile,
  updateUser,
  updateUserPassword,
  followingUser,
  unfollowUser,
  blockUserById,
  unBlockUser,
  generateVerificationToken,
  accountVerification,
  forgetPasswordToken,
  passwordReset,
  profilePhotoUpload,
} = require('../controllers/controllers.users');
const { photoUpload, profilePhotoResize } = require('../utils/utils.upload');
const authMiddleware = require('../middleware/authMiddleware');

const usersRoutes = express.Router();

usersRoutes.post('/register', registerUser);
usersRoutes.post('/login', loginUser);
usersRoutes.put(
  '/profilephoto-upload',
  authMiddleware,
  photoUpload.single('image'),
  profilePhotoResize,
  profilePhotoUpload
);
usersRoutes.get('/', authMiddleware, getAllUser);

usersRoutes.post('/forget-password-token', forgetPasswordToken);
usersRoutes.put('/reset-password', passwordReset);
usersRoutes.put('/password', authMiddleware, updateUserPassword);
usersRoutes.put('/follow', authMiddleware, followingUser);
usersRoutes.post(
  '/generate-verify-email-token',
  authMiddleware,
  generateVerificationToken
);

usersRoutes.put('/verify-account', authMiddleware, accountVerification);
usersRoutes.put('/unfollow', authMiddleware, unfollowUser);
usersRoutes.put('/block-user/:id', authMiddleware, blockUserById);
usersRoutes.put('/unblock-user/:id', authMiddleware, unBlockUser);
usersRoutes.get('/profile/:id', authMiddleware, userProfile);
usersRoutes.put('/', authMiddleware, updateUser);
usersRoutes.delete('/:id', deleteUser);
usersRoutes.get('/:id', findOneByIdDetails);

module.exports = usersRoutes;
