import Home from './pages/Home.tsx';
import Navbar from './components//Navbar.tsx';

import { ChakraProvider } from '@chakra-ui/react';


function App() {

  return (
    <>
      <Navbar isSignedIn={false} />
      <Home />
    </>
  )
}

export default App
