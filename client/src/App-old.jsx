import { Routes, Route } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './Layout';

import axios from 'axios';
import { UserContextProvider } from './UserContext';
import { useEffect } from 'react';
import AccountPage from './pages/AccountPage';

axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/account" element={<AccountPage />} />
          <Route path="/account/bookings" element={<AccountPage />} />
        <Route path="/account/places" element={<AccountPage />} /> */}
          {/* 1:57 */}
          {/* <Route path="/account/:subpage" element={<AccountPage />} /> */}
          {/* //% 1:58:20 we need to make param optional!!! */}
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage/:action" element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
