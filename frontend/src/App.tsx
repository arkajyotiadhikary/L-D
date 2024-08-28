import Router from './router/Router.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext.tsx';


function App() {

  return (
    <AuthProvider>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </AuthProvider>

  )
}

export default App
