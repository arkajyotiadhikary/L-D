import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';

import Home from '../pages/Home.tsx';


const Router = () => {
  return (
    <Router>
      <Navbar isSignedIn={false} />
      <Route path="/" element={<Home />}
      <Route path="/auth" element={}
    </Router>
  )
}

export default Router;
