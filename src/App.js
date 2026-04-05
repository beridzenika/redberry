
import Header from "./components/Header";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";

import './styles/App.css';

function App() {
  const isLoggedIn = false;
  const isActive = false;
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} isActive={isActive}/>
      <Dashboard/>
      <Footer/>
    </div>
  );
}

export default App;
