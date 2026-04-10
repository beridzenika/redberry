import BreadCrumbs from '../components/BreadCrumbs';
import Filters from '../components/Filters';
import Catalogue from '../components/Catalogue';


import { useState } from 'react';

function Browse() {

  const [selected, setSelected] = useState({});

  return (
    <>  
      <BreadCrumbs/>
      <main 
        className="container sidebar-page"
      >
        <Filters selected={selected} setSelected={setSelected} />
        <Catalogue selected={selected}/>
      </main>
    </>
  )
}

export default Browse;