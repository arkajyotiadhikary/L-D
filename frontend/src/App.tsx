import Router from './router/Router.tsx';
import { ChakraProvider } from '@chakra-ui/react';


function App() {

  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  )
}

export default App
