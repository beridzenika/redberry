
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import Enrolled from "./components/Enrolled";

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
  const [showEnrolled, setShowEnrolled] = useState(false);
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  //if already logged in
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if(savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  },[]);

  // turning off scroll bar
  useEffect(() => {
    if (showLogin || showSignin || showProfile || showEnrolled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLogin, showSignin, showProfile, showEnrolled]);


  const handleSuccess = (userData, userToken) => {
    if (userData) setUser(userData);
    if (userToken) setToken(userToken);

    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));

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
          onEnrollClick={() => setShowEnrolled(true)}
        />
        {showLogin && (
          <Login
            onSuccess={handleSuccess}
            onClose={() => setShowLogin(false)}
            onSigninClick={() => setShowSignin(true)}
          />
        )}
        {showSignin && (
          <Registration
            onSuccess={handleSuccess}
            onClose={() => setShowSignin(false)}
            onLoginClick={() => setShowLogin(true)}
          />
        )}
        {showProfile && (
          <Profile
            user={user}
            token={token}
            onSuccess={handleSuccess}
            onClose={() => setShowProfile(false)}
          />
        )}
        {showEnrolled && (
          <Enrolled
            onClose={() => setShowEnrolled(false)}
            user={user} 
            token={token}
          />
        )}
        

          <Switch>
            <Route exact path="/">
              <Dashboard 
                user={user} 
                token={token} 
                onLoginClick={() => setShowLogin(true)}
                onEnrollClick={() => setShowEnrolled(true)}
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
