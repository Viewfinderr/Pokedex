import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context';
import PokemonCard from '../pokemonCard';

const PokemonList: React.FC = () => {
  const { setPokemonList, filterType } = useAppContext();
  const [pokemonDetails, setPokemonDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=500');
        const data = await response.json();

        setPokemonList(data.results);

        const detailsPromises = data.results.map(async (pokemon: any) => {
          const detailsResponse = await fetch(pokemon.url);
          return await detailsResponse.json();
        });

        const detailsResults = await Promise.all(detailsPromises);
        setPokemonDetails(detailsResults);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, [setPokemonList]);

  return (
    <div className="pokemon-list">
      {pokemonDetails.map((pokemon: any) => {
        const pokemonTypes = pokemon.types.map((type: any) => type.type.name);

        const isFiltered = !filterType || pokemonTypes.includes(filterType);

        if (isFiltered) {
          return <PokemonCard key={pokemon.name} name={pokemon.name} types={pokemonTypes} />;
        }

        return null;
      })}
    </div>
  );
};

export default PokemonList;
