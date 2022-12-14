const crypto = require('crypto');
const fs = require('fs');
const { createJwt } = require('../utils/utils.jwt');
const User = require('../models/User');
const validateMongodbId = require('../utils/utils.validateByid');
const cloudinaryUploadImg = require('../utils/utils.cloudinary');
const blockUser = require('../utils/utils.cloudinary');
const sendEmail = require('../utils/utils.emailSending');

const registerUser = async (req, res) => {
  const userExists = await User.findOne({ email: req?.body?.email });

  if (userExists) throw new Error('User already exists');
  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });

  if (userFound?.isBlocked)
    throw new Error('Access Denied You have been blocked');

  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: createJwt(userFound._id),
      isVerified: userFound?.isAccountVerified,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Login Credentials');
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).populate('posts');
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
};

const findOneByIdDetails = async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

const userProfile = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const loginUserId = req?.user?._id?.toString();
  console.log(typeof loginUserId);
  try {
    const myProfile = await User.findById(id)
      .populate('posts')
      .populate('viewedBy');
    const alreadyViewed = myProfile?.viewedBy?.find((user) => {
      console.log(user);
      return user?._id?.toString() === loginUserId;
    });
    if (alreadyViewed) {
      res.json(myProfile);
    } else {
      const profile = await User.findByIdAndUpdate(myProfile?._id, {
        $push: { viewedBy: loginUserId },
      });
      res.json(profile);
    }
  } catch (error) {
    res.json(error);
  }
};

const updateUser = async (req, res) => {
  const { _id } = req?.user;

  blockUser(req?.user);
  validateMongodbId(_id);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
};

const updateUserPassword = async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);

  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
};

const followingUser = async (req, res) => {
  const { followId } = req.body;
  const loginUserId = req.user.id;

  const targetUser = await User.findById(followId);

  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );

  if (alreadyFollowing) throw new Error('You have already followed this user');

  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  );
  res.json('You have successfully followed this user');
};

const unfollowUser = async (req, res) => {
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    { new: true }
  );

  res.json('You have successfully unfollowed this user');
};

const blockUserById = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );
  res.json(user);
};

const unBlockUser = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );
  res.json(user);
};

const generateVerificationToken = async (req, res) => {
  const loginUserId = req.user.id;
  const user = await User.findById(loginUserId);

  try {
    const verificationToken = await user?.createAccountVerificationToken();

    await user.save();

    const resetURL = `If you were requested to verify your account, verify now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/verify-account/${verificationToken}">Click to verify your account</a>`;

    const msg = {
      to: user?.email,
      from: 'dota@dota.com',
      subject: 'Verify your account',
      html: resetURL,
    };
    await sendEmail(msg.to, msg.subject, msg.html, msg.from);
    res.json(resetURL);
  } catch (error) {
    res.json(error);
  }
};

const accountVerification = async (req, res) => {
  const { token } = req.body;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpires: { $gt: new Date() },
  });
  if (!userFound) throw new Error('Token expired, try again later');

  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpires = undefined;

  await userFound.save();

  res.json(userFound);
};

const forgetPasswordToken = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error('User Not Found');

  try {
    const token = await user.createPasswordResetToken();

    await user.save();

    const resetURL = `If you were requested to reset your password, reset now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/reset-password/${token}">Click to Reset</a>`;

    const msg = {
      to: email,
      from: 'twentekghana@gmail.com',
      subject: 'Reset Password',
      html: resetURL,
    };

    await sendEmail(msg.to, msg.subject, msg.html, msg.from);
    res.json({
      msg: `A verification message is successfully sent to ${user?.email}. Reset now within 10 minutes, ${resetURL}`,
    });
  } catch (error) {
    res.json(error);
  }
};

const passwordReset = async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error('Token Expired, try again later');

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
};

const profilePhotoUpload = async (req, res) => {
  const { _id } = req.user;

  blockUser(req?.user);

  const localPath = `public/images/profile/${req.file.filename}`;

  const imgUploaded = await cloudinaryUploadImg(localPath);

  const foundUser = await User.findByIdAndUpdate(
    _id,
    {
      profilePhoto: imgUploaded?.url,
    },
    { new: true }
  );

  fs.unlinkSync(localPath);
  res.json(imgUploaded);
};

module.exports = {
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
};
