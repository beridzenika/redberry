import Hero from "../components/Hero";
import Currents from "../components/Currents";
import Featured from "../components/Featured";

function Dashboard( {user, token, onLoginClick} ) {
  
  return (
    <main className="container">
        <Hero/>
        {user ? (
          <>
            <Currents user={user} token={token} onLoginClick={onLoginClick} />
            <Featured/>
          </>
        ) : (
          <>
            <Featured/>
            <Currents user={user} token={token} onLoginClick={onLoginClick} />
          </>
        )}
        
    </main>
  );
}

export default Dashboard;