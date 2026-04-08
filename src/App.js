
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Registration from "./components/Registration";

import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import Browse from "./pages/Browse";

import './styles/App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from 'react';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    if (showLogin || showSignin || showProfile) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    return () => {
        document.body.style.overflow = '';
    };
  }, [showLogin, showSignin, showProfile]);

  const handleLoginSuccess = (userData, userToken) => {
    if (userData) setUser(userData);
    if (userToken) setToken(userToken);
    
    setShowLogin(false);
    setShowSignin(false);
    setShowProfile(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header 
          user={user}
          onLoginClick={() => setShowLogin(true)}
          onSigninClick={() => setShowSignin(true)}
          onProfileClick={() => setShowProfile(true)}
        />
        {showProfile && (
          <Profile
            user={user}
            token={token}
            onSuccess={handleLoginSuccess}
            onClose={() => setShowProfile(false)}
          />
        )}
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
          <Switch>
            <Route exact path="/">
              <Dashboard 
                user={user} 
                token={token} 
                onLoginClick={() => setShowLogin(true)}
              />
            </Route>
            <Route path="/Browse">
              <Browse/>
            </Route>
            <Route path="/course/:id">
              <CoursePage/>
            </Route>
          </Switch>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
