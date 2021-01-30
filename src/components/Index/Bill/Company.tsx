import React from 'react';

function Company({company}: any) {

  return (
    <div>{company?.name}</div>
  );
}

export default Company;
