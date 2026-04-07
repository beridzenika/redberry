import Hero from "../components/Hero";
import Currents from "../components/Currents";
import Featured from "../components/Featured";

function Dashboard() {
  return (
    <main className="container">
        <Hero/>
        <Currents/>
        <Featured/>
    </main>
  );
}

export default Dashboard;