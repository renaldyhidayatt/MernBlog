import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import HomePage from './views/HomePage';
import Loginpage from './views/Auth/LoginPage';
import RegisterPage from './views/Auth/RegisterPage';
import AdminProtectRoute from './Guards/AdminProtectRoute';
import UpdateCategoryPage from './views/Category/UpdateCategory';
import ResetPasswordPage from './views/Password/PasswordReset';
import ResetPasswordTokenPage from './views/Password/PasswordResetToken';
import UploadProfilePhotoPage from './views/Profile/UploadProfilePhotoPage';
import UserListPage from './views/User/UsersList';
import UpdatePasswordPage from './views/Password/UpdatePassword';
import PrivateProctectRoute from './Guards/PrivateProtectRoute';
import AccountVerifiedPage from './views/Auth/AccountVerified';
import SendEmailPage from './views/User/SendEmailPage';
import UpdateProfilePage from './views/Profile/UpdateProfilePage';
import UpdatePostPage from './views/Posts/UpdatePost';
import ProfilePage from './views/Profile/ProfilePage';
import CreatePostPage from './views/Posts/CreatePost';
import UpdateCommentPage from './views/comments/UpdateComment';
import CreateCategoryPage from './views/Category/CreateCategory';
import PostListPage from './views/Posts/PostsList';
import PostDetailsPage from './views/Posts/PostDetails';
import CategoryListPage from './views/Category/CategoryList';
import PostsList from './views/Posts/PostsList';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route
          path="/update-category/:id"
          element={
            <AdminProtectRoute>
              <UpdateCategoryPage />
            </AdminProtectRoute>
          }
        />
        <Route path="/password-reset-token" element={<ResetPasswordPage />} />
        <Route
          path="/reset-password/:token"
          element={<ResetPasswordTokenPage />}
        />
        <Route
          path="/users"
          element={
            <AdminProtectRoute>
              <UserListPage />
            </AdminProtectRoute>
          }
        />
        <Route
          path="/upload-profile-photo"
          element={
            <PrivateProctectRoute>
              <UploadProfilePhotoPage />
            </PrivateProctectRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <PrivateProctectRoute>
              <UpdatePasswordPage />
            </PrivateProctectRoute>
          }
        />

        <Route
          path="/verify-account/:token"
          element={
            <PrivateProctectRoute>
              <AccountVerifiedPage />
            </PrivateProctectRoute>
          }
        />
        <Route
          path="/send-mail"
          element={
            <PrivateProctectRoute>
              <SendEmailPage />
            </PrivateProctectRoute>
          }
        />
        <Route
          path="/update-profile/:id"
          element={
            <PrivateProctectRoute>
              <UpdateProfilePage />
            </PrivateProctectRoute>
          }
        />
        <Route
          path="/update-post/:id"
          element={
            <PrivateProctectRoute>
              <UpdatePostPage />
            </PrivateProctectRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <PrivateProctectRoute>
              <ProfilePage />
            </PrivateProctectRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateProctectRoute>
              <CreatePostPage />
            </PrivateProctectRoute>
          }
        />
        <Route
          path="/update-comment/:id"
          element={
            <PrivateProctectRoute>
              <UpdateCommentPage />
            </PrivateProctectRoute>
          }
        />
        <Route
          path="/add-category"
          element={
            <AdminProtectRoute>
              <CreateCategoryPage />
            </AdminProtectRoute>
          }
        />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
        <Route
          path="/category-list"
          element={
            <AdminProtectRoute>
              <CategoryListPage />
            </AdminProtectRoute>
          }
        />

        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/login" element={<Loginpage />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
