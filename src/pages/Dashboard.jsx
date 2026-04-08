import Hero from "../components/Hero";
import Currents from "../components/Currents";
import Featured from "../components/Featured";

function Dashboard( {user, token, onLoginClick} ) {
  return (
    <main className="container">
        <Hero/>
        <Currents user={user} token={token} onLoginClick={onLoginClick} />
        <Featured/>
    </main>
  );
}

export default Dashboard;