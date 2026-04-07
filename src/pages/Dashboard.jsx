import Hero from "../components/Hero";
import Currents from "../components/Currents";
import Courses from "../components/Courses";

function Dashboard() {
  return (
    <main className="container">
        <Hero/>
        <Currents/>
        <Courses/>
    </main>
  );
}

export default Dashboard;