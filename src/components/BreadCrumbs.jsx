import { ReactComponent as Arrow } from '../assets/icons/Back.svg';

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../styles/BreadCrumbs.css';

function BreadCrumbs({category}) {
  return (
    <div className='container'>
      <div className='bread-crumbs'>
        <Link to='/'>Home</Link>
        <Arrow className='bread-crumbs-icon'/>
        <Link to='/browse' className={!category ? 'active' : ''}>Browse</Link>
        {category && (
          <>
            <Arrow className='bread-crumbs-icon'/>
            <span className='active'>{category}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default BreadCrumbs;