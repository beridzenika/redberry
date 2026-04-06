
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./pages/Dashboard";

import './styles/App.css';

import { useState } from 'react';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  const handleLoginSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    
    setShowLogin(false);
    setShowSignin(false);
  };

  return (
    <div className="App">
      <Header 
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onSigninClick={() => setShowSignin(true)}
      />
      {showLogin && (
        <Login
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
          onSigninClick={() => setShowSignin(true)}
        />
      )}
      {showSignin && (
        <Registration
          onSuccess={handleLoginSuccess}
          onClose={() => setShowSignin(false)}
          onLoginClick={() => setShowLogin(true)}
        />
      )}

      <Dashboard/>
      <Footer/>
    </div>
  );
}

export default App;
