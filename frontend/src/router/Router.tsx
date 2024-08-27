import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';

import Home from '../pages/Home.tsx';
import Auth from '../pages/Auth.tsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar isSignedIn={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Router;
