
import Header from "./components/Header";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Dashboard/>
      <Footer/>
    </div>
  );
}

export default App;
