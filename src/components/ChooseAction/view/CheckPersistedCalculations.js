import React from 'react';
import FullWidthAppButton from '../../AppButtons/FullWidthAppButton/FullWidthAppButton';


function CheckPersistedCalculations() {
  return (
    <div className="frame-holder">
      <h1 className="frame-header">Check your saved DDP calculations:</h1>
      <li>
        <FullWidthAppButton>
          FOB Bulgaria - FOT KYIV: kitchen accessories: (01 JULY 2019)
        </FullWidthAppButton>
        <FullWidthAppButton>
          FOB China - FOT KYIV: kitchen accessories (01 JULY 2019)
        </FullWidthAppButton>
        <FullWidthAppButton>EXW Italy - FOT KYIV: HPL (02 JULY 2019)</FullWidthAppButton>
        <FullWidthAppButton>FOB Brazil - FOT KYIV: water boilers (30 JULY 2019)</FullWidthAppButton>
      </li>
    </div>
  );
}

export default CheckPersistedCalculations;
