import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './assets/components/layout/navbar/Navbar';
import Center from './assets/components/layout/center/Center';
import Register from './assets/components/auth/register/Register';
import SignIn from './assets/components/auth/signin/SignIn';
import Carousel from './assets/components/carousel/Carousel';
import Footer from './assets/components/layout/footer/Footer';
import AddBoardWizard from './assets/components/boards/AddBoardWizard'; 
import { useUser } from './context/UserContext';
import axios from './utils/axiosInstance';
import MyBoards from './assets/components/boards/MyBoards';
import PushBoardsToDB from './assets/components/boards/PushBrandsToDB';
import Forecast from './assets/components/forecast/Forecast';
import Profile from './assets/components/profile/Profile';
import Match from './assets/components/match/Match';
import Resume from './assets/components/resume/Resume';

function App() {
  const { setUser } = useUser();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get('/auth/me');
        setUser(res.data.user);
        console.log("first")
      } catch {
        try {
          await axios.get('/auth/refresh');
          const res = await axios.get('/auth/me');
          console.log(res.data)
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
        <Route path="/add-board" element={<AddBoardWizard />} /> 
        <Route path='/myboards' element={<MyBoards/>}/>
        <Route path='/forecast' element={<Forecast/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/match' element={<Match/>}/>
        <Route path='/resume' element={<Resume/>}/>
        <Route path='/pushdb' element={<PushBoardsToDB/>}/>
        

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
