import BreadCrumbs from '../components/BreadCrumbs';
import Filters from '../components/Filters';
import Catalogue from '../components/Catalogue';

import { ReactComponent as business } from '../assets/icons/filters/business.svg';
import { ReactComponent as dataScience } from '../assets/icons/filters/data-science.svg';
import { ReactComponent as design } from '../assets/icons/filters/design.svg';
import { ReactComponent as development } from '../assets/icons/filters/development.svg';
import { ReactComponent as marketing } from '../assets/icons/filters/marketing.svg';

import { useState } from 'react';

const icons = {
    'business': business,
    'data-science': dataScience,
    'design': design,
    'development': development,
    'marketing': marketing
}

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
        }}
      >
        <Filters icons={icons} selected={selected} setSelected={setSelected} />
        <Catalogue icons={icons} selected={selected}/>
      </main>
    </>
  )
}

export default Browse;