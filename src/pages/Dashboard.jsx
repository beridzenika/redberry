import Hero from "../components/Hero";
import Currents from "../components/Currents";
import Featured from "../components/Featured";

function Dashboard( {user, token, onLoginClick, onEnrollClick} ) {
  
  return (
    <main className="container">
        <Hero/>
        {user ? (
          <>
            {user.length !== 0 ? (
              <Currents 
                user={user} 
                token={token} 
                onLoginClick={onLoginClick} 
                onEnrollClick={onEnrollClick} 
              />
            ) : ''}
            <Featured/>
          </>
        ) : (
          <>
            <Featured/>
            <Currents 
              user={user} 
              token={token} 
              onLoginClick={onLoginClick} 
              onEnrollClick={onEnrollClick} 
            />
          </>
        )}
        
    </main>
  );
}

export default Dashboard;