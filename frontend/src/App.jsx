import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import HomePage from './views/HomePage';
import Loginpage from './views/Auth/LoginPage';
import RegisterPage from './views/Auth/RegisterPage';
import AdminProtectRoute from './Guards/AdminProtectRoute';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/update-category/:id" element={<AdminProtectRoute />}>
          <HomePage />
        </Route>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/login" element={<Loginpage />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
