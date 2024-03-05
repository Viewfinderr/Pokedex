import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context';

const TypeFilter: React.FC = () => {
  const { filterType, setFilterType, setPokemonList } = useAppContext();

  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100');
        const data = await response.json();

        setPokemonList(data.results);

        const types: string[] = [];
        for (const pokemon of data.results) {
          const pokemonDetailsResponse = await fetch(pokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.json();
          types.push(...pokemonDetails.types.map((type: any) => type.type.name));
        }

        setUniqueTypes(Array.from(new Set(types)));
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, [setPokemonList]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  return (
    <div className='flex items-center justify-center'>
      {/* Champ de sélection de type avec un label */}
      <label htmlFor="typeFilter" className=" mr-2" >Filter by type:</label>
      {/* Sélecteur de type avec options pour chaque type de Pokémon */}
      <select id="typeFilter" className=" p-2" value={filterType || ''} onChange={handleTypeChange}>
        <option value="">All types</option>
        {/* Ajout des options pour chaque type de Pokémon */}
        {uniqueTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;
