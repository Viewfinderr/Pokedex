'use client';
import Image from "next/image";

import React from 'react';
import PokemonList from '@/components/PokemonList';
import TypeFilter from '@/components/TypeFilter';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Pokédex</h1>
      <TypeFilter />
      <PokemonList />
    </div>
  );
};

export default Home;
