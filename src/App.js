
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";

import './styles/App.css';

import { useState } from 'react';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  const handleLoginSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    
    setShowLogin(false);
  };
  
  return (
    <div className="App">
      <Header 
        isLoggedIn={false} 
        isActive={false}
        onLoginClick={() => setShowLogin(true)}
      />
      {showLogin && (
        <Login
          onSuccess={handleLoginSuccess}
        />
      )}

      <Dashboard/>
      <Footer/>
    </div>
  );
}

export default App;
