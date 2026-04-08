import { ReactComponent as Arrow } from '../assets/icons/Back.svg';

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../styles/BreadCrumbs.css';

function BreadCrumbs() {
  return (
    <div className='container'>
      <div className="bread-crumbs">
        <Link to="/">Home</Link>
        <Arrow className='bread-crumbs-icon'/>
        <Link to="/browse" className='active'>Browse</Link>
      </div>
    </div>
  );
};

export default BreadCrumbs;