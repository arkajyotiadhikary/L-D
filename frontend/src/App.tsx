import Router from "./router/Router.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

function App() {
      return (
            <AuthProvider>
                  <Router />
            </AuthProvider>
      );
}

export default App;
