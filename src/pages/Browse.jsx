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
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "309px auto",
          gap: "83px",
          marginBottom: "120px",
        }}
      >
        <Filters selected={selected} setSelected={setSelected} />
        <Catalogue selected={selected}/>
      </main>
    </>
  )
}

export default Browse;