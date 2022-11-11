import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import HomePage from './views/HomePage';
import RegisterPage from './views/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
