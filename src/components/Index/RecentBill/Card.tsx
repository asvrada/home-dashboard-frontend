import React from 'react';

function Card({card}: any) {

  return (
    <div>{card?.name}</div>
  );
}

export default Card;