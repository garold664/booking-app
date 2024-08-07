import { Routes, Route } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './Layout';

import axios from 'axios';
import { UserContextProvider } from './contexts/UserContext';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacePage from './pages/PlacePage';
import PlacesFormPage from './pages/PlacesFormPage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
import GalleryContextProvider from './contexts/galleryContext';
import baseUrl from './lib/baseUrl';

axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;

function App() {
  return (
    <GalleryContextProvider>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/account/places" element={<PlacesPage />} />
            <Route path="/account/places/new" element={<PlacesFormPage />} />
            <Route path="/account/places/:id" element={<PlacesFormPage />} />
            <Route path="/account/bookings/" element={<BookingsPage />} />
            <Route path="/account/bookings/:id" element={<BookingPage />} />
            <Route path="/place/:id" element={<PlacePage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </GalleryContextProvider>
  );
}

export default App;
