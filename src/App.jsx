import AuthProvider from "./contexts/AuthContext";
import Signup from "./components/Signup";

function App() {
  return (
    <AuthProvider>
      <Signup />
    </AuthProvider>
  );
}

export default App;
