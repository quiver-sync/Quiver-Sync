// App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './assets/components/navbar/Navbar';
import Center from './assets/components/center/Center';
import Register from './assets/components/register/Register';
import SignIn from './assets/components/signin/SignIn';
import Carousel from './assets/components/carousel/Carousel';
import Footer from './assets/components/footer/Footer';
import { useUser } from './context/UserContext';
import axios from './utils/axiosInstance'; // ✅ use central instance

function App() {
  const { setUser } = useUser();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get('/auth/me');
        setUser(res.data.user);
      } catch {
        try {
          await axios.get('/auth/refresh'); // refresh token
          const res = await axios.get('/auth/me'); // retry
          setUser(res.data.user);
        } catch {
          setUser(null);
        }
      }
    };

    checkSession();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Center Carousel={<Carousel />} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
