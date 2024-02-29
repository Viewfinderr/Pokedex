"use client"

import React from 'react';


interface PokemonCardProps {
  name: string;
  type: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, type }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{type}</p>
    </div>
  );
};

export default PokemonCard;
